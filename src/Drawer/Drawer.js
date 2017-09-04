import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { RenderToBody } from '../Body';
import { getViewPortWidth } from '../utils';
import DrawerTransition from './DrawerTransition';

const defaultDrawer = {
    width: 200,
    left: -200,
};

class Drawer extends Component {
    static propTypes = {
        direction: PropTypes.string,
        open: PropTypes.bool,
        width: PropTypes.number,
        height: PropTypes.number,
        time: PropTypes.number,
    }
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open
        };
    }
    handleOnTouchTap = (event) => {

    }
    setDrawerPosition = () => {
        const {
            direction,
            width,
            height,
        } = this.props;
        let drawerStyle = {};
        let morePosition=5;
        switch (direction) {
            case 'left':
                drawerStyle.width = width + 'px';
                drawerStyle.left = -width-morePosition + 'px';
                break
            case 'right':
                drawerStyle.width = width + 'px';
                drawerStyle.right = -width-morePosition + 'px';
                break
            case 'top':
                drawerStyle.height = height + 'px';
                drawerStyle.top = -height-morePosition + 'px';
                break
            case 'bottom':
                drawerStyle.height = height + 'px';
                drawerStyle.bottom = -height-morePosition + 'px';
            default:

        };
        return drawerStyle;
    }
    renderDrawer = () => {
        const {
            open,
            direction,
            width,
            height,
            time
        } = this.props;
        let drawerPosition = this.setDrawerPosition();

        const defaultStyle = {
            position: 'absolute',
            zIndex:999,
            width: '100%',
            height: '100%',
            backgroundColor:'rgba(0,0,0,0.1)',
            border:'2px solid red'
        }
        const newStyle = Object.assign(defaultStyle, drawerPosition);
        return (
            <DrawerTransition
                in={open}
                direction={direction}
                pixels={width || height}
                time={time}>
                
                <div style={newStyle} >232342344</div>
            </DrawerTransition>
        )
    }
    render() {
        const {
            text,

        } = this.props;

        return (
            <RenderToBody update={true} childrenElement={this.renderDrawer} style={{ zIndex: -1, backgroundColor: 'rgba(0, 0, 0, 0)' }} ></RenderToBody>
        )

    }
}

export default Drawer;
