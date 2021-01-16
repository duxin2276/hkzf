import React, { Component } from 'react';

import { BASE_URL } from '../../../utils/api';

// 导入轮播图组件
import { Carousel, Grid, Flex, WingBlank} from 'antd-mobile';

// 导入样式
import './index.less';

// 导入图片
import nav1 from '../../../assets/images/nav-1.png';
import nav2 from '../../../assets/images/nav-2.png';
import nav3 from '../../../assets/images/nav-3.png';
import nav4 from '../../../assets/images/nav-4.png';
import { getLocalCity } from '../../../utils/location';

const navList = [
    {id: 1, title: '整租', src: nav1, path: '/home/list'},
    {id: 2, title: '合租', src: nav2, path: '/home/list'},
    {id: 3, title: '地图找房', src: nav3, path: '/map'},
    {id: 4, title: '去出租', src: nav4, path: '/rent'},
]


export default class Index extends Component {
    state = {
        carouselList: [],
        groupList: [],
        counselList: [],
        currentCity: '定位中...'
    }

   async getCarouselList() {
          const { body } =  await (await fetch(BASE_URL + '/home/swiper')).json()
          this.setState({
            carouselList: body
          })
    }

    rendercarouselItem() {
        const { carouselList } = this.state
        return carouselList.map(val => (
            <a
              className="carousel-item"  
              key={val.id}
              href="http://www.alipay.com"
            >
              <img src={`${BASE_URL}${val.imgSrc}`} alt="1"/>
            </a>
          ))
    }
    
    renderNavList() {
        return navList.map(t => (
            <div className="item" key={t.title} onClick={() => this.props.history[t.path.startsWith('/home') ? 'replace' : 'push'](t.path)}>
                <img src={t.src} alt="0"/>
                <span>{t.title}</span>
            </div>
        ))
    }
    // 获取4个按钮区域
   async getGroupList() {
       const { status, body } = await (await fetch(BASE_URL + '/home/groups?area=AREA%7C88cff55c-aaa4-e2e0')).json()
       status === 200 && this.setState({groupList: body},)
    }

    // 获取咨询列表
   async getCounsel() {
        const { status, body } = await (await fetch(BASE_URL + '/home/news?area=AREA%7C88cff55c-aaa4-e2e0')).json()
        status === 200 && this.setState({counselList: body})
    }

    // 渲染最新资讯
  renderNews() {
    return this.state.counselList.map(item => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img
            className="img"
            src={`${BASE_URL}${item.imgSrc}`}
            alt=""
          />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ))
  }
    // 获取当前定位位置
    async getCurrentCity() {
        const { label } = await getLocalCity()

        this.setState({ currentCity: label })
    }
    
    componentDidMount() {
        // 获取轮播图数据
        this.getCarouselList();
        // 获取4个按钮区域
        this.getGroupList();
        // 获取宫格列表
        this.getCounsel();

        this.getCurrentCity();
    }

    render() {
        return (
            <div className="index">
                <div className="swiper">
                    {/* 轮播图 */}
                <Carousel key={this.state.carouselList.length} autoplay infinite>
                    {this.rendercarouselItem()}
                </Carousel>
                {/* 搜索框 */}
          <Flex className="search-box">
            {/* 左侧白色区域 */}
            <Flex className="search">
              {/* 位置 */}
              <div
                className="location"
                onClick={() => this.props.history.push('/citylist')}
              >
                <span className="name">{this.state.currentCity}</span>
                <i className="iconfont icon-arrow" />
              </div>

              {/* 搜索表单 */}
              <div
                className="form"
                onClick={() => this.props.history.push('/search')}
              >
                <i className="iconfont icon-seach" />
                <span className="text">请输入小区或地址</span>
              </div>
            </Flex>
            {/* 右侧地图图标 */}
            <i
              className="iconfont icon-map"
              onClick={() => this.props.history.push('/map')}
            />
          </Flex>
        </div>
                {/* 4个按钮区域 */}
                <div className="nav-box">
                    {this.renderNavList()}
                </div>

                {/* 租房小组 */}
        <div className="group">
          <h3 className="group-title">
            租房小组 <span className="more">更多</span>
          </h3>

          {/* 宫格组件 */}
          <Grid
            data={this.state.groupList}
            columnNum={2}
            square={false}
            hasLine={false}
            renderItem={item => (
              <Flex className="group-item" justify="around" key={item.id}>
                <div className="desc">
                  <p className="title">{item.title}</p>
                  <span className="info">{item.desc}</span>
                </div>
                <img src={`${BASE_URL}${item.imgSrc}`} alt="" />
              </Flex>
            )}
          />
        </div>

        {/* 最新资讯 */}
        <div className="news">
          <h3 className="group-title">最新资讯</h3>
          <WingBlank size="md">{this.renderNews()}</WingBlank>
        </div>

            </div>
        )
    }
}