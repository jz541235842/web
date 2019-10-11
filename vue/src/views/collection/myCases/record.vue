<template>
  <div>
    <el-container class="container">
      <el-header class="header">
        <span class="span">催收记录</span>
      </el-header>
      <el-main class="main">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="addTime" label="催收时间"></el-table-column>
          <el-table-column prop="stageStatus" label="催收阶段"></el-table-column>
          <el-table-column prop="result" label="催收结果"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <el-container class="container">
      <el-header class="header">
        <span class="span">外呼记录</span>
      </el-header>
      <el-main class="main">
        <el-table :data="tableData1" border style="width: 100%">
          <el-table-column prop="relation" label="联系人"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="mobile" label="手机"></el-table-column>
          <el-table-column prop="result" label="联系结果"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column prop="customerName" label="催收员"></el-table-column>
          <el-table-column prop="addTime" label="最近一次更新时间"></el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {queryLoanDetails,queryCollectResult,queryCollectCall} from '@/api/collection'
export default {
  data() {
    return {
      tableData: [],
      tableData1:[],
      jsondata:{ //查询催收结果列表
          poolId:''
      },
      LoadDetailRequest:{ //查询外呼记录列表
        poolId:''
      }
    };
  },
  created(){
    queryCollectResult(this.jsondata).then(r=>{
       this.tableData = r.data
    })
    queryCollectCall(this.LoadDetailRequest).then(r=>{
      this.tableData1 = r.data
    })
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f2f2f2;
}
span {
  font-size: 16px;
}
.header {
  background-color: #fff;
}
.main {
  background-color: #fff;
}
.span {
  line-height: 50px;
}
</style>