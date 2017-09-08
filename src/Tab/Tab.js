import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabNav from './TabNav';
import TabPanes from './TabPanes';
const heights = 300;
const widths = 400;
class Tab extends Component {

    static propTypes = {
       
    };
    constructor(props) {
        super(props);
        this.state = {
            selectedNav:0,
            direction:'right',
            transitionIn:false,
            preSelected:false
		};
    }
    
    handleOnclick = (selectedNav) => {
        if(selectedNav===this.state.selectedNav){
            return;
        }
        let direction=this.state.direction,
            difference=0,
            preSelected=this.state.selectedNav;
        
        if(this.state.selectedNav > selectedNav){
            direction='left',
            difference=selectedNav - this.props.selectedNav 
           
        }else if(this.state.selectedNav < selectedNav){
            direction='right', 
            difference=this.props.selectedNav - selectedNav
        }
        this.setState({
            selectedNav:selectedNav,
            direction:direction,
            difference:difference,
            transitionIn:!this.state.transitionIn,
            preSelected:preSelected
        })
	}
    render() {
        const {
            children,
            time,
            height,
            width
		} = this.props;
		const defaultStyle = {
            width: width ? width : '100%',
            height:`${height||heights}px`,
            border:'1px solid red',
            overflow:'hidden',
        };
        let navs = React.Children.toArray(children).map( item => item.props.nav);
        return (
            <div style={defaultStyle}>
                <TabNav 
                    navs={navs} 
                    handleOnclick={this.handleOnclick} 
                    time={time}
                    {...this.state}/>
                <TabPanes tabPane={children} 
                width={width}
                time={time}
                {...this.state}> 
                  
                </TabPanes> 
            </div>
        )
    }
};

export default Tab;
