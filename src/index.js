import React from 'react';
import ReactDOM from 'react-dom';

// 导入 Ant-Design-Mobile 组件库 样式
import 'antd-mobile/dist/antd-mobile.css';

// 导入字体样式
import './assets/fonts/iconfont.css';

// 导入 react-virtualized 样式
import 'react-virtualized/styles.css';

// 导入自己配置的样式
import './index.css';

import App from './App';

ReactDOM.render(<App />, document.querySelector('#root'));
