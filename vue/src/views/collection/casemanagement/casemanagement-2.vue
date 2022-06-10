<template>
  <div class="container">
    <div class="header">
      <div class="header-item">
        <span class="title">查询条件</span>
        <div class="btn">
          <el-button type="primary" size="mini" @click="query">查询</el-button>
          <el-button type="success" size="mini">导出</el-button>
        </div>
      </div>
      <el-form ref="form" :model="form" label-width="90px" class="from">
        <el-row>
          <el-col :span="10">
            <el-form-item label="应还款时间">
              <date @getDate="getTime1" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="催收状态">
              <el-select v-model="form.value2" placeholder="催收状态">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="用户姓名">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="手机号码">
              <el-input v-model="form.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="贷款编号">
              <el-input v-model="form.number" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="main">
      <span class="title">数据列表</span>
      <el-table :data="tableData" border class="list" header-row-class-name="table-header">
        <el-table-column prop="id" label="序号" width="50" />
        <el-table-column prop="referLoanNo" label="贷款编号" />
        <el-table-column label="催收阶段">
          <template slot-scope="scope">
            <span v-if="scope.row.stageStatus==0">S0</span>
            <span v-if="scope.row.stageStatus==1">S1</span>
            <span v-if="scope.row.stageStatus==2">S2</span>
            <span v-if="scope.row.stageStatus==3">S3</span>
          </template>
        </el-table-column>
        <el-table-column prop="loanAmount" label="贷款金额" />
        <el-table-column prop="loanName" label="产品名称" />
        <el-table-column prop="loanPeriod" label="期限" />
        <el-table-column prop="userMobile" label="手机号码" />
        <el-table-column prop="userName" label="姓名" />
        <el-table-column prop="userGender" label="性别" />
        <el-table-column prop="userAge" label="年龄" />
        <el-table-column prop="loanRepayRealTime" label="应还款时间" />
        <el-table-column prop="address" label="分配时间" />
        <el-table-column prop="address" label="截止时间" />
        <el-table-column prop="overdueDays" label="逾期天数" />
        <el-table-column label="催收状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==0">待催收</span>
            <span v-if="scope.row.status==1">催收中</span>
            <span v-if="scope.row.status==2">催收完成</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="催收备注" />
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="save(scope.$index, scope.row)">去处理</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="form.totalSize"
        :page.sync="jsondata.page"
        :limit.sync="jsondata.pageSize"
        @pagination="getList"
      />
    </div>
  </div>
</template>
<script>
import { queryMyAllLoans } from '@/api/collection'
import Pagination from '@/components/Pagination'
import Date from '@/components/Date'
export default {
  components: { Pagination, Date },
  data() {
    return {
      form: {
        date1: '',
        date2: '',
        name: '',
        phone: '',
        stutas: '',
        value2: '',
        number: '',
        region: '',
        totalSize: 0,
        page: 1, // 当前页
        pageSize: 20 // 每页20条数据
      },
      tableData: [],
      options2: [
        // 催收状态
        {
          value: '0',
          label: '待催收'
        },
        {
          value: '1',
          label: '催收中'
        },
        {
          value: '2',
          label: '催收完成'
        }
      ],
      jsondata: {
        beginLoanRepayTime: null, //  开始时间
        endLoanRepayTime: null, // 结束时间
        status: null, // 催收状态
        stageStatus: null,
        userName: null, // 用户姓名
        userMobile: null, // 用户手机号
        referLoanNo: null, // 平台借款编号
        isAllocate: null, // 是否已分配
        page: 1,
        pageSize: 10
      },
      currentPage3: 1
    }
  },
  created() {
    queryMyAllLoans(this.jsondata).then(r => {
      this.tableData = r.data.list
      this.form.totalSize = r.data.totalSize
      console.log(r.data.list)
    })
  },
  methods: {
    save(index, row) {
      const cons = row.id
      this.$router.push({ path: `myCas/${cons}` })
    },
    getList() {
      const that = this
      that.listLoading = true
      queryAllLoans(that.jsondata)
        .then(r => {
          const res = r.data
          that.form.totalSize = res.totalSize
          that.tableData = res.list
          that.listLoading = false
        })
        .catch(r => {})
    },
    getTime1(date) {
      this.form.date1 = date[0]
      this.form.date2 = date[1]
    },
    query() {
      // 判断开始时间
      if (this.form.date1 == '') {
        this.jsondata.beginLoanRepayTime = null
      } else {
        this.jsondata.beginLoanRepayTime = this.form.date1
      }
      // 判断结束时间
      if (this.form.date2 == '') {
        this.jsondata.endLoanRepayTime = null
      } else {
        this.jsondata.endLoanRepayTime = this.form.date2
      }
      // 判断催收状态是否为空
      if (this.form.value2 == '') {
        this.jsondata.status = null
      } else {
        this.jsondata.status = this.form.value2
      }
      // 判断用户姓名是否为空
      if (this.form.name == '') {
        this.jsondata.userName = null
      } else {
        this.jsondata.userName = this.form.name
      }
      // 判断手机号码是否为空
      if (this.form.phone == '') {
        this.jsondata.userMobile = null
      } else {
        this.jsondata.userMobile = this.form.phone
      }
      // 判断贷款编号是否为空
      if (this.form.number == '') {
        this.jsondata.referLoanNo = null
      } else {
        this.jsondata.referLoanNo = this.form.number
      }
      queryMyAllLoans(this.jsondata).then(r => {
        this.tableData = r.data.list
        this.form.totalSize = r.data.totalSize
      })
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
      height: 50px;
    }
    .title {
      font-size: 16px;
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
