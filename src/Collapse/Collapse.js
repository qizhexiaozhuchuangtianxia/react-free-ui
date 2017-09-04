import React, { Component } from 'react';
import PropTypes from 'prop-types';
import iconfont from '../iconFont/iconfont.css';
import { findDOMNode } from 'react-dom';
import collapseStyle from './collapseStyle.css';
import Transition , { EXITED, ENTERED, ENTERING, EXITING } from 'react-transition-group/Transition';
const collapseStyles = {
  [EXITED]: 'collapse',
  [EXITING]: 'collapsing',
  [ENTERING]: 'collapsing',
  [ENTERED]: 'collapse in',
}
class Collapse extends Component {
	static propTypes = {
		
	};
  handleEnter = (elem) => {
    elem.style.height = '0'; 
  }

  handleEntering = (elem) => {
	elem.offsetHeight
    elem.style.height = `${elem.scrollHeight}px`;
  }

  handleEntered = (elem) => {
    elem.style.height = null;
  }

  handleExit = (elem) => {
    elem.style.height = `${elem.scrollHeight}px`;
    elem.offsetHeight;
  }

  handleExiting = (elem) => {
    elem.style.height = '0';
  }

  render() {
    const { children } = this.props;
    const newProps = {
      in:this.props.in
    }
    return (
      <Transition
        {...newProps}
        timeout={350}
        onEnter={this.handleEnter}
        onEntering={this.handleEntering}
        onEntered={this.handleEntered}
        onExit={this.handleExit}
        onExiting={this.handleExiting}
      >
        {(state, props) => {
          return React.cloneElement(children, {
          ...props,
          className: collapseStyles[state]
        })
        }}
      </Transition>
    );
  }
}

export default Collapse;