import React, { Component } from 'react';

import FilterTitle from '../FilterTitle';
import FilterPicker from '../FilterPicker';
import FilterMore from '../FilterMore';

import styles from './index.module.css';
import { getLocalCitySync } from '../../../../../utils/location';
import { API } from '../../../../../utils/api';

const defaultSelected = {
    1: ['area', 'null'],
    2: ['null'],
    4: ['null'],
    8: [],
}

export default class Filter extends Component {
  state = {
    hightlight: 0, // '1,2,4'
    conditions: {},
    selected: {
      1: ['area', 'null'],
      2: ['null'],
      4: ['null'],
      8: [],
    },
  };

  get showPicker() {
    return !!(this.state.hightlight & 7);
  }

  get conditionData() {
    const {
      hightlight,
      conditions: { area, subway, rentType, price },
    } = this.state;

    const conditionsMapper = {
      1: [area, subway],
      2: rentType,
      4: price
    };

    return {
      dataSource: conditionsMapper[hightlight],
      cols: hightlight === 1 ? 3 : 1,
    };
  }

  get highlightStatus() {
      // 1. 点的那一项必须高亮。
    let { hightlight } = this.state;
    const { selected } = this.state;

    // 2. 判断选中值是否和默认值相等
    for (const key in selected) {
        hightlight |= selected[key].join('') === defaultSelected[key].join('') ? 0 : key;
    }

    return hightlight;
  }

  get showMore() {
      return this.state.hightlight === 8
  }

  get moreData() {
    const {
        conditions: { area, subway, rentType, price, ...rest },
      } = this.state;
      return rest
  }

  changeHightlight(hightlight) {
    this.setState({ hightlight });
  }

  onSave(value) {
    const { hightlight, selected } = this.state;
    this.setState({
      hightlight: 0,
      selected: { ...selected, [hightlight]: value },
    });
  }

  onCancel() {
    this.setState({ hightlight: 0 });
  }

  async getConditions() {
    // 获取城市id
    const { value } = getLocalCitySync();
    // 通过id获取城市数据
    const { status, body } = await API.get('/houses/condition', { id: value });

    status === 200 && this.setState({ conditions: body });
  }

  componentDidMount() {
    this.getConditions();
  }

  render() {
    const { hightlight, selected } = this.state;

    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {this.showPicker && (
          <div className={styles.mask} onClick={this.onCancel.bind(this)} />
        )}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle
            onClick={this.changeHightlight.bind(this)}
            selectedStatus={this.highlightStatus}
          />

          {/* 前三个菜单对应的内容： */}
          {/* <FilterPicker /> */}
          {this.showPicker && (
            <FilterPicker
              key={hightlight}
              {...this.conditionData}
              value={selected[hightlight]}
              onSave={this.onSave.bind(this)}
              onCancel={this.onCancel.bind(this)}
            />
          )}

          {/* 最后一个菜单对应的内容： */}
          {this.showMore && <FilterMore 
                                data={this.moreData}
                                onSave={this.onSave.bind(this)}
                                value={selected[hightlight]}
                                onCancel={this.onCancel.bind(this)} 
                                />}
        </div>
      </div>
    );
  }
}
