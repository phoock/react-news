//导入文件依赖库
import React from 'react';
import {Card, Input, BackTop, Form, Button,message,Popconfirm} from 'antd';
const {TextArea} = Input;
const FormItem = Form.Item;
//导入文件

class PC_detail_comment extends React.Component {
    constructor() {
        super();
        this.state = {
            getComment: ''
        }
    }
    shortLength(longArr) {
        let shortArr = []
        if (longArr.length >= 10) {
            for (let i = longArr.length - 10; i < longArr.length; i++) {
                shortArr.push(longArr[i])
            }
        }
        return shortArr;
    }
    handleSubmit(e) {
        e.preventDefault();
        const thisComment = this.props.form.getFieldValue('comment');
        if (localStorage.userid) {
            if(thisComment){
                const myFetchOption = {
                    method: 'GET'
                }
                fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid='+localStorage.userid+'&uniquekey='+this.props.uniquekey+'&comment='+thisComment, myFetchOption).then(response => response.json()).then((json) => {
                    message.success('提交成功');
                    this.componentDidMount();
                })
            }else{
                message.error('评论不能为空');
            }

        }else{
            message.error('请登陆');
        }
    }
    userCollect(e){
        e.preventDefault();
        if (localStorage.userid) {
            const myFetchOption = {
                method: 'GET'
            }
            fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid='+localStorage.userid+'&uniquekey='+this.props.uniquekey, myFetchOption).then(response => response.json()).then((json) => {
                message.success('收藏成功');
            })
        }else{
            message.error('请登陆');
        }
    }
    componentDidMount() {
        const myFetchOption = {
            method: 'GET'
        }
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=' + this.props.uniquekey, myFetchOption).then(response => response.json()).then((json) => {
            this.setState({getComment: json})
        })
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const {getComment} = this.state;
        const shortData = this.shortLength(getComment)
        const commentList = getComment.length
            ? shortData.map((item, index) => (<Card key={index} title={item.UserName} style={{
                    "marginTop" : "10px"
                }} extra={<span> {
                    item.datetime
                }
                </span>}>
                <p>{`${item.Comments}`}</p>
            </Card>))
            : '还没有评论哦';
        return (<div>
            {commentList}

            <Form onSubmit={this.handleSubmit.bind(this)}>
                <FormItem label='用户评论' style={{
                        "marginTop" : "30px"
                    }}>
                    {getFieldDecorator('comment')(<TextArea rows={6}/>)}
                </FormItem>
                <FormItem wrapperCol={{
                        span: 24,
                        offset: 10
                    }}>

                    <Button htmlType="submit">
                        提交
                    </Button>
                    <Button type="primary" style={{"marginLeft":"20px"}} onClick={this.userCollect.bind(this)}>
                        收藏此文
                    </Button>
                </FormItem>
            </Form>
            <BackTop/>
        </div>)
    }
}
export default PC_detail_comment = Form.create()(PC_detail_comment)
