import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clazz from 'classnames';
import iconfont from '../iconFont/iconfont.css';
import { findDOMNode } from 'react-dom';
import Collapse from '../Collapse/Collapse';
import { splitPx, setLineHeight } from '../utils';
class Node extends Component {
	static propTypes = {
		open:PropTypes.bool.isRequired
	};
	constructor(props) {
		super(props);
		this.state = {
			open:props.open,
			enter:false,
		};
	}
	handleOnclick = (e) => {
		e.stopPropagation();
		this.setState({
			open:!this.state.open
		});
		if(this.props.onClick){
			this.props.onClick(this.props.item);
		}
	}
	creatArrowIcon = () => {
		if(this.props.item.children && this.props.item.children.length>0){
			return <div className={clazz('tree-node-d','tree-node-arrow', { 'tree-node-arrow-rotate': this.state.open })}><i className="icon iconfont icon-more"></i></div>;
		}
		return null;
	}
	handleOnMouseEnter = (e) => {
		e.stopPropagation();
        this.setState({
            enter:true
        });
       
    }
    handleOnMouseLeave = (e) => {
		e.stopPropagation();
        this.setState({
            enter:false
        });
        
    }
	render() {
		const {
			item,
			nodeStyle
		} = this.props;

		const defaultNodeStyle = {
			height:	'40px', 
			width: 'auto',
			lineHeight:	'40px',
			paddingLeft: item.children ? `${item.level*10}px` : `${item.level*10+16}px`,
			cursor: 'pointer',
			userSelect:'none',
			backgroundColor:this.state.enter ? 'rgba(0,0,0,0.09)'  : null 
		}
		const newNodeStyle = Object.assign(defaultNodeStyle, nodeStyle);
		const style = setLineHeight(newNodeStyle);
		const height = splitPx(style.height);
		const hoverStyle = {
			backgroundColor:this.state.enter ? 'rgba(0,0,0,0.09)'  : null 
		}
		return (
			<div onClick={ (event) => this.handleOnclick(event) } 
				className='tree-node'>
				<div style= {style} onMouseEnter = {(event) => this.handleOnMouseEnter(event) }
                onMouseLeave = {(event) => this.handleOnMouseLeave(event) } >
					{this.creatArrowIcon()}
					<div className='tree-node-d tree-node-text'>{item.name}</div>
				</div>
				
				<Collapse in={this.state.open}>
					<div>
						{this.props.children}
					</div>
				</Collapse>
			</div>
		);
	}
}

export default Node;
