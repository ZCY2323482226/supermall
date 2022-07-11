import Toast from "./Toast"
const obj = {}

// install在执行的时候会默认传入Vue
obj.install = function(Vue){
  // 以下代码报错Toast,$el未挂载，是undefinded
  // document.body.appendChild(Toast.$el);

  // 1.创建组件构造器
  const toastContructor = Vue.extend(Toast);
  // 2.用new的方式，根据组件构造器可以创建一个组件对象
  const toast = new toastContructor();
  // 3.将组件对象手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  // 4.toast.$el对应的就是挂载的div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast;

}

export default obj
