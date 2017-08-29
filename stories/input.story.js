import React from 'react';
import { storiesOf } from '@storybook/react';
import { Input } from '../src/Input';

function handleClick(v){
  console.log(v,'search')
}
storiesOf('Input', module)
  .add('input', () => (
    <div>
      <Input onClickSearch={handleClick} placeholder='请输入搜索内容' type='text' openSearchIcon={true} inputStyle = {{width:'300px',height:'40px'}}/>
    </div>
  ))


