<template>
  <div class="toast" v-show="show">
    <div>{{this.message}} </div>
  </div>
</template>

<script>
export default {
  name:'Toast',
  props:{
    // message:{
    //   type:String,
    //   default:''
    // },
    // isShow:{
    //   type:Boolean,
    //   default:false
    // }
  },
  data(){
    return{
      message:'',
      show:false
    }
  },
  methods:{
    isShow(message,duration=2000){
      this.show = true;
      this.message = message;
      setTimeout(() => {
        this.show = false;
        this.message = '';
      }, duration);
    }
  }
}
</script>

<style scoped>
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 9;
  color: #fff;
  transform: translate(-50% , -50%);
  background-color: rgba(0, 0, 0, .7);
  padding: 8px 10px;
}
</style>
