import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Colgroup extends Component {

    static propTypes = {
       columns : PropTypes.array,
    };
    
    creatColgroup = () => {
        const {
			columns,
		} = this.props;
        return (
            <colgroup>
                {
                    columns.map( (item,index) => {
                        return (
                            <col key={index} style={{width:`${item.width}px`}}></col>
                        )
                    })
                }
            </colgroup>
        )
        
    }
    render() {
        const {
			
		} = this.props;
		
        return this.creatColgroup();
    }
};

export default Colgroup;
