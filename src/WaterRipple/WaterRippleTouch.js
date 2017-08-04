import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import ReactTransitionGroup from 'react-transition-group/TransitionGroup';

import WaterRipple from './WaterRipple';

const rootStyle = {
    // position:'absolute',
    // width:'auto'
};
const thisref='transitionItem';

class WaterRippleTouch extends Component {
    static propTypes = {
        children: PropTypes.node,
        style: PropTypes.object,
        width: PropTypes.string,
        height: PropTypes.string
    }
    constructor(props, context) {
        super(props, context);
        this.state = {
            status: '',
            key: 0,
            waterRipple : []
        };
    }
    handleMouseDown = (event) => {
        this.addRipple(event);
    }
    handleMouseUp = () => {
        this.removeRipple();
    }
    handleTouchStart() {
    }
    handleTouchEnd() {

    }
    getRippleStyle= (event) => {
        const el = findDOMNode(this['refs'][thisref]);
        // const elHeight = el.offsetHeight;
        const elWidth = el.offsetWidth;
        const isTouchEvent = event.touches && event.touches.length;
        const pageX = isTouchEvent ? event.touches[0].pageX : event.pageX;
        const pageY = isTouchEvent ? event.touches[0].pageY : event.pageY;
        const rect = el.getBoundingClientRect();
        const ripple = elWidth * 2;
        const curX = pageX - rect.left;
        const curY = pageY - rect.top;
        const moveY = ripple/2 - curY;
        const moveX = ripple/2 - curX;
        return {
            height: ripple,
            width: ripple,
            top: -moveY - document.body.scrollTop,
            left: -moveX - document.body.scrollLeft,
        };
    }
    addRipple(event) {
        let ripples = this.state.waterRipple;
        // ripples = [...ripples, (
        //     <WaterRipple key={this.state.key} k={this.state.key} ><div style={this.getRippleStyle(event)}></div></WaterRipple>
        // )];
        ripples.push(<WaterRipple key={this.state.key} k={this.state.key} ><div style={this.getRippleStyle(event)}></div></WaterRipple>);
        this.setState({
            waterRipple: ripples,
            key : this.state.key+1,
        });
    }
    removeRipple() {
        setTimeout( () => {
            let ripples = this.state.waterRipple;
            ripples.shift();
            this.setState({
                waterRipple: ripples,
            });
        },2000);

    }
    render() {
        const {
            children,
            style,
            width,
            height,
        } = this.props;
        const mergedStyles = {
            height: height ? height : '100%',
            width: width ? width : '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex:-1,
        };
        let waterRipples = (
            <ReactTransitionGroup component="div" ref={thisref} style={mergedStyles}>
                {this.state.waterRipple}
            </ReactTransitionGroup>
        );  
        return (

            <div 
                className="water-ripple-touch"
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onTouchStart={this.handleTouchStart}
                onTouchEnd={this.handleTouchEnd}
                style={rootStyle}
            >
                {waterRipples}
                { children }
                
            </div>

        )
    }
}

export default WaterRippleTouch;