import React, { PureComponent } from 'react';

import { Toast } from 'antd-mobile';

import { List, AutoSizer } from 'react-virtualized';

import { BASE_URL } from '../../utils/api'

import _ from 'underscore';

import './index.less';

import { getLocalCity, saveList } from '../../utils/location';

import { NavHeader } from '../../components/NavHeader';

const letterMapper = {
    '#': '当前城市',
    hot: '热门城市'
}

const houseList = ['北京', '上海', '深圳', '广州']

const parseCiytList = list => {
    // const cityManifest = {};

    // for(const item of list) {
    //     const letter = item.short[0];
    //     const group = cityManifest[letter];

    //     // 判断拼音声母开头的城市对象，是否在对应开头的数组中
    //     group ? group.push(item) : cityManifest[letter] = [item];
    // }

    const cityManifest = _.groupBy(list, i => i.short[0]);

    const cityIndexes = Object.keys(cityManifest).sort();

    return { cityManifest, cityIndexes }
}


export default class CityList extends PureComponent {
    state = {
        cityManifest: {},
        cityIndexes: [],
        activeIndex: 0
    }

    async getCityList() {
        Toast.loading('加载中', undefined, undefined)

        const { status, body } = await (await fetch(BASE_URL + '/area/city?level=1')).json();
        const { status: hotStatus, body: hotBody } = await (await fetch(BASE_URL + '/area/hot')).json();
        const current = await getLocalCity();

        Toast.hide()

        if (status === 200 && hotStatus === 200) {
            const { cityManifest, cityIndexes } = parseCiytList(body);
            // 热门城市。
            cityManifest.hot = hotBody
            cityIndexes.unshift('hot')
            
            // 当前城市。
            cityManifest['#'] = [current]
            cityIndexes.unshift('#')
            console.log(cityManifest, cityIndexes);

            this.setState({ cityManifest, cityIndexes })
        }
    }

    // 渲染索引列
    renderCityIndexes() {
        const { cityIndexes: [...cityIndexes], activeIndex } = this.state;

        cityIndexes[1] = '热';   // length=2

        return cityIndexes.length > 2 && cityIndexes.map((t,i) => (
            <li className="city-index-item" key={t} onClick={this.toRow.bind(this, i)}>
                <span className={activeIndex === i ? 'index-active' : undefined}>{t.toUpperCase()}</span>
            </li>
        ))
    }

    toRow(index) {
        this.cityListElement.scrollToRow(index)
    }

    // 查看当前城市是否有房源
    checkList({ label, value }) {
        if (houseList.includes(label)) {
            saveList({ label, value })

            this.props.history.go(-1)
        }else Toast.info('该城市没有房源', undefined, undefined, false)
    }

    async componentDidMount () {
       await this.getCityList()

       this.cityListElement.measureAllRows();
    }
    
    // 渲染城市列表
    renderCityList({ key, index, style }) {
        const { cityIndexes, cityManifest } = this.state
        const cityLetter = cityIndexes[index]
        const cityList = cityManifest[cityLetter]

        return (
            <div className="city" key={key} style={style}>
                <div className="title">{letterMapper[cityLetter] || cityLetter.toUpperCase()}</div>
                {cityList.map((t, i) => (
                    <div onClick={this.checkList.bind(this, t)} className="name" key={i}>{t.label}</div>
                ))}
            </div>
        )
    }
    
    // 动态设定长度
    countHeight({ index }) {
        const { cityIndexes, cityManifest } = this.state
        const cityLetter = cityIndexes[index]
        const count = cityManifest[cityLetter].length

        return 36 + 50 * count
    }

    rowRenderIndex({ startIndex: activeIndex }) {
        this.setState({ activeIndex })
    }

    render() {
        const { cityIndexes } = this.state
        return (
            <div className="listBox">
                <NavHeader>
                    城市列表
                </NavHeader>

                    <AutoSizer>
                        {({ width, height }) => (
                        <List
                            scrollToAlignment="start"
                            ref={el => this.cityListElement = el}
                            width={width}
                            height={height - 45}
                            rowCount={cityIndexes.length}
                            rowHeight={this.countHeight.bind(this)}
                            rowRenderer={this.renderCityList.bind(this)}
                            onRowsRendered={this.rowRenderIndex.bind(this)}
                        />
                        )}
                    </AutoSizer>

                    <ul className="city-index">{this.renderCityIndexes()}</ul>
            </div>
        )
    }
}