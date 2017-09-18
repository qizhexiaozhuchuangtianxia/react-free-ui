import React, { Component } from 'react';
import PropTypes from 'prop-types';
class TabPanes extends Component {

    static propTypes = {
       
    };
    constructor(props) {
        super(props);
        this.state = {
			
		};
    }
    
    renderPane = (item,key) => {
        let left = 0;//this.props.selectedNav < key ? true : false
        let widths = this.props.width;
        let pixels = true;//this.props.width;
        const {
            selectedNav,
            preSelected,
            width,
        } =  this.props;
        if(selectedNav < key){
            left='100%';
        }
        if(selectedNav > key){
            left='-100%';
        }

        //每次只渲染两张,当前和下一张,点击切换时,根据点击上一次做出判断,当前张运动的方向,下一张开始的位置
        
        // //当前离开 左移
        // if(preSelected < selectedNav && key === preSelected){
        //     left='-100%';
        // //当前离开 右移
        // }else if(preSelected > selectedNav && key === preSelected){
        //     pixels=0;
        //     left='100%';
        // }

        // 下一个过来 左移
        if(preSelected < selectedNav && selectedNav === key) {
            left = 0;
        // 下一个过来 右移    
        }else if(preSelected > selectedNav && selectedNav === key) {
            left = 0;
        }
        
    //    if(selectedNav!==0 && selectedNav !== key && preSelected !== key){
    //     pixels = null;
    //    }
        const paneStyle = {
            position:'absolute',
            left: left,
        };
        const newProps = {
            ...this.props,
            style: paneStyle,
            key:key,
            pixels: left,
        }
        return React.cloneElement(item, {
           ...newProps
        });
    }
    
    render() {
        const {
			tabPane
		} = this.props;
		const defaultStyle = {
            position:'relative',
            paddingBottom:'3px',
            paddingTop:'10px'
		}
        return (
            <div style={defaultStyle}>
               {tabPane.map( (item,key) => this.renderPane(item,key) )}
            </div>
        )
    }
};

export default TabPanes;
