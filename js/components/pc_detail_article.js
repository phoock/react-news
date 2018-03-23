//导入文件依赖库
import React from 'react';
//导入文件

export default class PC_detail_article extends React.Component {
    constructor() {
        super();
        this.state = {
            innerhtml: ''
        }
    }
    componentWillMount() {
        const myFetchOption = {
            method: 'GET'
        }
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey='+this.props.uniquekey, myFetchOption).then(response => response.json()).then((json) => {
            this.setState({innerhtml: json.pagecontent})
        })
    }
    render() {
        const {innerhtml} = this.state;
        const article = innerhtml
            ? innerhtml
            : '暂时没有数据';
        return (<div dangerouslySetInnerHTML={{__html: `${article}`}}></div>)
    }
}
