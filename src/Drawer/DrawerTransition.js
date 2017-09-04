import React, { Component } from 'react';
import PropTypes from 'prop-types';
import iconfont from '../iconFont/iconfont.css';
import { findDOMNode } from 'react-dom';
import drawerStyle from './drawerStyle.css';
import Transition , { EXITED, ENTERED, ENTERING, EXITING } from 'react-transition-group/Transition';
const drawerStyles = {
  [EXITED]: ' drawer',
  [EXITING]: ' drawering',
  [ENTERING]: ' drawering',
  [ENTERED]: ' drawer in',
}
const times = 300;
let morePosition=5;

class DrawerTransition extends Component {
	static propTypes = {
    direction:PropTypes.string,
    pixels:PropTypes.number
	};
  handleEnter = (elem) => {
    let time = this.props.time || times;
    elem.style.transition = `transform ${time/1000}s ease`;
  }

  handleEntering = (elem) => {
    const {
      direction,
      pixels
    } = this.props;
    if( direction ==='left' ){
      elem.style.transform = `translateX(${pixels+morePosition}px)`;
    }

    if(direction ==='right' ){
      elem.style.transform = `translateX(${-pixels-morePosition}px)`;
    }

    if(direction ==='top' ){
      elem.style.transform = `translateY(${pixels+morePosition}px)`;
    }
    if(direction ==='bottom'){
      elem.style.transform = `translateY(${-pixels-morePosition}px)`;
    }
  }

  handleEntered = (elem) => {
    
  }

  handleExit = (elem) => {
   
  }

  handleExiting = (elem) => {
    const {
      direction,
      pixels
    } = this.props;
    let moreP = morePosition
    if( direction ==='left' || direction ==='top'){
      moreP=5*-1;
    }
    elem.style.transform = `translateX(${moreP}px)`;
   
  }
  handleExited = (elem) => {
  }
  render() {
    const { children,time } = this.props;
    const newProps = {
      in:this.props.in
    }
    return (
      <Transition
       {...newProps}
        timeout={time||times}
        onEnter={this.handleEnter}
        onEntering={this.handleEntering}
        onEntered={this.handleEntered}
        onExit={this.handleExit}
        onExiting={this.handleExiting}
        onExited={this.handleExited}
      >
        {(state, props) => {
          return React.cloneElement(children, {
          ...props,
        })
        }}
      </Transition>
    );
  }
}

export default DrawerTransition;