import React, { Component } from 'react';
import Table from './Table';
import HandleTable from '../utils/HandleTable';
const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
}, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: '12%',
}, {
    title: 'Address',
    dataIndex: 'address',
    width: '30%',
    key: 'address',
}];

const data = [{
    key: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    children: [{
        key: 11,
        name: '2',
        age: 42,
        address: 'New York No. 2 Lake Park',
    }, {
        key: 12,
        name: '22',
        age: 30,
        address: 'New York No. 3 Lake Park',
        children: [{
            key: 121,
            name: 'Jimmy Brown',
            age: 16,
            address: 'New York No. 3 Lake Park',
        }],
    }, {
        key: 13,
        name: '222',
        age: 72,
        address: 'London No. 1 Lake Park',
        children: [{
            key: 131,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park',
            children: [{
                key: 1311,
                name: 'Jim Green jr.',
                age: 25,
                address: 'London No. 3 Lake Park',
            }, {
                key: 1312,
                name: 'Jimmy Green sr.',
                age: 18,
                address: 'London No. 4 Lake Park',
            }],
        }],
    }],
}, {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
}];
class TableDemo extends Component {
    constructor(props){
        super(props);
        this.Htable = new HandleTable(data);
        this.state = {
            list:this.Htable.tableList
        }
    }
    showMore = (item) => {
        this.Htable.expandTree(item);
        this.setState({
            list:this.Htable.tableList
        })
    }
    render() {
        return <div>
            <Table 
            columns={columns} 
            dataSource={this.state.list} 
            scroll={{ y: 300 }} 
            showMore = {this.showMore}
            />
        </div>
    }

}
export default TableDemo;


