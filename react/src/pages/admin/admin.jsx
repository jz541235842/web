import React, { Component } from 'react'
import { Redirect,Route,Switch } from 'react-router-dom'
// 布局
import { Layout } from 'antd'
import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import User from '../user/user'
import Roles from '../roles/roles'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'

const { Footer, Sider, Content } = Layout

//管理的路由组件
export default class Admin extends Component {
    render() {
        const user = memoryUtils.user
        //如果内存中没有存储user   当前没有登录
        if (JSON.stringify(user) === '{}') {
            //自动跳转到登录界面（在render()中）
            return <Redirect to='/login' />
        } else {

        }
        return (<Layout style={{height:'100%'}}>
            <Sider>
                <LeftNav/>
            </Sider>
            <Layout>
                <Header>Header</Header>
                <Content style={{backgroundColor:'#fff',margin:'20px',height:'100%'}}>
                    <Switch>
                        <Route path="/home" component={Home}/>
                        <Route path="/category" component={Category}/>
                        <Route path="/product" component={Product}/>
                        <Route path="/roles" component={Roles}/>
                        <Route path="/user" component={User}/>
                        <Route path="/charts/bar" component={Bar}/>
                        <Route path="/charts/line" component={Line}/>
                        <Route path="/charts/pie" component={Pie}/>
                        <Redirect to='/home' />
                    </Switch>
                </Content>
                <Footer style={{textAlign:"center",color:'#ccc'}}>推荐使用谷歌浏览器，可以获得更佳页面操作</Footer>
            </Layout>
        </Layout>)
    }
}
