<template>
  <div class="container">
    <div class="header">
      <div class="header-item">
        <span class="title"> {{ $t('title.queryCriteria') }}</span>
        <div class="btn">
          <el-button type="primary" size="mini" @click="query">查询</el-button>
          <el-button type="success" size="mini">导出</el-button>
          <el-button type="success" size="mini" @click="massge">消息</el-button>
        </div>
      </div>
      <el-form ref="form" :model="form" label-width="80px" class="from">
        <el-row>
          <el-col :span="6">
            <el-form-item label="注册日期">
              <date @getDate="getTime1" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="用户ID">
              <el-input v-model="form.userId" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="实名认证">
              <el-select v-model="form.value" placeholder="实名认证">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item label="用户姓名">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="手机号码">
              <el-input v-model="form.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="渠道来源">
              <el-select v-model="form.region" placeholder="渠道来源">
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="贷款状态">
              <el-select v-model="form.value1" placeholder="贷款状态">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="身份证">
              <el-input v-model="form.userName" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="main">
      <span class="title">申请列表</span>
      <el-table

        :data="tableData"
        border
        class="list"
        header-row-class-name="table-header"
      >
        <el-table-column prop="userId" label="序号" width="50" />
        <el-table-column prop="addTime" label="注册时间" />
        <el-table-column prop="userId" label="用户ID">
          <template slot-scope="scope">
            <el-button type="text" @click="openinpath(scope.row.userId)">{{ scope.row.userId }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="mobile" label="手机号码" />
        <el-table-column label="是否复贷">
          <template slot-scope="scope">
            <span v-if="scope.row.isRepeatLoan==1">是</span>
            <span v-if="scope.row.isRepeatLoan==2">不是</span>
          </template>
        </el-table-column>
        <el-table-column prop="agentName" label="注册渠道" />
        <el-table-column prop="userStatus" label="实名认证" />
        <el-table-column prop="userName" label="姓名" />
        <el-table-column prop="idNumber" label="身份证" />
        <el-table-column prop="agentNames" label="渠道来源" />
        <el-table-column label="贷款状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==0">关闭</span>
            <span v-if="scope.row.status==1">申请中</span>
            <span v-if="scope.row.status==2">打款中</span>
            <span v-if="scope.row.status==3">待还款</span>
            <span v-if="scope.row.status==4">已结清</span>
            <span v-if="scope.row.status==5">已逾期</span>
          </template>
        </el-table-column>
        <el-table-column prop="addTimes" label="申请时间" />
      </el-table>
      <pagination
        v-show="form.totalSize>0"
        :total="form.totalSize"
        :page.sync="form.page"
        :limit.sync="form.pageSize"
        @pagination="getList"
      />
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import Date from '@/components/Date'
import { register, queryAllMessage } from '@/api/user'
export default {
  components: { Pagination, Date },
  data() {
    return {
      form: {
        date1: '',
        date2: '',
        name: '',
        region: '',
        phone: '',
        userName: '',
        userId: '',
        totalSize: 0,
        page: 1, // 当前页
        pageSize: 20,
        value: '',
        value1: ''
      },
      total: '',
      tableData: [],
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      jsondata: {
        userId: null,
        status: null,
        beginAddTime: null,
        endAddTime: null,
        ocrUserName: null,
        agentName: null,
        loanStatus: null,
        mobile: null,
        idNumber: null
      },
      options: [
        {
          value: '0',
          label: '未成功'
        },
        {
          value: '1',
          label: '认证成功'
        },
        {
          value: '3',
          label: '认证失败'
        }
      ],
      options1: [
        {
          value: '审核中',
          label: '审核中'
        },
        {
          value: '拒绝',
          label: '拒绝'
        },
        {
          value: '放款中',
          label: '放款中'
        },
        {
          value: '还款期',
          label: '还款期'
        },
        {
          value: '以结清',
          label: '以结清'
        },
        {
          value: '部分还款',
          label: '部分还款'
        },
        {
          value: '逾期',
          label: '逾期'
        }
      ]
    }
  },
  mounted() {
    this.getList()
  },
  created() {
    queryAllMessage(this.jsondata).then(r => {
      this.tableData = r.data.list
      this.form.totalSize = r.data.totalSize
      console.log(r.data.list)
    })
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      const that = this
      that.listLoading = true
      queryAllMessage(that.jsondata)
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
      // 判断用户id是否为空
      if (this.form.userId == '') {
        this.jsondata.status = null
      } else {
        this.jsondata.userId = this.form.userId
      }
      // 判断实名认证是否为空
      if (this.form.value == '') {
        this.jsondata.status = null
      } else {
        this.jsondata.status = this.form.value
      }
      // 判断手机号码是否为空
      if (this.form.phone == '') {
        this.jsondata.mobile = null
      } else {
        this.jsondata.mobile = this.form.phone
      }
      // 判断身份证是否为空
      if (this.form.userName == '') {
        this.jsondata.idNumber = null
      } else {
        this.jsondata.idNumber = this.form.userName
      }
      // 判断贷款状态是否为空
      if (this.form.value1 == '') {
        this.jsondata.loanStatus = null
      } else {
        this.jsondata.loanStatus = this.form.value1
      }
      // 判断用户姓名是否为空
      if (this.form.name == '') {
        this.jsondata.ocrUserName = null
      } else {
        this.jsondata.ocrUserName = this.form.name
      }
      console.log(this.jsondata)
      this.tableData = []
      queryAllMessage(this.jsondata).then(r => {
        this.tableData = r.data.list
      })
    },
    getTime1(date) {
      this.form.date1 = date[0]
      this.form.date2 = date[1]
    },
    openinpath(id) {
      this.$router.push(`userMsg/${id}`)
    },
    massge() {
      this.$router.push('systemMsg')
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
  }
}
</style>
