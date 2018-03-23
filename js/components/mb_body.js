//导入文件依赖库
import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Tabs} from 'antd';
const TabPane = Tabs.TabPane;
import MB_body_list from './mb_body_list.js'
//导入文件
import PC_body_carousel from './pc_body_carousel.js'
export default class MbBody extends React.Component {
    constructor() {
        super();
    }
    callback(key) {
        console.log(key);
    }
    render() {
        return (<Row>
            <Col span={1}></Col>
            <Col span={22}>
                <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                    <TabPane tab="头条" key="1">
                        <PC_body_carousel></PC_body_carousel>
                        <MB_body_list type={'top'} count={22}></MB_body_list>
                    </TabPane>
                    <TabPane tab="社会" key="2">
                        <MB_body_list type={'shehui'} count={22}></MB_body_list>
                    </TabPane>
                    <TabPane tab="国内" key="3">
                        <MB_body_list type={'guonei'} count={22}></MB_body_list>
                    </TabPane>
                    <TabPane tab="国际" key="4">
                        <MB_body_list type={'guoji'} count={22}></MB_body_list>
                    </TabPane>
                    <TabPane tab="娱乐" key="5">
                        <MB_body_list type={'yule'} count={22}></MB_body_list>
                    </TabPane>
                </Tabs>
            </Col>
            <Col span={1}></Col>
        </Row>)
    }
}
