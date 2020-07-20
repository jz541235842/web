import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/App';
import * as serviceWorker from '@/serviceWorker';
import 'antd/dist/antd.css';
console.log(`看一下这是什么 ${process.env.NODE_ENV} 模式!`);
ReactDOM.render(<App />, document.getElementById('root'));

// 如果你想让你的应用离线工作并更快地加载，你可以改变
// unregister() to register() below.注意这会带来一些陷阱。
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
