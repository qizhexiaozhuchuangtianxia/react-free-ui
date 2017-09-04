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
            <Buttons 
                text='按钮' 
                onTouchTap={handleOnTouchTap}
                hoverColors='rgba(0,0,0,0.09)'/>
            <p style={{margin:'10px'}}></p>
            <Buttons text='I`m button' onTouchTap={handleOnTouchTap}
                hoverColors='rgba(3,40,430,0.3)'
                leftIcon = {<i className="icon iconfont icon-set"></i>}
                style={{color:'green'}}
                leftIconStyle={{color:'#0000EE'}}/>
            <p style={{margin:'10px'}}></p>
            <Buttons text='I`m button' 
                onTouchTap={handleOnTouchTap}
                hoverColors='rgba(0,0,0,0.5)'
                leftIcon = {<i className="icon iconfont icon-set"></i>}
                rightIcon = {<i className="icon iconfont icon-set"></i>}/>
        </div>
    ))
    

