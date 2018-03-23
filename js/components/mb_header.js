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
    Form
} from 'antd';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

//导入文件
class MbHeader extends React.Component {
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
            this.props.form.validateFields([
                'userName', 'password'
            ], (err, values) => {
                if (!err) {
                    self.handleLoingRegister(values)
                }
            });
        } else if (this.state.action == 'register') {
            this.props.form.validateFields([
                'r_userName', 'r_password', 'r_confirmPassword'
            ], (err, values) => {
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
                userid: json.UserId || 1107,
                userNickName: json.NickUserName || values.r_username || values.userName
            })
            localStorage.userid = this.state.userid;
            localStorage.userNickName = this.state.userNickName;
            this.setState({visible: false, hasLogined: true})
        });
    }
    logout() {
        this.setState({hasLogined: false})
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
            ? <span className="register right">
                    <Link to={'/usercenter'}>
                        <Icon type="inbox"/>
                    </Link>

                    <Button type="danger" size="small" ghost="ghost" onClick={this.logout.bind(this)}>登出</Button>
                </span>
            : <span className="register right">
                <Icon type="setting" onClick={this.showModal.bind(this)}/>
            </span>;
        return (<header>
            <Row>
                <Col span={1}></Col>
                <Col span={22}>
                    <Link to="/" className="logo">
                        <img src="/images/logo.png" alt="logo"/>
                        <span>ReactNews</span>
                    </Link>

                    {userShow}
                    
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
                <Col span={1}></Col>
            </Row>
        </header>)
    }
}
export default MbHeader = Form.create()(MbHeader)
