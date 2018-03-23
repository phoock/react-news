//导入文件依赖库
import React from 'react';

//导入文件
import MbHeader from './mb_header.js';
import MbBody from './mb_body.js';
import MbFooter from './mb_footer.js';
export default class PCIndex extends React.Component{
    render(){
        return (
            <div className='mb_index'>
                <MbHeader></MbHeader>
                <MbBody type={this.props.match.params.type}></MbBody>
                <MbFooter></MbFooter>
            </div>
        )
    }
}
