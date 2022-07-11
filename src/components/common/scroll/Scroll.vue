<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name:'Scroll',
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return{
      scroll:null
    }
  },
  mounted(){
    //1. 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      /*在better-scroll中 button无论是否设置click:false，botton都可以点击
        div必须设置click:ture才能被监听点击
       这里click设置为true tab-control才能点击 */
      click:true,
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad
    })

    // 2.监听滚动的位置
    if(this.probeType == 2 || this.probeType == 3){
       this.scroll.on('scroll',(position)=>{
          // console.log(position);
          this.$emit('scroll',position)
        })
    }

    // 监听上拉事件
    if(this.pullUpLoad){
      this.scroll.on('pullingUp',()=>{
        // console.log("上拉加载");
        this.$emit('pullingUp')
      })
    }

  },
  methods:{
    scrollTo(x,y,time=500){
     this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    refresh(){
      // console.log('----');
      this.scroll && this.scroll.refresh()
    }
  }
}
</script>

<style>

</style>
