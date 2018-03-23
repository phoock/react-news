//导入文件依赖库
import React from 'react';
import {Card} from 'antd';
import {Link} from 'react-router-dom';
//导入文件

export default class PCBody_list extends React.Component{
    constructor(){
        super();
        this.state={
            list_Data:'',
            type:'top',
            title:'头条'
        }
    }
    componentWillMount(){
        var myFetchOptions = {
            method:"GET"
        }
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type='+this.state.type+'&count='+this.props.count,myFetchOptions)
        .then(response=>response.json())
        .then((json)=>{
            this.setState({
                list_Data:json
            })
        })
    }
    componentWillReceiveProps(nextProps){
        const turnTitle = {
            top:"头条 ",
            shehui:"社会",
            guonei:"国内",
            guoji:"国际",
            yule:"娱乐",
            tiyu:"体育",
            keji:"科技"
        }
        var myFetchOptions = {
            method:"GET"
        }
        const newType=nextProps.type||'top';
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type='+newType+'&count='+this.props.count,myFetchOptions)
        .then(response=>response.json())
        .then((json)=>{
            this.setState({
                list_Data:json,
                title:turnTitle[nextProps.type]||'头条'
            })
        })
    }
    render(){
        const {list_Data} = this.state;
        const main_list = list_Data.length?
        list_Data.map((item,index)=>(
            <li key={index}><Link to={`/detail/${item.uniquekey}`}><p><span>{item.date}&nbsp;&nbsp;&nbsp;&nbsp;</span>{item.title}</p></Link></li>
        ))
        :'还没有数据哦';

        return (
            <div>
                <Card title={this.state.title} bordered={false} style={{
                        width: '100%'
                    }}>
                    <ul className="main_list">
                        {main_list}
                    </ul>
                </Card>
            </div>
        )
    }
}
