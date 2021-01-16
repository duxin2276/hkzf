import React, { Component } from 'react';

import FilterFooter from '../../../../../components/FilterFooter';

import styles from './index.module.css';

export default class FilterMore extends Component {
    state = {
        selectedValues: this.props.value
    }

    tagChangeHandler(value) {
        // 1. 拿到原始数组（准备新地址）
        const { selectedValues: [...selectedValues] } = this.state;
        // 2. 判断是否有数据，如果有就删除，没有就添加。
        selectedValues.some((t, i, arr) => t === value && arr.splice(i, 1)) || selectedValues.push(value)
        // 3. 保存修改后的数据
        this.setState({ selectedValues })
    }

  // 渲染标签
  renderFilters(key) {
    // 高亮类名： styles.tagActive
    return this.props.data[key].map(t => (
        <span 
            onClick={this.tagChangeHandler.bind(this, t.value)} 
            key={t.value} 
            className={[styles.tag, ...this.state.selectedValues.includes(t.value) ? [styles.tagActive] : []].join(' ')}>{t.label}</span>
    ))
  }

  render() {
      const { onSave, onCancel } = this.props;
      const { selectedValues } = this.state;
    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div className={styles.mask} onClick={() => onCancel()} />

        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilters('roomType')}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilters('oriented')}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilters('floor')}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderFilters('characteristic')}</dd>
          </dl>
        </div>

        {/* 底部按钮 */}
        <FilterFooter 
            className={styles.footer}
            cancelText="清空"
            okText="保存"
            onOk={() => onSave(selectedValues)}
            onCancel={() => this.setState({ selectedValues: [] })} 
            />
      </div>
    );
  }
}
