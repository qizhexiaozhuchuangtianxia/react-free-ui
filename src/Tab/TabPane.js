import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Transitions } from '../Transitions';


class TabPane extends Component {

    static propTypes = {
       
    };
    constructor(props) {
        super(props);
        this.state = {
			
		};
    }
    
    render() {
        const {
            children,
            style,
            time,
            direction,
            width,
            selectedNav,
            transitionIn,
            pixels,
            display
		} = this.props;
		const defaulttyle = {
			display: display,
        }
        return (
            <Transitions in={transitionIn} direction = {direction} pixels={pixels} time={time}>
                 <div style={style}>
                    {children}
                </div>   
            </Transitions>
        )
    }
};

export default TabPane;
