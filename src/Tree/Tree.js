import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clazz from 'classnames';
import Node from './Node';

class Tree extends Component {

    static propTypes = {
        item : PropTypes.object,
		treeStyle : PropTypes.object,
        nodeStyle : PropTypes.object,
    };
    constructor(props) {
        super(props);
    }
    loopTreeData = (data, goal) => {
        var tree = JSON.parse(JSON.stringify(data));
        var res = []
        res.push(...tree);
        for (var i = 0; i < res.length; i++) {
            var curData = res[i];
            if(!curData.level){
                curData.level=0;
            }
            if (curData.children) {
                res.push(...curData.children.map(item => {
                    item.level = curData.level+1;
                    return item
                }))
            }
        }
        return tree
    } 
    loopTree = (data) => data.map((item, index) => {
        if (item.children) {
            return (
                <Node key={item.name} item={item}>
                    {this.loopTree(item.children)}
                </Node> 
            );
        }
        return <Node key={item.name} item={item} />;
    });

    render() {
        const {
			item,
			treeStyle,
		} = this.props;
		const defaultTreeStyle = {
			width : '300px',
			overflow:'hidden'
		}
		const newTreeStyle = Object.assign(defaultTreeStyle,treeStyle);
        return (
            <div style= {newTreeStyle}>
                {this.loopTree(this.loopTreeData(this.props.data))}
            </div>
        )
    }
};

export default Tree;
