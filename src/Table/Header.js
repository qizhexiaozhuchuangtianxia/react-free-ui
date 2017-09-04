import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clazz from 'classnames';
import {splitPx} from '../utils';
import Colgroup from './Colgroup';
class Header extends Component {

    static propTypes = {
       columns : PropTypes.array,
    };
    
    creatTh = () => {
        const {
			columns,
		} = this.props;

        return columns.map( (item,index) => {
            return (
                <th key={index}>{item.title}</th>
            )
        });
    }
    render() {
        const {
			columns
		} = this.props;
		
        return (
            <div>
                <table>
                    <Colgroup columns={columns}/>
                    <thead>
                        <tr>
                            {this.creatTh()}
                        </tr>
                    </thead>
                </table>
            </div>
        )
    }
};

export default Header;
