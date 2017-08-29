import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clazz from 'classnames';
import {splitPx} from '../utils'
import './inputStyle.css'
class Input extends Component {

    static propTypes = {
        type : PropTypes.string,
        text : PropTypes.string,
        inputStyle: PropTypes.object,
        openSearchIcon: PropTypes.bool,
        onClick: PropTypes.func
    };
    handleOnClickSearch = () => {
        if(this.props.onClickSearch){
            this.props.onClickSearch(this.inputNode.value)
        }
    }
    creatSearchIcon = (searchIconStyle)=> {
        const {
            onClick,
            openSearchIcon
        } = this.props;
		if(openSearchIcon){
            return <div style={searchIconStyle} onClick={ this.handleOnClickSearch }><i className="icon iconfont icon-search"></i></div>
        }
        return null;
	}
    handleOnFoucs = () => {
        this.inputContNode.style.border='1px solid blue';
    }
    handleOnBlur = () => {
        this.inputContNode.style.border='1px solid #d9d9d9';
    }
    render() {
        const {
			type,
            placeholder,
            inputStyle,
            openSearchIcon
		} = this.props;
		const defaultStyle = {
            width:'200px',
            height:'30px',
            border: '1px solid #d9d9d9',
            borderRadius: '4px'
        }
        const newStyle = Object.assign(defaultStyle,inputStyle);
        let defaultInputStyle = {};
        if(openSearchIcon){
            let width = splitPx(newStyle.width);
            defaultInputStyle.width=`${width-30}px`;
        }
        const comStyle = {
            width: newStyle.width,
            height: newStyle.height,
            borderRadius: newStyle.borderRadius
        }
        const searchIconStyle = {
            position: 'absolute',
            top: 0,
            right: '6px',
            borderRadius:newStyle.borderRadius,
            height: newStyle.height,
            lineHeight:newStyle.height,
            cursor:'pointer'
        } 
        return (
            <div style={ comStyle }>
                <div ref={node => this.inputContNode=node} className='free-input-cont' style={ newStyle }>
                    <input 
                        ref={node => this.inputNode=node}
                        style={ Object.assign(comStyle,defaultInputStyle) } 
                        className='free-input' 
                        type={type} 
                        placeholder={placeholder}
                        onFocus={this.handleOnFoucs} onBlur={this.handleOnBlur}/>
                    {this.creatSearchIcon(searchIconStyle)}
                </div>
            </div>
        )
    }
};

export default Input;
