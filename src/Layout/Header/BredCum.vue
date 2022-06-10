<template>
    <el-breadcrumb separator="/">
        <!-- <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item> -->
        <el-breadcrumb-item v-for="item in tabs" :key="item.path">{{ item.meta.title }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script lang="ts" setup>
import { ref, Ref, watch } from 'vue';
import { useRoute, RouteLocationMatched } from 'vue-router';
const route = useRoute();
// 定义面包屑数组
const tabs: Ref<RouteLocationMatched[]> = ref([]);
const getBreducm = () => {
    // 获取所有meta和title
    let mached = route.matched.filter(item => item.meta && item.meta.title);
    // 判断第一个是否是首页  如果不是  构造一个
    const first = mached[0];
    console.log('2222');
    if (first === undefined) {
        mached = [{ path: '/home', meta: { title: '首页' } } as any].concat(mached);
    } else if (first.path !== '/home') {
        mached = [{ path: '/home', meta: { title: '首页' } } as any].concat(mached);
    }

    //   设置面包屑导航数据
    tabs.value = mached;
};
getBreducm();
watch(
    () => route.path,
    () => getBreducm()
);
</script>
