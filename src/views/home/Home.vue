<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <tab-control class="tab-control"
                    :titles="['流行','新款','精选']"
                    @tabClick="tabClick"
                    ref="tabControl1"
                    v-show="isTabFixed"/>
      <Scroll class="content"
                ref="scroll"
                :probe-type="3"
                @scroll="contentScroll"
                :pull-up-load="true"
                @pullingUp="loadMore" >
          <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
          <RecommendView :recommends="recommends"/>
          <feature-view></feature-view>
          <tab-control :titles="['流行','新款','精选']"
                      @tabClick="tabClick"
                      ref="tabControl2" />
          <goods-list :goods="showGoods"/>

      </Scroll>
      <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>

</template>

<script>
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import featureView from './childComps/featureView.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/content/backTop/BackTop.vue'


import NavBar from 'components/common/navbar/NavBar.vue'
// 导入网络请求接口
import {getHomeMultidata,getHomeGoods} from 'network/home'
import {itemImgListener} from "common/mixin"


export default {
  name:"Home",
  components:{
    HomeSwiper,
    RecommendView,
    featureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    NavBar,
  },
  mixin:[itemImgListener],
  data(){
    return{
      // resault:null
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0, list:[]},
        'new':{page:0, list:[]},
        'sell':{page:0, list:[]},
      },
      currentType:'pop',
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,
      itemImgListener:null,
    }
  },
  created(){
    // 在组件创建好后从接口请求多个数据
    this.getHomeMultidata();
    // 请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');


  },
  mounted(){
    // 以下代码被注释是因为混入代码代替了它
    // const refresh = this.debounce(this.$refs.scroll.refresh,50)
    // // 3.监听图片加载完成,用事件总线
    // this.itemImgListener = ()=>{
    //   refresh()
    // }
    // this.$bus.$on('itemImageLoad',this.itemImgListener)

  },
  activated(){
    this.$refs.scroll.scroll.y = this.saveY;
    this.$refs.scroll.refresh( )
  },
  deactivated(){
    // 1.保存y值
    this.saveY = this.$refs.scroll.scroll.y
    // 2.取消全局监听
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  methods:{
    /*
      事件监听相关方法
    */
  //  debounce是防抖函数
    debounce(func,delay){
      let timer = null
      // ...args表示可以传入多个参数，如果只是args就只能传入一个参数
      return function(...args){
        if(timer) clearTimeout(timer)
        timer = setTimeout(()=>{
          func.apply(this,args)
        },delay)
      }

    },
    tabClick(index){
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl2.currentIndex = index;
      this.$refs.tabControl1.currentIndex = index;
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position){
    //  console.log(position);
    // 1.判断BackTop是否显示
    this.isShowBackTop = (-position.y) > 1000
    // 2.决定tabControl是否吸顶（position:fixed）
    this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
      // 解决下拉加载滚动长度问题，refresh重新刷新一次
      this.$refs.scroll.scroll.refresh()
    },
    // 获取轮播图的offsetTop
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /*
      请求数据相关方法
    */
    getHomeMultidata(){
        getHomeMultidata().then(res=>{
        // console.log(res);
        // this.resault = res.data
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page +1
      getHomeGoods(type,page).then(res=>{
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page +=1
        this.$refs.scroll.finishPullUp()
    })
    }
  }
}

</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var( --color-tint);
    color: #fff;
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  .tab-control{
    background-color: #fff;
    /* sticky属性在达到指定高度之前是sticky，滚动在达到指定高度后会自动改成fixed */
    position: relative;
    z-index: 9;
  }
  .content{
    height: calc(100% - 93px);
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

</style>

