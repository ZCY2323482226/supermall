<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="item.index"
    class="tab-control-item" :class="{active: index === currentIndex}" @click="itemClick(index)">
      <span>{{item}} </span>
    </div>
  </div>
</template>

<script>
export default {
  name:'TabControl',
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      // 记录当前tabCOntrol谁处于选中
      currentIndex:0
    }
  },
  methods:{
    itemClick(index){
       this.currentIndex = index;
       this.$emit('tabClick',index)
    }
  }
}
</script>

<style>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    background-color: #fff;
  }
  .tab-control-item{
    flex: 1;
    height: 40px;
    line-height: 40px;
  }
  .tab-control-item span{
    padding: 5px;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 3px solid var(--color-tint);
  }
</style>
