import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Transitions } from '../Transitions';

const widths = 100;
const times = 300;
class TabNav extends Component {

    static propTypes = {
       
    };
    constructor(props) {
        super(props);
        this.state = {
           
		};
    }
    renderLine = () => {
        const Line = styled.div`
            width:${this.props.width || widths}px;
            height:3px;
            background:green;
            position:absolute;
            bottom:-3px;
            transition :transform 1s ease;
        }`;
        const styles={
            width:`${this.props.width || widths}px`,
            height:'3px',
            background:'green',
            position:'absolute',
            bottom:'-3px',
            left:0,
            transition :`left ${(this.props.time||times)/1000}s ease`,
        }
        return <div style = {styles}></div>
        return <Line />;
    }
    renderNav = () => {
        const {
			navs
		} = this.props;
        const Navs = styled.div`
            float:left;
            padding:6px 14px;
            cursor:pointer;
            box-sizing:border-box;
            text-align:center;
            width:${this.props.width || widths}px;
            &:hover {
                
            }
        }`;
        return navs.map( (item,index) => {
            return <Navs key={index} onClick={ () => this.handleNavClick(index)} >{item}</Navs>
        });
        
    }
    handleNavClick = (selectedNav) => {
        if(this.props.handleOnclick){
            this.props.handleOnclick(selectedNav);
        }
       
    }
    componentWillReceiveProps(nextProps) {
        
    }
    render() {
        const {
            time,
            direction,
            width,
            selectedNav,
            transitionIn,
		} = this.props;
		const defaultStyle = {
            position:'relative',
            display: 'table-cell'
        }
        let pixels=(width || widths) * (selectedNav) +'px';
        return (
            <div style={defaultStyle}>
                <Transitions in={transitionIn} direction = {direction} pixels={ pixels } time={time||times}>
                    {this.renderLine()}
                </Transitions>
               {this.renderNav()}
            </div>
        )
    }
};

export default TabNav;
