import React, { Component } from 'react';

import { NavHeader } from '../../components/NavHeader';


import './index.less';

export default class Map extends Component {

    componentDidMount () {
        const { BMap: { Map: BaiduMap, Point} } = window;
        // 1. 创建地图实例
        const map = new BaiduMap(document.querySelector('.container'));

        // 2. 设置中心点坐标
        const point = new Point(116.404, 39.915);

        // 3. 地图初始化，同时设置地图展示级别
        map.centerAndZoom(point, 15);  
    }
    
    render() {
        return (
            <div className="containerBox">
                <NavHeader>
                    地图找房
                </NavHeader>
                <div className="container">
                    
                </div>
            </div>
        )
    }
}