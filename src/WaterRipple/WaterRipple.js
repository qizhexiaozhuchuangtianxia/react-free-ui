import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition , { EXITED, ENTERED, ENTERING, EXITING } from 'react-transition-group/Transition';
import waterStyle from './water.css';

const RippleStyles = {
    [EXITED]: 'ripple',
    [EXITING]: 'ripple',
    [ENTERING]: 'rippleing',
    [ENTERED]: 'ripple in',
};


class WaterRipple extends Component {
  
  handleEnter = (elem) => {
    
  }
  handleEntering = (elem) => {
    // elem.style.opacity=1;
  }

  handleEntered = (elem) => {
     //elem.style.opacity=1;
  }
  handleExit = (elem) => {
      
  }
  handleEntering = (elem) => {
  }
  render() {
        return (
            <Transition
                {...this.props}
                timeout={{
                    enter: 0,
                    leave: 0,
                }}
                onEnter={this.handleEnter}
                onEntering={this.handleEntering}
                onEntered={this.handleEntered}
                onExit={this.handleExit}
                onExiting={this.handleExiting}
            >
                {(state, props) => {
                    return  React.cloneElement(this.props.children, {
                        ...props,
                        className:  RippleStyles[state]     
                    });
                }}
            </Transition>
        );
    }
}

export default WaterRipple;