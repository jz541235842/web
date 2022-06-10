import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "@/style/index.scss"
import App from './App.vue'
import router from '@/router'
import {store,key} from "./store"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}


app.use(ElementPlus).use(router as any).use(store as any,key)
app.mount('#app')