import React from 'react';
import PropTypes from 'prop-types';
import clazz from 'classnames';

import memoize from 'lodash/memoize';

import ListItem from './ListItem';


class List extends ListItem {

    static propTypes = {
        ...ListItem.propTypes,
    };

    static defaultProps = {
        ...ListItem.defaultProps,
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        // const newProps = {
        //     className: clazz(this.props.className),
        //     ...this.props
        // };
        const {
            children,
            style,
            ...other
        } = this.props;
        const rootStyle= {
            padding:'8px 8px',
            border: '1px solid red',
            borderRadius: '3px',
        }
        return (
            <div {...other} style={Object.assign(rootStyle,style)}>{children}</div>
        )
        // return React.cloneElement(this.props.children, newProps);
    }
}

/*const listLayout = memoize((items = []) => 
    <ul>
        { items.map((component, index) => <li key={ index }>{ component  }</li>) }
    </ul>
);*/
export default List;
