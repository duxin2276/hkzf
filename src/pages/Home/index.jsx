import React, { Component } from 'react';

import { Route } from 'react-router-dom'
import Index from './Index/index';
import News from './News';


export default class Home extends Component {
    render() {
        return (
            <div>
                {/* 子路由挂载点 */}
                <Route path="/home/index" component={Index}/>
                <Route path="/home/news" component={News}/>
            </div>
        )
    }
}