//导入文件依赖库
import React from 'react';
import {Row, Col} from 'antd';
//导入文件
import PCHeader from './pc_header.js';
import PCFooter from './pc_footer.js';
import PC_body_imglist from './pc_body_imglist.js';
import PC_detail_article from './pc_detail_article.js';
import PC_detail_comment from './pc_detail_comment.js';

export default class PCDetail extends React.Component {

    render() {
        return (<Row className='pc_index'>
            <PCHeader></PCHeader>
            <Col span={2}></Col>
            <Col span={20}>
                <Row style={{
                        "marginTop" : "20px"
                    }}>
                    <Col span={16}>
                        <PC_detail_article uniquekey={this.props.match.params.uniquekey}></PC_detail_article>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={6}>
                        <PC_body_imglist border={true} title='娱乐' type='yule' count={8} width={'150px'}></PC_body_imglist>
                    </Col>
                </Row>
                <Row style={{
                        "marginTop" : "20px"
                    }}>
                    <Col span={24}>
                        <PC_detail_comment uniquekey={this.props.match.params.uniquekey}></PC_detail_comment>
                        <PCFooter></PCFooter>
                    </Col>
                </Row>

            </Col>
            <Col span={2}></Col>
        </Row>)
    }
}
