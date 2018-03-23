//导入文件依赖库
import React from 'react';
import {Card} from 'antd';
import {Link} from 'react-router-dom';
//导入文件

export default class MbFooter extends React.Component {
    constructor(){
        super();
        this.state={
            imglist_Data:''
        }
    }
    componentWillMount(){
        var myFetchOptions={
            method:'GET'
        }
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type='+this.props.type+'&count='+this.props.count,myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
            this.setState({
                imglist_Data:json
            })
        })
    }
    render() {
        const {imglist_Data} = this.state;
        const imglist=imglist_Data.length?
        imglist_Data.map((item,index)=>(
            <span key={index} className='imglist_ele' style={{width:`${this.props.width}`}}>
                <Link to={`/detail/${item.uniquekey}`}><img src={item.thumbnail_pic_s} style={{width:'100%'}} alt=""/></Link>
                <p className="title">{item.title}</p>
                <p>{item.author_name}</p>
            </span>
        ))
        :'还没有数据哦'
        ;
        return (<div>
            <Card className="imglist_wrap" title={this.props.title} bordered={this.props.border} style={{
                    width: '100%'
                }}>
            {imglist}
            </Card>
        </div>)
    }
}
