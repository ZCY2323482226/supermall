import axios from 'axios'

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
     baseURL: 'http://152.136.185.210:7878/api/hy66',

    // baseURL: 'http://adi-v3.dev',
    timeout: 5000
  })

  // 2.axios拦截器
  // 请求拦截的作用
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    // console.log(err);
  })



  // 响应拦截
  instance.interceptors.response.use(res =>{
    return res.data;
  },err =>{
    console.log(err);
  })

  return instance(config)

}

// 函数调用 ->压入函数栈（保存函数调用过程中所有变量）
// 函数调用结束 -》弹出函数栈(释放函数所有变量)
