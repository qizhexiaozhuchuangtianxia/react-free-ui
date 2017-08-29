import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clazz from 'classnames';
import {splitPx} from '../utils'
import Colgroup from './Colgroup';

class Body extends Component {

    static propTypes = {
        data : PropTypes.array,
        columns : PropTypes.array,
        scroll: PropTypes.object
    };
    
    creatTr = () => {
        const {
			data,
		} = this.props;
        return data.map( (item,i) => {
            return(
                <tr key={i}>
                    {
                        Object.values(item).map( (tdItem,j) => {
                            return <td key= {j}>{tdItem}</td>
                        })
                    }
                </tr>
            )
        });
    }
    render() {
        const {
			data,
            columns,
            scroll,
		} = this.props;
		const bodyStyle = {
            height: scroll ? (scroll.y ? scroll.y : null) : null,
            overflowY: scroll ? (scroll.y ? 'scroll' : null) : null,
        }
        return (
            <div style={bodyStyle}>
                <table>
                    <Colgroup columns={columns}/>
                    <thead>
                        {this.creatTr()}
                    </thead>
                </table>
            </div>
        )
    }
};

export default Body;
