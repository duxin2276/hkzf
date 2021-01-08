import React from 'react';

import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

import Home from './pages/Home';
import CityList from './pages/CityList';


const App = () => (
    <Router>
        <div className="app">
            
            {/* 配置路由 */}
            <Route path="/home" component={Home}></Route>
            <Route path="/citylist" component={CityList}></Route>
        </div>
    </Router>
)


export default App