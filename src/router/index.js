import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = ()=> import('../views/home/Home.vue')
const Cart = ()=> import('../views/cart/Cart.vue')
const Category = ()=> import('../views/category/Category.vue')
const Profile = ()=> import('../views/profile/Profile.vue')
const Detail = ()=> import('../views/detail/Detail.vue')


Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
// 修改 原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err=>err)
}

const routes = [
  {
    path: '',
    redirect:'/home'
  },
  {
    // component 打成conpnent,导致组件内容不显示
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/detail/:iid',
    component:Detail
  },
]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
