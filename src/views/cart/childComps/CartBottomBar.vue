<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isCheckedAll"
                    class="check-bottom"
                    @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计:￥{{totalPrice}}
    </div>
    <!-- <div class="price price-cancel">
      <span>取消</span>
    </div> -->
    <div class="calculate" @click="calculateClick">
      <span>去结算({{checkLength}})</span>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import {mapGetters} from 'vuex'
export default {
  components: { CheckButton },
  name:"CartBottomBar",
  component:{
    CheckButton
  },
  computed:{
    ...mapGetters(['cartList']),
    totalPrice() {
        return this.cartList.filter((item) => {
          return item.checked;
        }).reduce((preValue, item) => {
          return preValue + item.realPrice * item.count;
        }, 0).toFixed(2)
      },
    // 计算选中个数
    checkLength(){
      return this.cartList.filter(item =>{
        return item.checked;
      }).length;
    },
    isCheckedAll(){
      // return !(this.cartList.filter(item => !item.checked).length)
      if(this.cartList.length === 0)return false;
      return !(this.cartList.find(item => !item.checked))
    }
  },
  methods:{
    checkClick(){
      if(this.isCheckedAll){
        return this.cartList.forEach(item => item.checked = false)
      }else{
        return this.cartList.forEach(item => item.checked = true)
      }
    },
    // 点击计算按钮
    calculateClick(){
      if(!this.isCheckedAll){
        this.$toast.isShow('请选择默认的商品', 2000)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar{
  position: relative;
  display: flex;
  height: 40px;
  background-color: #eee;
  line-height: 40px;
}
.check-content{
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.check-bottom{
  width: 20px;
  height: 20px;
  line-height: 20px;
}
.price{
  margin-left: 30px;
}
.calculate{
  position: fixed;
  right: 0;
  width: 90px;
  text-align: center;
  background-color: var(--color-high-text);
}
</style>
