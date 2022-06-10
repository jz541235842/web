<template>
  <div class="container">
    <div class="main">
      <span class="title">审批记录</span>
      <el-table :data="list.ryExamineResultList" style="width: 100%" border v-loading="listLoading">
        <el-table-column prop="addTime" label="审批时间"></el-table-column>
        <el-table-column prop="name" label="审批节点"></el-table-column>
        <el-table-column prop="result" label="审批结果"></el-table-column>
        <el-table-column prop="result" label="拒绝原因"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>
    </div>
    <div class="main">
      <span class="title">电核记录</span>
      <el-table :data="list.ryExaminePhoneList " style="width: 100%" border v-loading="listLoading">
        <el-table-column prop="date" label="与借款人关系"></el-table-column>
        <el-table-column prop="relationName" label="姓名"></el-table-column>
        <el-table-column prop="relationMobile" label="手机"></el-table-column>
        <el-table-column prop="address" label="获取结果"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="adminId" label="信审人员"></el-table-column>
        <el-table-column prop="address" label="最近一次更新时间"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getApprovalRecord } from "@/api/letter";
export default {
  data() {
    return {
      listLoading: true,
      userId: "",
      list: []
    };
  },
  methods: {
    //获取审批记录
    getApprovalRecord() {
      this.listLoading = true;
      getApprovalRecord({ userId: this.userId })
        .then(r => {
          this.listLoading = false;
          this.list = r.data;
        })
        .catch(r => {});
    }
  },
  mounted() {
    this.userId = this.$route.query.id;
    this.getApprovalRecord();
  }
};
</script>
<style lang="scss" scoped>
.container {
  background: #f2f2f2;
  padding: 20px;
  .title {
    font-size: 16px;
    display: block;
    margin-bottom: 10px;
  }
  .main {
    background: #fff;
    padding: 20px;
  }
}
</style>
