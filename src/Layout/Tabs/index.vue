<template>
    <el-tabs v-model="activeTab" type="card" closable @tab-remove="removeTab" @tab-click="clickTabs">
        <el-tab-pane v-for="item in tabList" :key="item.path" :label="item.title" :name="item.path"></el-tab-pane>
    </el-tabs>
</template>
<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useStore } from '@/store';
import { useRoute, useRouter } from 'vue-router';
import { ITab } from '@/store/type';
const route = useRoute();
const router = useRouter();
const store = useStore();
const activeTab = ref('');
const setActiveTab = () => {
    activeTab.value = route.path;
};
const tabList = computed(() => {
    return store.getters['getTab'];
});
// 删除选项卡
const removeTab = (targetName: string) => {
    if (targetName == '/home') return;
    const tabs = tabList.value;
    let activeName = activeTab.value;
    if (activeName === targetName) {
        tabs.forEach((tab: ITab, index: number) => {
            if (tab.path === targetName) {
                const nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                    activeName = nextTab.path;
                }
            }
        });
    }
    //   重新设置当前激活的选项卡
    activeTab.value = activeName;
    //   重新设置选项卡数据
    store.state.tabList = tabs.filter((tab: ITab) => tab.path !== targetName);
    // 跳转路由
    router.push({ path: activeName });
};
// 添加选项卡
const addTab = () => {
    // 1.从当前路由获取path和title
    const { meta, path } = route;
    console.log(89, route);
    // 2.通过vuex设置
    const tab: ITab = {
        title: meta.title as string,
        path: path
    };
    store.commit('setTab', tab);
};
// 点击选项卡
const clickTabs = (item: any) => {
    const { props } = item;
    //   跳转路由
    router.push({ path: props.name });
};
watch(
    () => route.path,
    () => {
        // 1.激活当前选项卡
        setActiveTab();
        //2. 把路由添加到选项卡数据
        addTab();
    }
);
// 解决数据刷新丢失的问题
const beforeRefresh = () => {
    window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('tabsView', JSON.stringify(tabList.value));
    });
    let tabSesson = sessionStorage.getItem('tabsView');
    if (tabSesson) {
        let oldTab = JSON.parse(tabSesson);
        if (oldTab && oldTab.length > 0) {
            store.state.tabList = oldTab;
        }
    }
};
onMounted(() => {
    beforeRefresh();
    // 1.激活当前选项卡
    setActiveTab();
    //2. 把路由添加到选项卡数据
    addTab();
});
</script>
