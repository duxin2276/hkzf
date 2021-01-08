import React from 'react';
import ReactDOM from 'react-dom';

import App from './App'

// 导入 Ant-Design-Mobile 组件库
import 'antd-mobile/dist/antd-mobile.css'

// 导入自己配置的样式
import './index.css'


ReactDOM.render(<App />, document.querySelector('#root'))
