import React,{Component} from "react";
import { Layout } from 'antd';
import '../style/layout.scss'
// import {withRouter} from "react-router-dom"
import HeaderPage from "./header"
import ContentPage from "./content"

class Index extends Component {
    render(){
        return(
            <Layout>
                <HeaderPage/>
                <ContentPage/>
            </Layout>
        )
    }
}
export default (Index)