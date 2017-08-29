import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import './dragLineStyle.css';

class DragLine extends Component {

    static propTypes = {
        onMouseDown: PropTypes.func,
        onMouseMove: PropTypes.func,
        onMouseUp: PropTypes.func
    };
    constructor(props) {
        super(props);
        this.left = 0;
        this.top = 0;
        this.startX = 0;
        this.startY = 0;
        this.endX = 0;
        this.endY = 0;
        this.pageX = 0;
        this.pageY = 0;
        this.state={
            moveX:null,
            moveY:null
        }
    }
    componentDidMount() {
        document.addEventListener("mousedown", this.handleOnMouseDown, false);
        document.addEventListener("mousemove", this.handleOnMouseMove, false);
        document.addEventListener("mouseup", this.handleOnMouseUp, false);
    }
    handleOnMouseDown = (e) => {
        if(e.target!=findDOMNode(this)) return;
        document.addEventListener("mousemove", this.handleOnMouseMove, false);
        this.pageX = e.pageX;
        this.pageY = e.pageY;
        this.down=true;
        // let rect = findDOMNode(this).getBoundingClientRect();
        this.left = findDOMNode(this).offsetLeft;
        this.top = findDOMNode(this).offsetTop;
        // if (this.props.onMouseDown) {
        //     this.props.onMouseDown({
        //         x: 0,
        //         y: 0
        //     })
        // }
        
    }
    handleOnMouseMove = (e) => {
        if(!this.down) return;
        this.moveX = e.pageX - this.pageX;
        this.moveY = e.pageY - this.pageY;
        this.move=true;
        this.setState({
            moveX:this.moveX,
            moveY:this.moveY,
        })
        if (this.props.onMouseMove) {
            this.props.onMouseMove({
                x: this.moveX,
                y: this.moveY
            })
        }
    }
    handleOnMouseUp = (e) => {
        document.removeEventListener("mousemove",this.handleOnMouseMove, false);
        if(!this.move) return;
    //    if(e.target!=findDOMNode(this)) return;
        this.moveX = e.pageX - this.pageX;
        this.moveY = e.pageY - this.pageY;
        this.setState({
            moveX:this.moveX,
            moveY:this.moveY,
        });
        if (this.props.onMouseUp) {
            this.props.onMouseUp({
                x: this.moveX,
                y: this.moveY
            })
        };
        this.down=false;
        this.move=false;
    }
    render() {
        const {
            dragLineStyle,
            lineDirection //h 横向 v纵向
        } = this.props;
        const defaultDragStyle = {
            width: '3px',
            height: '300px',
            background: '#ccc',
            cursor: 'w-resize',
            position: 'absolute',
        }
        const dragStyle = Object.assign(defaultDragStyle, dragLineStyle);
        if (lineDirection === 'v') {
            dragStyle.cursor = 's-resize';
        }
        //纵轴
        if(this.state.moveX!=null && dragStyle.cursor === 'w-resize'){
            dragStyle.left = this.left + this.state.moveX+'px';
        }
        return (
            <div
                className='drag-line'
                style={dragStyle}
            >

            </div>
        )
    }
};

export default DragLine;
