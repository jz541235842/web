import React,{Component} from 'react'
import { Table } from 'antd';
//首页路由
export default class User extends Component{
    componentWillMount(){
        
    }
    render(){
        const dataSource = [
            {
              key: '1',
              name: '胡彦斌',
              age: 32,
              address: '西湖区湖底公园1号',
            }
          ];
          
          const columns = [
            {
              title: '姓名',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '年龄',
              dataIndex: 'age',
              key: 'age',
            },
            {
              title: '住址',
              dataIndex: 'address',
              key: 'address',
            },
          ];
        return(
            <div>
                <Table dataSource={dataSource} columns={columns} />
            </div>
        )
    }
}