import React,{Component} from "react"
import { Row, Col } from 'antd';
import '../../style/home.scss'
import Background1 from "../../static/img/bg1.png"
import Background2 from "../../static/img/bg2.png"
import Background3 from "../../static/img/bg3.png"
import {RightCircleOutlined} from '@ant-design/icons'
import {connect} from "react-redux"
import {withRouter} from "react-router-dom";
const sectionStyle1 = {
    width: '100%',
    height: '100%',
    background: `url(${Background1}) no-repeat center center fixed`,
    backgroundSize: 'cover',
}
const sectionStyle2 = {
    width: '100%',
    height: '100%',
    background: `url(${Background2}) no-repeat center center fixed`,
    backgroundSize: 'cover',
}
const sectionStyle3 = {
    width: '100%',
    height: '100%',
    background: `url(${Background3}) no-repeat center center fixed`,
    backgroundSize: 'cover',
}

class Home extends Component{
    constructor(props){
        super(props)
        console.log('一、constructor()渲染阶段的第一个生命周期',props)
    }
    jump=(val)=>{
        console.log('22',this.props,this)
        // alert(val)
        this.props.history.push({pathname: val})
    }
    render(){
        return(
            <Row>
                <Col span={8} className="home-container"  style={sectionStyle1}>
                    <div className="home-container-item">
                        <h1>能源治理管控系统</h1>
                        <p>杭州，中国数字经济第一城，数据分析与城市治理已息息相关。能源，城市快速发展的源动力，能源管控与城市治理已密不可分。庞大的能源数据和广泛的关联分析相结合，必将助推城市治理向精准、高效的道路上不断前行。</p>
                        <RightCircleOutlined className="icon-item" onClick={()=>this.jump('/energy')}/>
                    </div>
                </Col>
                <Col span={8} className="home-container" style={sectionStyle2}>
                    <div className="home-container-item">
                            <h1>用能信息管理系统</h1>
                            <p>杭州，中国数字经济第一城，数据分析与城市治理已息息相关。能源，城市快速发展的源动力，能源管控与城市治理已密不可分。庞大的能源数据和广泛的关联分析相结合，必将助推城市治理向精准、高效的道路上不断前行。</p>
                            <RightCircleOutlined className="icon-item"  onClick={()=>this.jump('/info')}/>
                        </div>
                </Col>
                <Col span={8} className="home-container" style={sectionStyle3}>
                    <div className="home-container-item">
                            <h1>节能信息服务系统</h1>
                            <p>杭州，中国数字经济第一城，数据分析与城市治理已息息相关。能源，城市快速发展的源动力，能源管控与城市治理已密不可分。庞大的能源数据和广泛的关联分析相结合，必将助推城市治理向精准、高效的道路上不断前行。</p>
                            <RightCircleOutlined className="icon-item"  onClick={()=>this.jump('/saving')}/>
                        </div>
                </Col>
          </Row>
        )
    }
}
// export default Home
const mapStateToProps=state=>state;
const mapDispathchToProps=dispatch=>({})
export default connect(mapStateToProps,mapDispathchToProps)(withRouter(Home));