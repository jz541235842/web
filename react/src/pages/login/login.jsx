import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './login.less'
import logo from '../../assets/img/logo512.png'
import { Form, Icon, Input, Button, message } from 'antd';
import { reqLogin } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
//登录的路由组件
class Login extends Component {
    handleSubmit = (e) => {
        //阻止事件的默认行为
        e.preventDefault();
        //对所有的表单进行验证
        this.props.form.validateFields(async (err, values) => {
            //验证成功
            if (!err) {
                const r = await reqLogin(values);
                if (r.success) {
                    message.success('登录成功')
                    memoryUtils.user = 'jiaozhi'  //保存在内存中
                    storageUtils.saveUser('jiaozhi')//保存在loaclstorage中
                    //跳转到管理界面
                    //跳转到管理界面不需要回退到登录界面  用replace 
                    this.props.history.replace('/')
                }
            } else {
                message.error('检验失败')
            }
        })
        // //得到form对象
        // const form = this.props.form;
        // //获取表单项输入的数据
        // const jsondata = form.getFieldsValue();
        // console.log(jsondata)
    }

    validatePwd = (rule, value, callback) => {
        // console.log('11', rule, value)
        if (value.length < 4) {
            callback('密码最少四位')//验证通过
        } else {
            callback()//验证通过
        }

        // callback('输入有误') //验证失败，并指定提示的文本
    }

    render() {
        //判断用户是否登录
        const user = memoryUtils.user
        if (!JSON.stringify(user) === '{}') {
            return <Redirect to="/" />
        }
        //得到一个强大功能的from对象
        const { getFieldDecorator } = this.props.form;
        return (<div className="login">
            <header className="login-header">
                <img src={logo} alt="logo" /><h1>后台管理系统</h1>
            </header>
            <section className="login-content">
                <h2>用户登录</h2>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('account', {//配置对象  属性名是特定的一些名称
                            rules: [{ required: true, message: 'Please input your username!' }],
                            initialValue: "admin"
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [
                                { required: true, message: 'Please input your Password!' },
                                { validator: this.validatePwd },
                            ],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                         </Button>
                    </Form.Item>
                </Form>
            </section>
        </div>)
    }
}
//高阶函数
//高阶组件
//包装from  组件生成一个新的组件
const WrapLogin = Form.create()(Login)
export default WrapLogin;
// 前台表单验证
// 收集表单数据

//async和await
//1.作用
//简化了promise对象的使用：不用再使用then()来指定成功/失败的回调函数
//以同步编码（没有回调函数了）方式实现异步流程
//
//2.哪里写await
//在返回promise的表达式左侧写await:不想要promise,想要promise异步执行的成功的value数据
//3.哪里写async
//await所在函数的（最进的）定义的左侧写async