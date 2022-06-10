<template>
    <el-container class="layout">
        <el-aside width="auto" class="aside"><Menu /></el-aside>
        <el-container>
            <el-header class="header"><Header /></el-header>
            <el-main calss="main">
                <Tabs />
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>
<script lang="ts" setup>
import Header from '@/Layout/Header/index.vue';
import Menu from '@/Layout/Menu/index.vue';
import Tabs from '@/Layout/Tabs/index.vue';
</script>

<style lang="scss" scoped>
.layout {
    .aside {
        background: aquamarine;
        height: 100vh;
    }
    .header {
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        height: 50px;
        align-items: center;
    }
    .main {
    }
}
</style>
