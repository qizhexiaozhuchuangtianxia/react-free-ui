import React from 'react';
import { storiesOf } from '@storybook/react';
import { Table } from '../src/Table';
const columns = [{
  title: '姓名',
  dataIndex: 'name',
  width: 200,
}, {
  title: '年龄',
  dataIndex: 'age',
  width: 200,
}, {
  title: '地址',
  dataIndex: 'address',
}];

const data = [];
for (let i = 0; i < 57; i++) {
  data.push({
    name: `Hello ${i}`,
    age: i,
    address: `北京市朝阳区 ${i}`,
  });
}
storiesOf('Table', module)
  .add('table', () => (
    <div>
      <Table columns={columns} data={data} scroll={{y:300}}/>
    </div>
  ))


