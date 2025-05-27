// import './assets/main.css

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'


// 引入初始化样式
import '@/styles/common.scss'

// 引入懒加载指令插件
import { lazyPlugin } from '@/directives/index'
// 引入全局组件
import { componentPlugins } from './components'


const app = createApp(App)
const pinia=createPinia()
// 注册持久化插件
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugins)
app.mount('#app')

