<template>
  <div class="container">
    <div class="header">
      <div class="header-item">
        <span class="title">操作日志</span>
        <div class="btn">
          <el-button type="success" size="mini">导出</el-button>
        </div>
      </div>
    </div>
    <div class="main">
      <el-table :data="tableData" border class="list" header-row-class-name="table-header">
        <el-table-column label="序号" type="index" width="50" />
        <el-table-column prop="date" label="操作人" />
        <el-table-column prop="name" label="产品名称" />
        <el-table-column prop="address" label="可贷额度" />
        <el-table-column prop="address" label="修改前平台额度" />
        <el-table-column prop="address" label="修改后平台额度" />
        <el-table-column prop="address" label="操作类型" />
        <el-table-column prop="address" label="操作时间" />
      </el-table>
      <div class="paging">
        <el-pagination
          :current-page.sync="currentPage3"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        date1: '',
        date2: '',
        name: '',
        region: ''
      },
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '99'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '888'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '666'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '222 1516 弄'
        }
      ],
      currentPage3: 1
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      console.log(process.env.VUE_APP_BASE_API)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #f2f2f2;
  padding: 20px;
  .header {
    padding: 20px;
    margin-bottom: 10px;
    background: #fff;
    .header-item {
      height: 20px;
    }
    .title {
      font-size: 16px;
      line-height: 20px;
    }
    .btn {
      float: right;
    }
    .line {
      text-align: center;
    }
  }
  // 主体
  .main {
    background: #fff;
    padding: 20px;
    .table-header {
      font-size: 13px !important;
    }
    .list {
      margin-top: 20px;
    }
    .paging {
      margin-top: 15px;
    }
  }
}
</style>
