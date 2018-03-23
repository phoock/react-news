//导入文件依赖库
import React from 'react';

//导入文件
import PCHeader from './pc_header.js';
import PCBody from './pc_body.js';
import PCFooter from './pc_footer.js';
export default class PCIndex extends React.Component {
    render() {
        return (<div className='pc_index'>
            <PCHeader></PCHeader>
            <PCBody type={this.props.match.params.type}></PCBody>
            <PCFooter></PCFooter>
        </div>)
    }
}
