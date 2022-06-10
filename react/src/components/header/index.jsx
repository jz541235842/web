import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import LinkButton from '../link-button'
import { Modal } from 'antd';
import './index.less'
const { confirm } = Modal;
class Header extends Component {
    //得到当前请求路径
    getTitle = () => {
        const path = this.props.location.pathname;
        let title
        menuList.forEach(item => {
            // debugger
            //如果当前对象的key 与path匹配。item的title就是要显示的title
            if (item.key === path) {
                title = item.title
            } else if (item.children) {
                //再所有的子 item中  查找匹配
                const cItem = item.children.find(cItem => cItem.key === path)
                //如果有值说明有匹配的
                if (cItem) {
                    //取出title
                    title = cItem.title
                }
            }
        })
        return title;
    }
    logout = () => {
        confirm({
            content: '确定退出吗？',
            onOk: () => {
                //删除user用户
                storageUtils.removeUser();
                memoryUtils.user = {};
                //跳转login
                this.props.history.replace('/login')
            },
            onCancel() { }
        });
    }
    render() {
        //取出当前需要显示的title
        const title = this.getTitle()
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎 , {memoryUtils.user}</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">2019-10-5</div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header);