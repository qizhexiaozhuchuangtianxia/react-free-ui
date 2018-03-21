import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drag from './Drag';
import { splitPx } from '../utils';
class DragDemo extends Component {

    static propTypes = {
        data: PropTypes.array,
        scroll: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0,
            startWidth:200,
            startHeight:230,
            width: 200,
            height: 230
        };
    }
    handleOnMouseDown = (xy) => {
        this.setState({
            x: xy.x,
            y: xy.y
        })
    }
    handleOnMouseMove = (xy) => {
        console.log(xy.x, 'xy.x')
        this.setState({
            x: xy.x,
            y: xy.y,
            width: xy.x + this.state.startWidth,
            // height:this.state.startHeight,
        })
    }
    handleOnMouseUp = (xy) => {
        this.setState({
            x: xy.x,
            y: xy.y,
            width: xy.x + this.state.startWidth,
            // height:this.state.startHeight,
            startWidth:xy.x + this.state.startWidth,
            startHeight:xy.y + this.state.startHeight,
        })
    }
    render() {
        const defaultStyle = {
            width: this.state.width + 'px',
            height: this.state.height + 'px',
            border: '1px solid #ccc',
            position: 'relative'
        }
        const demoStyle = {
            width: '100px',
            height: '30px',
            lineHeight:'30px',
            border: '1px solid #ccc'
        }
        return (
            <div >
                <Drag
                    onMouseMove={this.handleOnMouseMove}
                    onMouseUp={this.handleOnMouseUp}>
                    <div style={demoStyle}><span>拖我</span><span>icon</span></div>
                </Drag>
                <Drag
                    onMouseMove={this.handleOnMouseMove}
                    onMouseUp={this.handleOnMouseUp}>
                    <div style={demoStyle}><span>拖我2</span><span>icon2</span></div>
                </Drag>
            </div>
        )
    }
};

export default DragDemo;
