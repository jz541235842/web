import  {Component} from "react";
import { Layout } from 'antd';
import { Row, Col } from 'antd';
import Logo from "../assets/img/LOGO.png"
import {UserOutlined} from '@ant-design/icons';

const { Header } = Layout;
class HeaderPage extends Component{
    render(){
        return(<Header className="layout-header">
            <Row>
               <Col span={1} className="Logo">
                   <img src={Logo} width="45" height="45" alt=""/>
               </Col>
               <Col span={2} className="tips">
                  <div className="tips-content">
                        <div className="fis">杭州能源数字治理平台</div>
                        <div>WWW.HZNYSZ.COM</div>
                  </div>
               </Col>
               <Col span={21} className="layout-right">
                   <span>欢迎进入</span><UserOutlined />
               </Col>
            </Row>
        </Header>)
    }
}
export default (HeaderPage);