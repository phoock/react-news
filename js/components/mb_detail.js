//导入文件依赖库
import React from 'react';
import {Row, Col, Tabs} from 'antd';
const TabPane = Tabs.TabPane;
//导入文件
import MBHeader from './mb_header.js';
import MBFooter from './mb_footer.js';
import MB_detail_article from './pc_detail_article.js';
import MB_detail_comment from './pc_detail_comment.js';

export default class PCDetail extends React.Component {

    render() {
        return (<Row className='mb_index'>
            <MBHeader></MBHeader>
            <Col span={1}></Col>
            <Col span={22}>
                <MB_detail_article uniquekey={this.props.match.params.uniquekey}></MB_detail_article>
                <MB_detail_comment uniquekey={this.props.match.params.uniquekey}></MB_detail_comment>
                <MBFooter></MBFooter>
            </Col>
            <Col span={1}></Col>
        </Row>)
    }
}
