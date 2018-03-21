import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import {getParents} from '../utils';
import './dragStyle.css';

// mouseMove 当前组件超过3px 则认为是拖拽  则向body添加一个组件 并且跟随鼠标移动 
class Drag extends Component {

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
        this.dragNode.addEventListener("mousedown", this.handleOnMouseDown, false);
        this.dragNode.addEventListener("mousemove", this.handleOnMouseMove, false);
        this.dragNode.addEventListener("mouseup", this.handleOnMouseUp, false);
    }
    handleOnMouseDown = (e) => {
        //if(!getParents(e.target,this.dragNode)) return;
        //document.addEventListener("mousemove", this.handleOnMouseMove, false);
        this.pageX = e.pageX;
        this.pageY = e.pageY;
        console.log(this.pageX,this.pageY)
        this.down=true;
        // let rect = findDOMNode(this).getBoundingClientRect();
        this.left = findDOMNode(this).offsetLeft;
        this.top = findDOMNode(this).offsetTop;
        
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
        this.dragNode.removeEventListener("mousemove",this.handleOnMouseMove, false);
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
     
        return (
            <div ref={node => this.dragNode=node}
                className='free-drag' >
                {this.props.children}
            </div>
        )
    }
};

export default Drag;
