//导入文件依赖库
import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'antd';
//导入文件
import PC_body_imglist from './pc_body_imglist.js'
import PC_body_list from './pc_body_list.js'
import PC_body_project from './pc_body_project.js'
import PC_body_carousel from './pc_body_carousel.js'
export default class PCBody extends React.Component {
    render() {
        return (<Row>
            <Col span={2}></Col>
            <Col span={20} style={{marginTop:"20px"}}>
                <Row>
                    <Col span={7}>
                        <PC_body_carousel></PC_body_carousel>
                        <PC_body_imglist border={false} title='头条' type='top' count={6} width={'120px'}></PC_body_imglist>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={9}>
                        <PC_body_list type={this.props.type} count={18}></PC_body_list>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={6}>
                        <PC_body_project></PC_body_project>
                    </Col>
                </Row>
                <PC_body_imglist border={true} title='娱乐' type='yule' count={9} width={'135px'}></PC_body_imglist>
            </Col>
            <Col span={2}></Col>
        </Row>)
    }
}
