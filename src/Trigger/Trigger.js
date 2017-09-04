import React, { Component } from 'react';
import PropTypes from 'prop-types';
import iconfont from '../iconFont/iconfont.css';
import { findDOMNode } from 'react-dom';
import triggerStyle from './triggerStyle.css';
import Transition , { EXITED, ENTERED, ENTERING, EXITING } from 'react-transition-group/Transition';

const triggerStyles = {
  [EXITED]: 'trigger',
  [EXITING]: 'triggering',
  [ENTERING]: 'triggering',
  [ENTERED]: 'trigger in',
}
class Trigger extends Component {
	static propTypes = {
		
	};
  handleEnter = (elem) => {
    elem.style.height = 0; 
  }

  handleEntering = (elem) => {
    elem.style.height = `${elem.scrollHeight}px`;
  }

  handleEntered = (elem) => {
    this.height=elem.scrollHeight;
    elem.style.height = this.height;
  }

  handleExit = (elem) => {
    elem.style.height = `${this.height}px`;
  }

  handleExiting = (elem) => {
    elem.style.height = 0;
  }
  handleExited = (elem) => {
  }
  render() {
    const { 
      children,
      triggerStyle
    } = this.props;
    const newProps = {
      in:this.props.in
    }
    return (
        <Transition
          {...newProps}
          timeout={1000}
          onEnter={this.handleEnter}
          onEntering={this.handleEntering}
          onEntered={this.handleEntered}
          onExit={this.handleExit}
          onExiting={this.handleExiting}
        >
          {(state, props) => React.cloneElement(children, {
              ...props,
              className: triggerStyles[state]
            })
          }
        </Transition>
      
    );
  }
}

export default Trigger;