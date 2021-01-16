import React, { Component } from 'react';
import { Icon } from 'antd-mobile';

import { NavHeader } from '../../../components/NavHeader';
import Filter from './components/Filter';

export default class HouseList extends Component {
    render() {
        return (
            <div>
                {/* 顶部导航 */}
                <NavHeader left={false} rightContent={<Icon type="search" color="#333" onClick={() => this.props.history.push('/search')}></Icon>}>条件找房</NavHeader>

                {/* 筛选条件 */}
                <Filter />
            </div>
        )
    }
}