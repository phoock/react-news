//导入文件依赖库
import React from 'react';
import {Link} from 'react-router-dom';
import {
    Row,
    Col,
    Menu,
    Icon,
    Modal,
    Button,
    Tabs,
    Input,
    Form,
    message
} from 'antd';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
//导入文件
class PCHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            hasLogined: false,
            current: 'top',
            userNickName: '',
            userid: 0,
            visible: false,
            action: 'login'
        }
    }
    handleClick(e) {
        if (e.key == 'register') {
            this.setState({current: e.key, visible: true});
        } else {
            this.setState({current: e.key});
        }

    }
    showModal() {
        this.setState({visible: true});
    }
    handleCancel() {
        this.setState({visible: false});
    }
    handleSubmit(e) {
        var self = this;
        e.preventDefault();
        if (this.state.action == 'login') {
            this.props.form.validateFields(['userName','password'],(err, values) => {
                if (!err) {
                    self.handleLoingRegister(values)
                }
            });
        } else if (this.state.action == 'register') {
            this.props.form.validateFields(['r_userName','r_password','r_confirmPassword'],(err, values) => {
                if (!err) {
                    self.handleLoingRegister(values)
                }
            });
        }

    }
    handleLoingRegister(values) {
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action + "&username=" + values.userName + "&password=" + values.password + "&r_userName=" + values.r_username + "&r_password=" + values.r_password + "&r_confirmPassword=" + values.r_confirmPassword, myFetchOptions).then(response => response.json()).then(json => {
            console.log(json);
            this.setState({
                userid:json.UserId||1107,
                userNickName:json.NickUserName||values.r_username||values.userName
            })
            localStorage.userid = this.state.userid;
            localStorage.userNickName = this.state.userNickName;
            this.setState({
                visible: false,
                hasLogined:true
            })
            message.success('登陆成功');
        }).catch((err)=>{
             message.error('账号不存在或密码错误');
             console.log(err);
        });
    }
    logout(){
        this.setState({
            hasLogined:false
        })
        localStorage.userid = '';
        localStorage.userNickName = '';
    }
    checkPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('r_password')) {
            callback('两次输入的密码不一样')
        } else {
            callback()
        }
    }
    changeAction(key) {
        if (key == 1) {
            this.setState({action: 'register'})
        } else if (key == 2) {
            this.setState({action: 'login'})
        }
    }
    componentWillMount() {
        if (localStorage.userNickName != '') {
            this.setState({hasLogined: true, userNickName: localStorage.userNickName, userid: localStorage.userid});
        }
    }
    render() {
        const {visible, loading} = this.state;
        const {getFieldDecorator} = this.props.form;
        const userShow = this.state.hasLogined
            ? <Menu.Item key="logout" className="register">
                    <Button type="primary">{this.state.userNickName}</Button>
                    &nbsp;&nbsp;
                    <Link to={'/usercenter'}>
                        <Button type="dashed">个人中心</Button>
                    </Link>
                    &nbsp;&nbsp;
                    <Button type="ghost" onClick={this.logout.bind(this)}>退出</Button>
                </Menu.Item>
            : <Menu.Item key="register" className="register">
                <Icon type="appstore"/>注册/登陆
            </Menu.Item>;
        return (<header>
            <Row>
                <Col span={2}></Col>
                <Col span={4}>
                    <Link to="/" className="logo">
                        <img src="/images/logo.png" alt="logo"/>
                        <span>ReactNews</span>
                    </Link>
                </Col>
                <Col span={16}>
                    <Menu onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]} mode="horizontal">
                        <Menu.Item key="top">
                            <Link to={`/type/top`}>
                                <Icon type="tags-o" style={{
                                        fontSize: 22,
                                        position: 'relative',
                                        top: '3px'
                                    }}/>头条
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="shehui">
                            <Link to={`/type/shehui`}>
                                <Icon type="tags-o" style={{
                                        fontSize: 22,
                                        position: 'relative',
                                        top: '3px'
                                    }}/>社会
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="guonei">
                            <Link to={`/type/guonei`}>
                                <Icon type="tags-o" style={{
                                        fontSize: 22,
                                        position: 'relative',
                                        top: '3px'
                                    }}/>国内
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="guoji">
                            <Link to={`/type/guoji`}>
                                <Icon type="tags-o" style={{
                                        fontSize: 22,
                                        position: 'relative',
                                        top: '3px'
                                    }}/>国际
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="yule">
                            <Link to={`/type/yule`}>
                                <Icon type="tags-o" style={{
                                        fontSize: 22,
                                        position: 'relative',
                                        top: '3px'
                                    }}/>娱乐
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="tiyu">
                            <Link to={`/type/tiyu`}>
                                <Icon type="tags-o" style={{
                                        fontSize: 22,
                                        position: 'relative',
                                        top: '3px'
                                    }}/>体育
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="keji">
                            <Link to={`/type/keji`}>
                                <Icon type="tags-o" style={{
                                        fontSize: 22,
                                        position: 'relative',
                                        top: '3px'
                                    }}/>科技
                            </Link>
                        </Menu.Item>
                        {userShow}
                    </Menu>

                    <Modal visible={visible} onCancel={this.handleCancel.bind(this)} footer={[<Button key="取消" onClick={this.handleCancel.bind(this)}>取消</Button>
                            ]}>
                        <Tabs defaultActiveKey="2" onChange={this.changeAction.bind(this)}>
                            <TabPane tab={<span> < Icon type = "user-add" /> 注册</span>} key="1">
                                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                                    <FormItem label="用户名">
                                        {
                                            getFieldDecorator('r_userName', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请输入用户名!'
                                                    }
                                                ]
                                            })(<Input prefix={<Icon type = "user" style = {{ color: 'rgba(0,0,0,.25)' }}/>} autoComplete="off" placeholder="Username"/>)
                                        }
                                    </FormItem>
                                    <FormItem label="请输入密码">
                                        {
                                            getFieldDecorator('r_password', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '不能为空!'
                                                    }
                                                ]
                                            })(<Input prefix={<Icon type = "lock" style = {{ color: 'rgba(0,0,0,.25)' }}/>} type="password" autoComplete="off" placeholder="Password"/>)
                                        }
                                    </FormItem>
                                    <FormItem label="再次输入密码">
                                        {
                                            getFieldDecorator('r_confirmPassword', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请输入密码!'
                                                    }, {
                                                        validator: this.checkPassword.bind(this)
                                                    }
                                                ]
                                            })(<Input prefix={<Icon type = "lock" style = {{ color: 'rgba(0,0,0,.25)' }}/>} type="password" autoComplete="off" placeholder="Password"/>)
                                        }
                                    </FormItem>
                                    <FormItem>
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            注册
                                        </Button>
                                    </FormItem>
                                </Form>
                            </TabPane>
                            <TabPane tab={<span> < Icon type = "heart-o" /> 登陆</span>} key="2">
                                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                                    <FormItem label="用户名">
                                        {
                                            getFieldDecorator('userName', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请输入用户名!'
                                                    }
                                                ]
                                            })(<Input prefix={<Icon type = "user" style = {{ color: 'rgba(0,0,0,.25)' }}/>} autoComplete="off" placeholder="Username"/>)
                                        }
                                    </FormItem>
                                    <FormItem label="密码">
                                        {
                                            getFieldDecorator('password', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请输入密码!'
                                                    }
                                                ]
                                            })(<Input prefix={<Icon type = "lock" style = {{ color: 'rgba(0,0,0,.25)' }}/>} type="password" autoComplete="off" placeholder="Password"/>)
                                        }
                                    </FormItem>
                                    <FormItem>
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            登陆
                                        </Button>
                                    </FormItem>
                                </Form>
                            </TabPane>
                        </Tabs>
                    </Modal>
                </Col>
                <Col span={2}></Col>
            </Row>
        </header>)
    }
}

export default PCHeader = Form.create()(PCHeader)
