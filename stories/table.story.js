import React from 'react';
import { storiesOf } from '@storybook/react';
import { Table } from '../src/Table';
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  width: 200,
}, {
  title: 'Age',
  dataIndex: 'age',
  width: 200,
}, {
  title: 'Address',
  dataIndex: 'address',
}];

const data = [];
for (let i = 0; i < 57; i++) {
  data.push({
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}
storiesOf('Table', module)
  .add('table', () => (
    <div>
      <Table columns={columns} data={data} scroll={{y:300}}/>
    </div>
  ))


