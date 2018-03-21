import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clazz from 'classnames';
import { splitPx } from '../utils'
import Colgroup from './Colgroup';
import { excludeAttr } from '../utils';

class Body extends Component {

    static propTypes = {
        dataSource: PropTypes.array,
        columns: PropTypes.array,
        scroll: PropTypes.object
    };

    creatTr = () => {
        const {
            dataSource,
        } = this.props;
        return dataSource.map((item, i) => {
            return (
                <tr key={item.name}>
                    {this.createTd(item)}
                </tr>
            )
        });
    }
    createTd = (item) => {
        let newItem = excludeAttr(item, ['key', 'children','id','pid','level','index','rootid']);
        return Object.values(newItem).map((value,j) => {
            
            if(j===0 && item.children && item.children.length>0){
                return <td key={value}><i className="icon iconfont icon-add" onClick={() => this.props.showMore(item)}></i>{value}</td>
            }else{
                return <td key={value}>{value}</td>
            }
        });
    }
    
    render() {
        const {
            dataSource,
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
                    <Colgroup columns={columns} />
                    <tbody>
                        {this.creatTr()}
                    </tbody>
                </table>
            </div>
        )
    }
};

export default Body;
