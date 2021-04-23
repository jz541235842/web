import React from "react";
import { Layout } from 'antd';
import { Redirect, Route, Switch } from "react-router-dom";

import {routes} from "../router/routes"
const { Content  } = Layout;

const ContentPage=({location})=>{
    console.log('location',location)
    return (
            <Content className="layout-content">
                <Switch>
                    {routes.map(ele=><Route render={()=><ele.component/>} key={ele.path} path={ele.path} />)}
                    <Redirect from="/" exact to="/home"/>
                </Switch>
            </Content>
        )
    
}
export default (ContentPage)