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
      <el-form ref="form" label-width="90px" class="from">
        <el-row>
          <el-col :span="8">
            <el-form-item label="应还款时间">
              <date @getDate="getTime1" />
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="2">
            <el-form-item label="催收状态">
              <el-select v-model="form.value2" placeholder="催收状态" clearable>
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="催收阶段">
              <el-select v-model="form.value3" placeholder="催收阶段" clearable>
                <el-option
                  v-for="item in options3"
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
          <el-col :span="4">
            <el-form-item label="催收员">
              <el-select v-model="form.value1" placeholder="催收员" clearable>
                <el-option
                  v-for="(item,index) in options1"
                  :key="index"
                  :label="item.label"
                  :value="item.value1"
                />
              </el-select>
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
            <span v-if="scope.row.stageStatus==0">SO</span>
            <span v-if="scope.row.stageStatus==1">S1</span>
            <span v-if="scope.row.stageStatus==2">S2</span>
            <span v-if="scope.row.stageStatus==2">S3</span>
          </template>
        </el-table-column>
        <el-table-column prop="loanAmount" label="贷款金额" />
        <el-table-column prop="loanName" label="产品名称" />
        <el-table-column prop="loanPeriod" label="期限" />
        <el-table-column prop="userMobile" label="手机号码" />
        <el-table-column prop="userName" label="姓名" />
        <el-table-column prop="userGender" label="性别" />
        <el-table-column prop="userAge" label="年龄" />
        <el-table-column prop="loanRepayRealAmount" label="应还款时间" />
        <el-table-column prop="loanAmount" label="应还总金额" />
        <el-table-column prop="loanRepayRealAmount" label="已还金额" />
        <el-table-column prop="overdueDays" label="逾期天数" />
        <el-table-column prop="customerName" label="催收员" />
        <el-table-column label="催收状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==0">待催收</span>
            <span v-if="scope.row.status==1">催收中</span>
            <span v-if="scope.row.status==2">催收完成</span>
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
import { queryAllLoans, queryCustomerList } from '@/api/collection'
import Pagination from '@/components/Pagination'
import Date from '@/components/Date'
export default {
  components: { Pagination, Date },
  data() {
    return {
      form: {
        // from表单时间选项
        date1: '',
        date2: '',
        name: '',
        phone: '',
        number: '',
        region: '',
        value1: '',
        value2: '',
        value3: '',
        totalSize: 0,
        page: 1, // 当前页
        pageSize: 10 // 每页20条数据
      },
      tableData: [
        // 表格渲染数据
      ],
      currentPage3: 1, // 翻页
      jsondata: {
        // 查询全部案件接口data
        beginLoanRepayTime: null, // 预计还款时间 begin
        endLoanRepayTime: null, // 预计还款时间 end
        status: null, // 催收状态
        stageStatus: null, // 催收阶段
        userName: null, // 用户姓名
        userMobile: null, // 用户手机号
        referLoanNo: null, // 平台借款编号
        isAllocate: null, // 是否以分配
        customerName: null, // 催收员姓名
        page: 1,
        pageSize: 10
      },
      options1: [], // 要查询催收员
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
      options3: [
        // 催收阶段
        {
          value: '0',
          label: 'S0:-2-0D'
        },
        {
          value: '1',
          label: 'S1:1-7D'
        },
        {
          value: '2',
          label: 'S2：8-30D'
        },
        {
          value: '3',
          label: 'S3：30D+'
        }
      ]
    }
  },
  created() {
    queryAllLoans(this.jsondata).then(r => {
      // 查询全部订单
      this.tableData = r.data.list
      this.form.totalSize = r.data.totalSize
    })
    queryCustomerList().then(r => {
      for (let i = 0; i < r.data.length; i++) {
        // 插入所有催收员
        const str = {
          value1: r.data[i].name,
          label: r.data[i].name
        }
        this.options1.push(str)
      }
    })
  },
  methods: {
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
      // 判断催收阶段是否为空
      if (this.form.value3 == '') {
        this.jsondata.stageStatus = null
      } else {
        this.jsondata.stageStatus = this.form.value3
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
      // 判断催收员是否为空
      if (this.form.value1 == '') {
        this.jsondata.customerName = null
      } else {
        this.jsondata.customerName = this.form.value1
      }
      queryAllLoans(this.jsondata).then(r => {
        this.tableData = r.data.list
        this.form.totalSize = r.data.totalSize
      })
    },
    getTime1(date) {
      this.form.date1 = date[0]
      this.form.date2 = date[1]
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
