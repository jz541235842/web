//能发送异步ajax请求函数模块
//封装axios库
//函数返回值是一个promise对象

import axios from 'axios'
import { message } from 'antd'
export default function ajax(url, data = {}, type = "GET") {
    return new Promise((resolve, reject) => {
        let promise
        //1.执行异步ajax请求
        if (type === 'GET') {//发送get请求
            promise = axios.get(url, {//配置对象
                params: data//指定请求参数
            })
        } else {//发送post请求
            promise = axios.post(url, data)
        }
        //2.如果成功了，调用resolve(value)
        promise.then((r) => {
            let res=r.data;
            if(!res.success){
                message.error(res.message)
            }else{
                resolve(res)
            }
            //3.如果失败了，不到用reject(reason),而是提示异常信息
        }).catch((r) => {
            message.error('请求出错了：' + r)
        })
    })
}