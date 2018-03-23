// 导入样式文件
// import 'normalize.css'
import '../css/pc_main.css'
import '../css/mobile_main.css'

//导入项目依赖库
import React from 'react';
import ReactDOM from 'react-dom';
import MediaQuery from 'react-responsive';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
//导入组件
import PCIndex from './components/pc_index.js'
import PCDetail from './components/pc_detail.js'
import PCCenter from './components/pc_center.js'
import MbIndex from './components/mb_index.js'
import MbDetail from './components/mb_detail.js'
import MBCenter from './components/mb_center.js'

// 测试es6语法是否解析
// var f = () => (5)
// var cc = [1,2,3].map((item,index)=>(item+1))
// console.log(f());
// console.log(cc);

// 测试react是否被解析
export default class Root extends React.Component {
    render() {
        return (<div>
            <MediaQuery query="(min-device-width: 1224px)">
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={PCIndex}></Route>
                        <Route path='/type/:type' component={PCIndex}></Route>
                        <Route path='/detail/:uniquekey' component={PCDetail}></Route>
                        <Route path='/usercenter' component={PCCenter}></Route>
                    </Switch>
                </BrowserRouter>
            </MediaQuery>

            <MediaQuery query="(max-device-width: 1224px)">
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={MbIndex}></Route>
                        <Route path='/detail/:uniquekey' component={MbDetail}></Route>
                        <Route path='/usercenter' component={MBCenter}></Route>
                    </Switch>
                </BrowserRouter>
            </MediaQuery>
        </div>)
    }
}

ReactDOM.render(<Root/>, document.getElementById('mainContainer'));
