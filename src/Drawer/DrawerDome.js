import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import Drawer from './Drawer';
class DrawerDome extends Component {
    static propTypes = {
        direction: PropTypes.string,
        open: PropTypes.bool,
        
    }
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }
    handleClick = () => {
        this.setState({
            open:!this.state.open
        })
    }
    render() {
        return (
            <div>
                <button style={{marginLeft:'300px'}} onClick={this.handleClick}>drawe按钮</button>
                <Drawer direction='left' open={this.state.open} width={200} time={400}/>
            </div>
        )

    }
}

export default DrawerDome;
