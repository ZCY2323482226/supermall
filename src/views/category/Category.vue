<template>
  <div class="category">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <tab-control :title="['综合' , '新品' , '销量']"
                  ref="tabControl1"
                  @tabClick="tabClick"
                  class="tab-control tab-control2"
                  v-show="isTabFixed"/>
  </div>

</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue"
import TabControl from "components/content/tabControl/TabControl";
import BScroll from 'better-scroll'
export default {
  name:"Category",
  components:{
    NavBar,
    TabControl,

  },
  data(){
    return{
      scroll:null,
      isTabFixed: false,
    }
  },
  methods:{

  },
  created(){
    // this.scroll = new BetterScroll('wrapper')
  },
  // 组件创建完成后调用
  mounted(){
    /*
    默认情况下，BScroll是不可以实时监听滚动的位置的，
    要想实现实时监听需要传入options可选参数
    probeType  probe:侦测的意思
    probeType:0或probeType:1都是不侦测
    probeType:2在手指滚动的过程中侦测，手指离开后的惯性滚动不侦测
    probeType:3只要是滚动都侦测

    */
    let wrapper = document.querySelector('.wrapper')
    this.scroll = new BScroll(wrapper,{
      probeType:3,
      pullUpLoad:true
    })
    // 获取监听滚动得到的位置
  //   this.scroll.on('scroll',(position)=>{
  //     console.log(position);
  //   })
    this.scroll.on('pullingUp',()=>{
      console.log('上拉加载更多');
      // 发送网络请求，请求更多数据
      // 等数据请求完成，并且将新的数据展示出来后
      setTimeout(()=>{
        this.scroll.finishPullUp()
      },2000)

    })
  }
}
</script>

<style>
  .category {
    height: 100%;
  }

  .nav-bar {
    position: relative;
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
    z-index: 3;
  }
</style>
