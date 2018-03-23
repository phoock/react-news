//导入文件依赖库
import React from 'react';
import {
    Row,
    Col,
    Tabs,
    Card,
    Upload,
    Icon,
    Modal
} from 'antd';
const TabPane = Tabs.TabPane;
import {Link} from 'react-router-dom';
//导入文件
import MBHeader from './mb_header.js';
import MBFooter from './mb_footer.js';
export default class PCCenter extends React.Component {
    constructor() {
        super();
        this.state = {
            myCommentData: '',
            myCollection: '',
            previewVisible: false,
            previewImage: '',
            fileList: [
                {
                    uid: -1,
                    name: 'xxx.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                }
            ]
        }
    }
    handleCancel() {
        this.setState({previewVisible: false})
    }
    handlePreview(file) {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true
        })
    }
    handleChange({fileList}) {
        this.setState({fileList})
    }
    componentWillMount() {
        let myFetchOptions = {
            method: "GET"
        }
        if (localStorage.userid) {
            fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=' + localStorage.userid, myFetchOptions).then(responsive => responsive.json()).then(json => {
                this.setState({myCommentData: json})
            }).catch(err => {
                console.log(err);
            });
            fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=' + localStorage.userid, myFetchOptions).then(responsive => responsive.json()).then(json => {
                this.setState({myCollection: json})
            }).catch(err => {
                console.log(err);
            })
        }
    }
    render() {
        const {myCommentData, myCollection, previewVisible, previewImage, fileList} = this.state;
        const myComment = myCommentData.length
            ? myCommentData.map((item, index) => (<Card key={index} className={"ucCommet"} title={item.datetime} extra={<Link to = {`/detail/${item.uniquekey}`}> {item.uniquekey}</Link>}>
                <p>{item.Comments}</p>
            </Card>))
            : '您还没有发表评论';
        const myColl = myCollection.length
            ? myCollection.map((item, index) => (<p key={index}>
                <Link to={`/detail/${item.uniquekey}`}>{item.Title}</Link>
            </p>))
            : '您还没有收藏过新闻';
        const uploadButton = (<div>
            <Icon type="plus"/>
            <div className="ant-upload-text">Upload</div>
        </div>);
        const props = {
            action: 'http://newsapi.gugujiankong.com/handler.ashx',
            header: {
                'Access-Control-Allow-Origin': '*'
            },
            listType: 'picture-card',
            defaultFileList: [
                {
                    uid: -1,
                    name: 'xxx.png',
                    state: 'done',
                    url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                    thumUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
                }
            ],
            fileList: this.state.fileList,
            onPreview: (file) => {
                this.setState({previewImage: file.url, previewVisible: true})
            }
        }

        return (<div className='mb_index'>
            <MBHeader></MBHeader>
            <Row>
                <Col span={1}></Col>
                <Col span={22}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="我的收藏" key="1">
                            <Card title='我的收藏'>
                                {myColl}
                            </Card>
                        </TabPane>
                        <TabPane tab="我的评论" key="2">
                            {myComment}
                        </TabPane>
                        <TabPane tab="上传头像" key="3">
                            <div className="clearfix">
                                <Upload {...props}>
                                    {
                                        fileList.length >= 3
                                            ? null
                                            : uploadButton
                                    }
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                                    <img alt="example" style={{
                                            width: '100%'
                                        }} src={previewImage}/>
                                </Modal>
                            </div>
                        </TabPane>
                    </Tabs>
                </Col>
                <Col span={1}></Col>
            </Row>
            <MBFooter></MBFooter>
        </div>)
    }
}
