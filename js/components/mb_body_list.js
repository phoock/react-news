//导入文件依赖库
import React from 'react';
import {Link} from 'react-router-dom';
//导入文件
import PC_body_carousel from './pc_body_carousel.js'

export default class MbBody extends React.Component {
    constructor() {
        super();
        this.state = {
            list_Data: ''
        }
    }
    callback(key) {
        console.log(key);
    }
    componentWillMount() {
        var myFetchOptions = {
            method: "GET"
        }
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=' + this.props.type + '&count=' + this.props.count, myFetchOptions).then(response => response.json()).then((json) => {
            this.setState({list_Data: json})
        })
    }
    render() {
        const {list_Data} = this.state;
        const main_list = list_Data.length
            ? list_Data.map((item, index) => (<li key={index}>
                <Link to={`/detail/${item.uniquekey}`}>
                    <p>
                        {item.title}
                    </p>
                </Link>
            </li>))
            : '还没有数据哦';

        return (<div>
            
            {main_list}
        </div>)
    }
}
