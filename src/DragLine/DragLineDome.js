import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DragLine from './DragLine';
import { splitPx } from '../utils';
class DragLineDome extends Component {

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
       
        return (
            <div style={defaultStyle}>
                <DragLine dragLineStyle={{ height: '230px', width: '4px', left: '198px' }}
                    onMouseMove={this.handleOnMouseMove}
                    onMouseUp={this.handleOnMouseUp}
                />
            </div>
        )
    }
};

export default DragLineDome;
