import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import WaterRippleTouch from '../WaterRipple/WaterRippleTouch';
import  { RenderToBody } from '../Body';
import Trigger from '../Trigger/Trigger';

class PositionDialog extends Component {
    static propTypes = {
        text: PropTypes.string,
        // meun: PropTypes.node,

    }
    constructor(props) {
        super(props);
        this.state = {
            left:null,
            top:null,
            open:false
        };
    }
    handleOnTouchTap = (event) => {

    }
    renderMenu =()=> {
        const {
            position
        } = this.props;
        let step = (position==='top') ? 'bottom' : 'top';
        const meunboxStyle = {
            position:'absolute',
            boxShadow: '0 1px 6px rgba(0,0,0,.2)',
            borderRadius:'3px',
            backgroundColor:'#fff',
            left:this.state.left ? this.state.left+'px' : null,
            [step]:this.state.top ? this.state.top+'px': null,
        }
        const defaultStyle = {
            padding:'8px 12px',
            boxSizing:'border-box'
        }
        return <Trigger in={ this.state.open } >
                    <div  style={meunboxStyle}  ref = {(node) => this.menu=node}>
                        <div style={defaultStyle}>
                            {this.props.meun}
                        </div>
                    </div>
                </Trigger>;
       
    }
    getNoneEleRect = (ele) => {
        const {
            display,
        } = ele.style;
        ele.style.display='block';
        let rects = this.menu.getBoundingClientRect();
        ele.style.display=display;
        this.menuRect = rects;
    }
    setPosition = () => {
        const {
            position
        } = this.props;
        const rect = findDOMNode(this).getBoundingClientRect();
        let scrollTop = document.body.scrollTop;
        let left = rect.left + document.body.scrollLeft;
        let top = rect.top + scrollTop;
        // let scrollHeight = document.body.scrollHeight;
        // let bottomHeight = scrollHeight - scrollTop;
        switch(position){
            case 'top':
                top = top*-1;
                break;

            case 'bottom':
                top = top + rect.height;
                break;

            default:

        }
        
        return {
            left:left,
            top:top
        }
    }
    handleClick = () => {
        const setPosition = this.setPosition();
        this.setState({
            open:!this.state.open,
            left:setPosition.left,
            top:setPosition.top,
        });
    }
    componentDidmount() {
        this.getNoneEleRect(findDOMNode(this));
    }
    componentDidUpdate() {
    }
    render() {
        const {
            children,
            meun
        } = this.props;
        const defaultStyle = {
            position: 'relative',
            display:'inline-block',
            width: 'auto',
        }
        return (
            <div style={defaultStyle} onClick={this.handleClick}>
                {children}
                <RenderToBody update={true} childrenElement={this.renderMenu} style={{height:0,zIndex:-1,position:'absolute'}}/>
            </div>

        )
    }
}

export default PositionDialog;
