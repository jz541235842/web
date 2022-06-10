<template>
  <el-container>
    <el-header class="header" height="100px">
      <el-row :gutter="30" class="row">
        <el-col :span="6" :offset="22">
          <el-button type="primary">导出</el-button>
        </el-col>
      </el-row>
      <span class="demonstration">操作日志</span>
    </el-header>
    <el-main>
      <el-row class="roud">
        <el-radio v-model="radio" label="1" @change="changeOne">组别配置</el-radio>
        <el-radio v-model="radio" label="2" @change="changeTwo">组员配置</el-radio>
      </el-row>
      <el-row>
        <el-table :data="tableData" border style="width: 100%" v-if="num">
          <el-table-column type="index" label="序号" width="90" align="center"></el-table-column>
          <el-table-column prop="name" label="操作人" width="180" align="center"></el-table-column>
          <el-table-column prop="address" label="信审组名称" align="center"></el-table-column>
          <el-table-column prop="address" label="操作类型" align="center"></el-table-column>
          <el-table-column prop="address" label="操作事件" align="center"></el-table-column>
        </el-table>
        <el-table :data="tableData" border style="width: 100%" v-else>
          <el-table-column type="index" label="序号" width="90" align="center"></el-table-column>
          <el-table-column prop="name" label="操作人" width="180" align="center"></el-table-column>
          <el-table-column prop="address" label="信审组员" align="center"></el-table-column>
          <el-table-column prop="address" label="修改前组别" align="center"></el-table-column>
          <el-table-column prop="address" label="修改后组别" align="center"></el-table-column>
          <el-table-column prop="address" label="操作类型" align="center"></el-table-column>
          <el-table-column prop="address" label="操作时间" align="center"></el-table-column>
        </el-table>
        <el-pagination
          :page-sizes="[10, 20, 30]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          class="pagination"
        >
        </el-pagination>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      radio: "1",
      num:true,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods:{
    changeOne(){
      this.num = true;
    },
    changeTwo(){
      this.num = false;
    }
  }
};
</script>

<style scoped>
.header {
  background-color: #fff;
  border-bottom: 1px solid #d8dce5;
  padding: 20px;
}
.row {
  margin-top: 10px;
  margin-bottom: 10px;
}
.roud {
  margin-bottom: 10px;
  margin-left: 5px;
}
.pagination{
  margin-top: 10px;
}
</style>