import Vue from "vue";
import Vuex from "vuex"
import getters from "./getters";
// 安装插件
Vue.use(Vuex);
const store = new Vuex.Store({
  // 修改任何state里面的东西都要通过mutations
  state:{
    cartList:[],

  },
  getters,
  mutations:{
    addCounter(state,payload){
      payload.count++;
    },
    addToCart(state,payload){
      payload.checked = true;
      state.cartList.push(payload)
    }
  },
  actions:{
    addCart(context,payload){
      return new Promise((resolve,reject) =>{
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
        // 判断oldProduct
        if(oldProduct){
          context.commit('addCounter',oldProduct);
          resolve('当前商品数量+1')
        }else{//添加新的商品
          payload.count = 1;
          context.commit('addToCart',payload);
          resolve('添加了新的商品')
        }
      })
    }
  },

})

// 挂载Vue实例上
export default store
