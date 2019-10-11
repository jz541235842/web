<template>
  <div class="container">
    <div class="header">
      <el-form ref="form" :model="form" label-width="90px" class="from">
        <el-col :span="6">
          <el-form-item label="客户手机号">
            <el-input v-model="form.phone" />
          </el-form-item>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button type="primary" @click="query">查询</el-button>
        </el-col>
      </el-form>
    </div>
    <div class="main">
      <div>
        <span class="title">沟通记录</span>
        <el-button type="primary" size="mini" class="export">导出</el-button>
      </div>
      <el-table :data="tableData" border class="list" header-row-class-name="table-header">
        <el-table-column label="序号" type="index" width="50" />
        <el-table-column prop="userNumber" label="客户电话" />
        <el-table-column prop="callNumber" label="来电号码" />
        <el-table-column label="咨询类别">
          <template slot-scope="scope">
            <span v-if="scope.row.type==0">其他</span>
            <span v-if="scope.row.type==1">注册</span>
            <span v-if="scope.row.type==2">登录</span>
            <span v-if="scope.row.type==3">实名认证</span>
            <span v-if="scope.row.type==4">借款</span>
            <span v-if="scope.row.type==5">额度</span>
            <span v-if="scope.row.type==6">放款</span>
            <span v-if="scope.row.type==7">还款</span>
            <span v-if="scope.row.type==8">找回密码</span>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="咨询内容" />
        <el-table-column prop="customerService" label="客服" />
        <el-table-column prop="addTime" label="记录时间" />
      </el-table>
      <!-- <pagination
        v-show="totalSize>0"
        :total="totalSize"
        :page.sync="form.page"
        :limit.sync="form.pageSize"
        @pagination="getList"
      /> -->
    </div>
  </div>
</template>
<script>
import { queryCallRecordList } from '@/api/user'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data() {
    return {
      form: {
        name: '',
        phone: '',
        page: 1, // 当前页
        pageSize: 20 // 每页20条数据
      },
      jsondata: {},
      totalSize: 0,
      tableData: [],
      currentPage3: 1,
      userNumber: ''
    }
  },
  created() {
    queryCallRecordList(this.jsondata).then(r => {
      console.log(r.data.list)
      this.tableData = r.data.list
    })
  },
  // mounted() {
  //   this.getList()
  // },
  methods: {
    query() {
      this.jsondata.userNumber = this.form.phone
      queryCallRecordList(this.jsondata).then(r => {
        this.tableData = r.data.list
      })
    }
    // getList() {
    //   const that = this
    //   that.listLoading = true
    //   queryCallRecordList(that.jsondata)
    //     .then(r => {
    //       const res = r.data
    //       that.tableData = res
    //       that.totalSize = res.length
    //       that.listLoading = false
    //     })
    //     .catch(r => {})
    // },
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #f2f2f2;
  padding: 20px;
  .header {
    background: #fff;
    padding: 10px;
    margin-bottom: 10px;
    height: 55px;
  }
  // 主体
  .main {
    background: #fff;
    padding: 20px;
    .table-header {
      font-size: 13px !important;
    }
    .export {
      float: right;
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
