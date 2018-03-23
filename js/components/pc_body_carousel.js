//导入文件依赖库
import React from 'react';
import {Carousel} from 'antd';
//导入文件

export default class MbFooter extends React.Component {
    render() {
        return (<Carousel autoplay="autoplay">
            <div>
                <img src="/images/carousel_1.jpg" alt=""/>
            </div>
            <div>
                <img src="/images/carousel_2.jpg" alt=""/>
            </div>
            <div>
                <img src="/images/carousel_3.jpg" alt=""/>
            </div>
            <div>
                <img src="/images/carousel_4.jpg" alt=""/>
            </div>
        </Carousel>)
    }
}
