import React, { Component } from 'react';
import { unstable_renderSubtreeIntoContainer, unmountComponentAtNode, findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

class RenderToBody extends Component {
    constructor(props){
        super(props);
    }
    static propTypes = {
        childrenElement:PropTypes.func,
    }
    componentDidMount(){
        this.renderBody();
    }
    componentDidUpdate() {
        this.renderBody();
    }
    componentWillUnmount() {
        this.removeRenderBody();
    }
    renderBody(){
        const {
            childrenElement,
        } = this.props;
        if(!this.node){
            this.node = document.createElement('div');
            document.body.appendChild(this.node);
            
            this.node.style.position = 'fixed';
            this.node.style.top = 0;
            this.node.style.bottom = 0;
            this.node.style.left = 0;
            this.node.style.right = 0;
            this.node.style.zIndex = 9999;
            this.node.style.backgroundColor = 'rgba(0,0,0,0.2)';
            const childElement = childrenElement();
            this.nodeElement = unstable_renderSubtreeIntoContainer(this, childElement, this.node);
        }
    }
    removeRenderBody(){
        if(this.node){
            unmountComponentAtNode(this.node);
            document.body.removeChild(this.node);
            this.node = null;
        }
    }
    render() {
        return null;
    }
}

export default RenderToBody;