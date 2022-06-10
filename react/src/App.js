//应用的根组件
//引入react
import React, {Component} from 'react'
//引入路由器 Switch某个时间点匹配单个路由 BrowserRouter没有# HashRouter带#
import {BrowserRouter,Route,Switch} from 'react-router-dom'
// 组件名一定要大写
import Login from './pages/login/login'
import Admin from './pages/admin/admin'

export default class App extends Component {

    //必须有一个render方法
    render() {
        return ( < BrowserRouter >
                    <Switch>
                        <Route path='/login' component={Login}></Route>
                        <Route path='/' component={Admin}></Route>
                    </Switch>
                </BrowserRouter>)
        }
      
    }