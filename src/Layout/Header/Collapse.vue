<template>
    <el-icon  class="icons" @click="changeIcon">
      <component  :is="stateFlag? 'Expand':'Fold'"/>
    </el-icon>
</template>

<script lang="ts" setup>
import {ref} from "vue"
import { useStore } from "@/store";
const store = useStore();
const stateFlag=ref(false)
// 图标切换
const changeIcon=()=>{
    stateFlag.value=!stateFlag.value;
    store.commit('setCollapse',stateFlag.value)
}
</script>
<style lang="scss" scoped>
.icons{
    display: flex;
    align-items: center;  
    font-size: 20px;
    color: "#303133";
    height: 50px;
    cursor: pointer;
    margin-right: 10px;
}
</style>
