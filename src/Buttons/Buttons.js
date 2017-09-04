import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import WaterRippleTouch from '../WaterRipple/WaterRippleTouch';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

function setStyle(state,style,hoverColors){
    let buttonStyles = {
        border: '10px',
        boxSizing: 'border-box', 
        display: 'inline-block', 
        cursor: 'pointer', 
        textDecoration: 'none', 
        margin: '0px', 
        outline: 'none', 
        position: 'relative', 
        zIndex: 1, 
        height: '36px', 
        lineHeight: '36px', 
        color: 'rgb(255, 64, 129)', 
        transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms', 
        borderRadius: '2px', 
        userSelect: 'none', 
        overflow: 'hidden', 
        backgroundColor: 'rgba(0, 0, 0, 0.05)', 
        textAlign: 'center',
    };
    if(style){
        buttonStyles = Object.assign(buttonStyles,style);
    }
    if(state.enter){
        buttonStyles.backgroundColor = hoverColors ? hoverColors : 'rgba(0, 0, 0, 0.09)';
    }
    return buttonStyles;
}
function setIconStyle(leftIconStyle,rightIconStyle){
    let iconStyle = {
        leftIconStyle : {
            verticalAlign: 'middle',
            left:'12px',
            marginRight:'8px',
            overflow: 'hidden',
            textIndent: '0px',
        },
        rightIconStyle : {
            verticalAlign: 'middle',
            right:'12px',
            marginLeft:'8px',
            color:'#CCC',
            overflow: 'hidden',
            textIndent: '0px',
        }
    };
    if(leftIconStyle){
        iconStyle.leftIconStyle=Object.assign(iconStyle.leftIconStyle,leftIconStyle);
    }
    if(rightIconStyle){
        iconStyle.rightIconStyle=Object.assign(iconStyle.rightIconStyle,rightIconStyle);
    }
    return iconStyle;
}

class Buttons extends Component {
    static propTypes = {
        text:PropTypes.string,
        onTouchTap:PropTypes.func,
        onMouseEnter:PropTypes.func,
        hoverColors:PropTypes.string,
        style:PropTypes.object,
        onMouseLeave:PropTypes.func
    }
    constructor(props){
        super(props);
        this.state = {
            enter:false
        };
    }
    handleOnTouchTap = (event) => {
        if(this.props.onTouchTap){
            this.props.onTouchTap(event);
        }
    }
    handleOnMouseEnter = (event) => {
        this.setState({
            enter:true
        });
        if(this.props.onMouseEnter){
            this.props.onMouseEnter(event);
        }
    }
    handleOnMouseLeave = (event) => {
        this.setState({
            enter:false
        });
        if(this.props.onMouseLeave){
            this.props.onMouseLeave(event);
        }
    }
    creatIcon = (style,rightIcon) => {
        if(!rightIcon){return null;}
        return (
            <span style={style}>{rightIcon}</span>
        )
    }
    render() {
        const {
            text,
            hoverColors,
            style,
            leftIcon,
            rightIcon,
            leftIconStyle,
            rightIconStyle,
        } = this.props;
        const iconStyle = setIconStyle(leftIconStyle,rightIconStyle);
        return (
            <button style = { setStyle(this.state,style,hoverColors) } onTouchTap = {this.handleOnTouchTap} 
                onMouseEnter = {this.handleOnMouseEnter}
                onMouseLeave = {this.handleOnMouseLeave}>
                <WaterRippleTouch>
                    <div style={{margin:'0 20px'}}>
                        {this.creatIcon(iconStyle.leftIconStyle,leftIcon)}
                        <span>{text}</span>
                        {this.creatIcon(iconStyle.rightIconStyle,rightIcon)}
                    </div>
                </WaterRippleTouch>
            </button>
            
        )
    }
}

export default Buttons;
