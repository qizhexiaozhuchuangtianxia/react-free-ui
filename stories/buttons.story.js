import React from 'react';
import { storiesOf } from '@storybook/react';
import  { Buttons } from '../src/Buttons';
import iconfont from '../src/iconFont/iconfont.css';
function handleOnTouchTap() {
    console.log('click button')
}
storiesOf('Buttons', module)
    .add('buttons', () => (
        <div>
            <Buttons text='I`m button' onTouchTap={handleOnTouchTap}
                hoverColors='rgba(0,0,0,0.09)'/>
            <p style={{margin:'10px'}}></p>
            <Buttons text='I`m button' onTouchTap={handleOnTouchTap}
                hoverColors='rgba(0,0,0,0.09)'
                leftIcon = {<i className="icon iconfont icon-set"></i>}/>
            <p style={{margin:'10px'}}></p>
            <Buttons text='I`m button' onTouchTap={handleOnTouchTap}
                hoverColors='rgba(0,0,0,0.09)'
                leftIcon = {<i className="icon iconfont icon-set"></i>}
                rightIcon = {<i className="icon iconfont icon-set"></i>}/>
        </div>
    ))
    

