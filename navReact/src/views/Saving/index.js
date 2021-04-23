import React,{Component} from "react";
import { Row, Col } from 'antd';
import Background from "../../static/img/bg3.png"
import {LeftCircleOutlined,CaretRightOutlined} from "@ant-design/icons"
import '../../style/common.scss'
import {Link} from "react-router-dom";
const sectionStyle = {
    width: '100%',
    height: '100%',
    background: `url(${Background}) no-repeat center center fixed`,
    backgroundSize: 'cover',
}
class Energy extends Component{
    render(){
        return(
            <Row className="container" style={sectionStyle}>
            <Col span={12} className="container-item">
                <div className="container-items">
                    <h1>用能单位信息管理系统</h1>
                    <h2>助力社会能效提升，共铸蓝天绿水青山</h2>
                    <Link to="/"><LeftCircleOutlined className="icon-item"/></Link>
                </div>
            </Col>
            <Col span={12}  className="container-item">
                <div className="container-items">
                    <p >
                        能源消耗总量不断扩大，意味着社会发展动力源源不断，但综合的管控将促使能源消耗进一步提高效率、提升品质。能源管理策略将成为未来社会发展的核心观念，也将护持杭城的蓝天绿水青山源远流长。
                    </p>
                    <ul className="navList">
                        <li><span className="text-item">入口</span> <CaretRightOutlined /></li>
                    </ul>
                </div>
            </Col>
          </Row>)
    }
}
export default Energy;