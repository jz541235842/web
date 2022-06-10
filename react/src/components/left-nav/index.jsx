import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './index.less'
import logo from '../../assets/img/logo512.png'
import { Menu, Icon } from 'antd';
import menuList from '../../config/menuConfig'
const { SubMenu } = Menu;
class LeftNav extends Component {
    // 根据menu的数据数组生成对应的标签数组
    //使用map  +  递归调用
    getMenuNodes_map = (menuList) => {
        return menuList.map(item => {
            //如果children  没有值 返回 Menu.Item
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
                //如果children  有值 返回 SubMenu
            } else {
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )

            }
        })
    }
    // 根据menu的数据数组生成对应的标签数组
    //使用reduce  +  递归调用
    getMenuNodes = (menuList) => {
        //得到当前请求的路径
        const path = this.props.location.pathname;
        return menuList.reduce((pre, item) => {
            //向pre添加<Menu.item>
            if (!item.children) {
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ))
                //向pre添加<SubMenu>
            } else {
                //查找一个与当前请求路径匹配的子item
                const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
                //如果存在，说明当前item的子列表需要展开
                if (cItem) {
                    this.openKey = item.key;
                }
                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                ))
            }
            return pre;
        }, [])
    }

    //组件将要挂再  在render()之前执行一次  为第一个render()准备数据（必须同步的）
    componentWillMount() {
        this.MenuNodes = this.getMenuNodes(menuList);
    }
    render() {
        //得到当前请求的路径
        const path = this.props.location.pathname;
        //这种情况 很牛逼 看个人情况是否有隐藏的路由
        // if (path.indexOf('/products') === 0) {
        //     path = '/product'
        // }·
        //得到一个需要打开菜单项的key
        const openKey = this.openKey;
        return (
            <div className="left-nav">
                <Link to="/" className="left-nav-header">
                    <img src={logo} alt="" />
                    <h1>后台管理</h1>
                </Link>
                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                >
                    {
                        this.MenuNodes
                    }
                </Menu>
            </div>
        )
    }
}
//withRouter高阶组件  包装非路由组件  返回一个新组件   新组件向非路由组件传递三个属性：history/location/match
export default withRouter(LeftNav)