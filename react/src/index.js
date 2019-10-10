// 入口js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// 路由拦截器
import loaclStorage from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'
//读取loacl中保存的user,保存在内存中
const user=loaclStorage.getUser();
memoryUtils.user=user;
//将App组件标签渲染到index页面的div上
ReactDOM.render(<App/>,document.getElementById('root'))
