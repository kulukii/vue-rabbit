import axios from 'axios'
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
import { userdefineStore } from '@/stores/user'
import router from '@/router';


const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  const userStore = userdefineStore()
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  // 统一错误提示
  ElMessage({
    type: 'warning',
    message: e.response.data.message
  })
  // 401
  if (e.response.status === 401) {
    const userStore = userdefineStore()
    userStore.clearUserInfo()
    router.push('/login')

  }
  return Promise.reject(e)
})

export default httpInstance
