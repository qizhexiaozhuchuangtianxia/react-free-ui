import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clazz from 'classnames';
import {splitPx} from '../utils';
import './tableStyle.css';
import Header from './Header';
import Body from './Body';
class Input extends Component {

    static propTypes = {
        columns : PropTypes.array,
        data : PropTypes.array,
        scroll: PropTypes.object
    };
    
    handleOnFoucs = () => {
    }
    handleOnBlur = () => {
    }
    render() {
        const {
			columns,
            data,
            scroll
		} = this.props;
        return (
            <div className='table-free'>
                <Header columns={columns}/>
                <Body columns={columns} data={data} scroll={scroll}/>
            </div>
        )
    }
};

export default Input;
