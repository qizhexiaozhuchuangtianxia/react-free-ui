import React from 'react';
import { storiesOf } from '@storybook/react';
import  { List, ListItem } from '../src/List';
import iconfont from '../src/iconFont/iconfont.css';

let list=[
    {text:'list 1'},
    {text:'list 2'},
    {text:'list 3'},
    {text:'list 4'},
    {text:'list 5'},
    {text:'list 6'},
    {text:'list 7'},
    {text:'list 8'},
]
function onTouchTaps(e,item){
    //console.log(item,'click');
}

storiesOf('List', module)
    .add('list', () => (
        <List className="jjj" style={{border:'1px solid #dedede'}}>
            {list.map( (item) => 
                <ListItem 
                    text={item.text} 
                    key={item.text} 
                    root = {{}}
                    leftIcon = {<i className="icon iconfont icon-smile"></i>}
                    leftIconStyle = {{}}
                    rightIcon = {<i className="icon iconfont icon-set"></i>}
                    rightIconStyle = {{}}
                    className="hh" 
                    onClick={(e) => onTouchTaps(e,item)}
                /> 
            )}
        </List>
    ));

