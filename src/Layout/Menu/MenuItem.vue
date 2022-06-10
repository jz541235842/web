<template>
   <template v-for="item in menuList" :key="item.path">
       <el-sub-menu :index="item.path"  v-if="item.children && item.children.length>0">
        <template #title>
            <el-icon><component :is="item.meta.icon"/></el-icon>
            <span>{{item.meta.title}}</span>
        </template>
        <menu-item :menu-list="item.children"></menu-item>
    </el-sub-menu>
    <el-menu-item :index="item.path" v-else>
        <el-icon><component :is="item.meta.icon"/></el-icon>
        <template #title>{{item.meta.title}}</template>
    </el-menu-item>
    
   </template>
</template>
<script setup lang="ts">
defineProps(['menuList'])
</script>