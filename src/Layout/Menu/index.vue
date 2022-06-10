<template>
  <MenuLogo class="layout-logo" v-if="!isCollapse" />
  <el-menu
    :default-active="activeIndex"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    router
    @open="handleOpen"
    @close="handleClose"
  >
    <MenuItem :menuList="menuList" />
  </el-menu>
</template>
<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import MenuItem from './MenuItem.vue'
import MenuLogo from './MenuLogo.vue'
// 获取当前路由
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
const store = useStore()
const route = useRoute()
const activeIndex = computed(() => {
  const { path } = route
  // console.log(88, route, path)
  return path
})

// 菜单数据
let menuList = reactive([
  {
    path: '/home',
    meta: {
      title: '首页',
      icon: 'HomeFilled'
    },
    children: []
  },
  {
    path: '/user',
    component: 'Layout',
    name: 'user',
    meta: {
      title: '用户管理',
      icon: 'UserFilled'
    },
    children: [
      {
        path: '/userManagement',
        component: '/userManagement/index',
        name: 'user',
        meta: {
          title: '用户管理',
          icon: ''
        }
      }
    ]
  }
])
const isCollapse = computed(() => {
  return store.getters['getCollapse']
})
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style>
@keyframes logoAnimation {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}
.layout-logo {
  animation: logoAnimation 1s ease-out;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: calc(100vh - 50px);
  overflow: auto;
}
</style>
