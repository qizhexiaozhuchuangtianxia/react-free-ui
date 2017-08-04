import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import EventListener from 'react-event-listener';
import  { RenderToBody } from '../Body';
import { Buttons } from '../Buttons';
const heightDefault = 0.5;
function setDialogStyle(style) {
    let defaultStyle = {
        position:'relative',
        width: '75%',
        height: `${heightDefault*100}%`,
        backgroundColor: 'rgba(255,255,255,1)',
        margin: 'auto',
        borderRadius:'3px',
        overflow:'hidden'
    };
    if(style){
        defaultStyle = Object.assign(defaultStyle,style);
    }
    defaultStyle.margin=getMarin(style);
    return defaultStyle;
}
function setTitleStyle(style) {
    let titleStyle = {
        boxSizing:'border-box',
        paddingLeft: '12px',
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: '22px',
        lineHeight: '48px',
        height:'48px',
        fontWeight: 400
    };
    if(style){
        titleStyle = Object.assign(titleStyle,style);
        let lineHeight=splitPx(titleStyle.height,48);
        titleStyle.lineHeight = `${lineHeight}px`;
    }
    return titleStyle;
}
function setConentStyle(style,dialogStyle,titleStyle,footStyle) {
    let conentStyle = {
        width:'100%',
        padding:'12px',
        boxSizing:'border-box',
        overflow:'hidden',
    };
    let dialogHeight = getDialogHeight();
    let footHeight = getFootHeight(footStyle);
    let titleHeight = getTitleHeight(titleStyle);
    let contentHeight = getContentHeight(dialogHeight,titleHeight,footHeight);
    if(style){
        conentStyle = Object.assign(conentStyle,style);
    }
    conentStyle.height = `${contentHeight}px`;
    return conentStyle;
}
function setFootStyle(style) {
    let footStyle = {
        width: '100%',
        height:'48px',
        position:'absolute',
        padding:'6px',
        boxSizing:'border-box',
        left:0,
        bottom:0,
    };
    if(style){
        footStyle = Object.assign(footStyle,style);
    }
    return footStyle;
}

function splitPx(str,defa){
    if(str){
        let strArr = str.split('px');
        return strArr[0];
    }
    return defa;
}
function getWindowsHeight(){
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

function getDialogHeight(styles) {
    let clientHeight=getWindowsHeight();
    let dialogHeight = (styles && styles.height) ? splitPx(styles.height) : (clientHeight*heightDefault);
    return dialogHeight;
}

function getTitleHeight(titleStyles){
    let titleHeight = ( titleStyles && titleStyles.height ) ? titleStyles.height :false;
    return splitPx(titleHeight,48);
}

function getContentHeight(dialogHeight,titHeight,footHeight){
    return dialogHeight-titHeight-footHeight;
}

function getFootHeight(footStyle){
    let footHeight = ( footStyle && footStyle.height ) ? footStyle.height :false;
    return splitPx(footHeight,48);
}

function getMarin(styles){
    let clientHeight=getWindowsHeight(),
        dialogHeight= getDialogHeight(styles),
        marginTop=(clientHeight - dialogHeight) / 2;
    return `${marginTop}px auto 0px `;
}

class DialogInner extends Component {
    constructor(props){
        super(props);
    }
    static propTypes= {
        width:PropTypes.number,
        height:PropTypes.number,
        styles:PropTypes.object,
        children:PropTypes.node,
        handleClose:PropTypes.func,
        open:PropTypes.bool.isRequired,
        titleStyle:PropTypes.object,
        title:PropTypes.string,
        footStyle:PropTypes.object,
        conentStyle:PropTypes.object
    }
    handleResize = () => {
        const {
            styles
        } = this.props;
        let node = findDOMNode(this);
        node.style.margin = getMarin(styles);
        
        this.setState({
            node:1
        })
    }
    handleClose =() => {
        if(this.props.handleClose){
            this.props.handleClose();
        }
    }
    renderTitle = () => {
        if(this.props.title){
            return (
                <div style={setTitleStyle(this.props.titleStyle)}>{this.props.title}</div>
            )
        }
    }
    renderConent = () => {
        return (
            <div style={setConentStyle(this.props.conentStyle)}>
                {this.props.children}
            </div>
        )
    }
    renderFoot = () => {
        const buttonStyle1 = {
            float:'right'
        };
        const buttonStyle2 = {
            float:'right',
            marginRight:'6px'
        };
        return (
            <div style={setFootStyle(this.props.footStyle)}>
                <Buttons  text="确定" style = { buttonStyle1 }/>
                <Buttons  text="取消" style = { buttonStyle2 }/>
            </div>
        )
    }
    render() {
        if(!this.props.open){
            return null;
        }
        const {
            styles
        } = this.props;
        
        return (
            <div style={ setDialogStyle(styles) }>
                <EventListener
                    target="window"
                    onResize={this.handleResize}
                />
                {this.renderTitle()}
                {this.renderConent()}
                {this.renderFoot()}
            </div>
        );
    }
}
class Dialog extends Component {
    constructor(props){
        super(props);
    }
    static propTypes= {
        width:PropTypes.number,
        height:PropTypes.number,
        styles:PropTypes.object,
        children:PropTypes.node,
        handleClose:PropTypes.func,
        open:PropTypes.bool.isRequired,
    }
    handleResize = () => {
        const {
            styles
        } = this.props;
        let node = findDOMNode(this);
        node.style.margin = getMarin(styles);
    }
    renderDialogInner = () => {
        return (
            <DialogInner {...this.props} />
        );
    };
    handleClose(){
        if(this.props.handleClose){
            this.props.handleClose();
        }
    }
    render() {
        return (
            <RenderToBody childrenElement={this.renderDialogInner} ></RenderToBody>
        );
    }
}

export default Dialog;
