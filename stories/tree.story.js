import React from 'react';
import { storiesOf } from '@storybook/react';
import { Tree } from '../src/Tree';
let data = [{
  name: '一级 1',
  children: [{
    name: '二级 1-1',
    children: [{
      name: '三级 1-1-1'
    }]
  }]
}, {
  name: '一级 2',
  children: [{
    name: '二级 2-1',
    children: [{
      name: '三级 2-1-1'
    }]
  }, {
    name: '二级 2-2',
    children: [{
      name: '三级 2-2-1'
    }]
  }]
}];
function handleOnclick(item){
  console.log(item,4)
}
storiesOf('Tree', module)
  .add('tree', () => (
    <div>
      <Tree data={data} onClick={handleOnclick} open={true} />
    </div>
  ))


