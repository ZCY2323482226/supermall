<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop-info="shopInfo"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addTOCart" class="detail-bottom"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <toast :message="message" v-show="isShow"/>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue"
import DetailSwiper from "./childComps/DetailSwiper.vue"
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue"
import DetailShopInfo from "./childComps/DetailShopInfo.vue"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue"
import DetailParamInfo from "./childComps/DetailParamInfo.vue"
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue"
import GoodsList from "components/content/goods/GoodsList.vue"
import DetailBottomBar from "./childComps/DetailBottomBar.vue"
import BackTop from 'components/content/backTop/BackTop.vue'
import Toast from "../../components/common/toast/Toast.vue"
import Scroll from "components/common/scroll/Scroll.vue"

import {getDetail,Goods,ShopInfo,GoodsParam,getRecommend} from "network/detail"
import {itemImgListener} from "common/mixin"
import {debounce} from "common/utils"
export default {
  name:"Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    BackTop,
    Scroll,
    Toast,
  },
  mixin:[itemImgListener],
  data(){
    return{
      iid:null,
      topImages:[],
      goods:{},
      shopInfo:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      isShowBackTop:false,
      message:'',
      isShow:false,
    }
  },
  created(){
    // 1.保存传入的iid
    this.iid = this.$route.params.iid
    // 2.根据iid请求详细数据
    getDetail(this.iid).then(res=>{
      const data = res.result;
      // console.log(res);
      this.topImages = data.itemInfo.topImages;
      // 获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
      // 获取店铺信息
      this.shopInfo = new ShopInfo(data.shopInfo);
      // 获取商品详情数据
      this.detailInfo = data.detailInfo;
      // 获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);
      // 获取评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }
      // nextTick是下一帧的意思
      // this.$nextTick(()=>{
      //   // 传入themeTopY的数据
      //   // 根据最新的数据，对应的DOM已经渲染出来了
      //   // 但是图片没有加载完（目前获取的offsetTop不包含其中的图片）
      //   // offsetTop值不对的时候，都是因为图片的问题
      //   // this.themeTopYs = [];
      //   // this.themeTopYs.push(0);
      //   // this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      //   // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //   // console.log(this.themeTopYs);
      // })
      this.getThemeTopY = debounce(()=>{
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTopYs);
      },300)
    })
    // 3.获取推荐数据
    getRecommend().then(res=>{
      // console.log(res);
      this.recommends = res.data.list;
    })
  },
  mounted(){
    // 以下代码被注释是因为混入代码代替了它
    // const refresh = debounce(this.$refs.scroll.refresh,50)
    // this.itemImgListener = ()=>{
    //   refresh()
    // }
    // // 3.监听图片加载完成,用事件总线
    // this.$bus.$on('itemImageLoad',this.itemImgListener)


  },
  destroyed(){
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  methods:{
    titleClick(index){
      // console.log(index);
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
    },
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position){
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      for(let i=0; i<length; i++){
        if(this.currentIndex !=i && ((i < length-1 && positionY >= this.themeTopYs[i]
        && positionY < this.themeTopYs[i+1]) || (i === length-1 && positionY >this.themeTopYs[i]))){
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
        // 1.判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000
      // 2.决定tabControl是否吸顶（position:fixed）
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    addTOCart(){
      // 获取购物车要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.newPrice;
      product.iid = this.iid;
      product.realPrice = this.goods.realPrice;
      // 将商品添加到购物车
      // this.$store.commit('addCart',product)
      this.$store.dispatch('addCart',product).then(res =>{

        // this.isShow = true;
        // this.message = res;
        // setTimeout(() =>{
        //   this.isShow = false;
        //   this.message = '';

        // },1500)
        this.$toast.isShow(res,2000)
      })
      // 添加购物车成功

    },
  },
}
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    height: 100vh;
    background-color: #fff;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 44px);
  }
</style>
