import React, { Component } from 'react';

import { Route } from 'react-router-dom';

// 导入tabbar
import { TabBar } from 'antd-mobile';
// 导入子组件
import HouseList from './HouseList';
import Index from './Index/index';
import News from './News';
import Profile from './Profile'

// 导入样式
import './index.css';

const tabList = [
    {title: '首页', icon: 'ind', path: '/home', component: Index, exact: true},
    {title: '找房', icon: 'findHouse', path: '/home/list', component: HouseList},
    {title: '咨询', icon: 'infom', path: '/home/news', component: News},
    {title: '我的', icon: 'my', path: '/home/profile', component: Profile}
]

export default class Home extends Component {

      renderRouter() {
          return tabList.map(({ icon, ...rest}) => (<Route key={icon} {...rest} />))
      }

      renderTabList() {
          return tabList.map(t => {
              const icon = <i className={`iconfont icon-${t.icon}`}></i>

              return (
                <TabBar.Item
                    title={t.title}
                    key={t.icon}
                    icon={icon}
                    selectedIcon={icon}
                    selected={this.props.location.pathname === t.path}
                    onPress={() => this.props.history.replace(t.path)}
                />
              )
          })
      }

    render() {
        return (
            <div className="home">
                {/* 子路由挂载点 */}
                {this.renderRouter()}

                {/* tabbar挂载点 */}
                <TabBar tintColor="#21b97a">
                    {this.renderTabList()}
                </TabBar>
            </div>
        )
    }
}