import {debounce} from "./utils"
export const itemImgListener = {
  data(){
    return{
       itemImgListener:null,
    }
  },
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh,50)
    this.itemImgListener = ()=>{
      refresh()
    }
    // 3.监听图片加载完成,用事件总线
    this.$bus.$on('itemImageLoad',this.itemImgListener)
  },
}
