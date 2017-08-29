import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clazz from 'classnames';
import iconfont from '../iconFont/iconfont.css';
import { findDOMNode } from 'react-dom';
import Collapse from '../Collapse/Collapse';
import { splitPx, setLineHeight } from '../utils';
class Node extends Component {
	static propTypes = {
		
	};
	constructor(props) {
		super(props);
		this.state = {
			open:!false
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
	render() {
		const {
			item,
			nodeStyle
		} = this.props;

		const defaultNodeStyle = {
			height:	'40px', 
			width: 'auto',
			lineHeight:	'40px',
			marginLeft: item.children ? `${item.level*10}px` : `${item.level*10+16}px`,
			cursor: 'pointer'
		}
		const newNodeStyle = Object.assign(defaultNodeStyle, nodeStyle);
		const style = setLineHeight(newNodeStyle);
		const height = splitPx(style.height);
		
		return (
			<div onClick={ (event) => this.handleOnclick(event) } className='tree-node'>
				<div style= {style} >
					{this.creatArrowIcon()}
					<div className='tree-node-d tree-node-text'>{item.name}</div>
				</div>
				
				<Collapse height= { height } childrenLen = { item.children ? item.children.length : 0 } in={this.state.open}>
					<div>
						{this.props.children}
					</div>
				</Collapse>
			</div>
		);
	}
}

export default Node;
