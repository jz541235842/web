<template>
  <div class="container">
    <div class="header">
      <div class="header-item">
        <span class="title">查询条件</span>
        <div class="btn">
          <el-button type="primary" size="mini" @click="Search">查询</el-button>
          <el-button type="success" size="mini" @click="Export">导出</el-button>
        </div>
      </div>
      <el-form ref="form" :model="jsondata" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请时间">
              <date @getDate="getTime1" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="用户姓名">
              <el-input v-model="jsondata.userName" placeholder="用户姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="贷款编号">
              <el-input v-model="jsondata.loan_no" placeholder="贷款编号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="放款时间">
              <date @getDate="getTime2" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="手机号码">
              <el-input v-model="jsondata.mobile" placeholder="手机号码" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="审批状态">
              <el-select v-model="jsondata.examineStatus" placeholder="审批状态">
                <el-option
                  v-for="(item,index) in ApprovalStatusList"
                  :key="index"
                  :label="item.value"
                  :value="item.status"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="机审结果">
              <el-select v-model="jsondata.machineAuditStatus" placeholder="机审结果">
                <el-option
                  v-for="(item,index) in MachinelResultList"
                  :key="index"
                  :label="item.value"
                  :value="item.status"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="main">
      <span class="title">申请列表</span>
      <el-table
        v-loading="listLoading"
        :data="list"
        border
        class="list"
        header-row-class-name="table-header"
      >
        <el-table-column label="序号" type="index" width="50" />
        <el-table-column label="贷款编号">
          <template slot-scope="scope">
            <span class="loanNo" @click="jumpApprovalPage(scope.$index, scope.row)">{{ scope.row.loanNo }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="loanAmount" label="贷款金额" />
        <el-table-column prop="productName" label="产品名称" />
        <el-table-column prop="loanPeriod" label="期限" />
        <el-table-column prop="mobile" label="手机号码" />
        <el-table-column label="姓名">
          <template slot-scope="scope">
            <span v-if="scope.row.ocrUserName!==''">{{ scope.row.ocrUserName }}</span>
            <span v-else>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别">
          <template slot-scope="scope">
            <span v-if="scope.row.gender=='F'">女</span>
            <span v-else>男</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄" />
        <el-table-column prop="isRepeatLoan" label="是否复贷">
          <template slot-scope="scope">
            <span v-if="scope.row.isRepeatLoan==0">未跑机审</span>
            <span v-if="scope.row.isRepeatLoan==1">是</span>
            <span v-if="scope.row.isRepeatLoan==2">不是</span>
          </template>
        </el-table-column>
        <el-table-column label="机审结果">
          <template slot-scope="scope">
            <span v-if="scope.row.machineAuditStatus==0">未机审</span>
            <span v-if="scope.row.machineAuditStatus==1">通过</span>
            <span v-if="scope.row.machineAuditStatus==2">不通过</span>
          </template>
        </el-table-column>
        <el-table-column label="审批状态">
          <template slot-scope="scope">
            <span v-if="scope.row.examineStatus==0">待分配</span>
            <span v-if="scope.row.examineStatus==1">待初审</span>
            <span v-if="scope.row.examineStatus==2">初审通过</span>
            <span v-if="scope.row.examineStatus==3">初审拒绝</span>
            <span v-if="scope.row.examineStatus==4">待复审</span>
            <span v-if="scope.row.examineStatus==5">复审通过</span>
            <span v-if="scope.row.examineStatus==6">复审拒绝</span>
          </template>
        </el-table-column>
        <el-table-column prop="result" label="拒绝原因" />
        <el-table-column prop="remarks" label="拒绝详情" />
        <el-table-column prop="machineAuditTime" label="机审时间" />
        <el-table-column prop="addTime" label="申请时间" />
        <el-table-column prop="arrivalTime" label="放款时间" />
      </el-table>
      <pagination
        v-show="totalSize>0"
        :total="totalSize"
        :page.sync="jsondata.page"
        :limit.sync="jsondata.pageSize"
        @pagination="getList"
      />
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import Date from '@/components/Date'
import {
  allApplications,
  getExamineStatus,
  getMachinelResult
} from '@/api/letter'
export default {
  components: { Pagination, Date },
  data() {
    return {
      list: [],
      totalSize: 0,
      listLoading: true,
      jsondata: {
        minAddtime: '', // 申请时间 开始
        maxAddtime: '', // 申请时间 结束
        minArrivalTime: '', // 放款时间 开始
        maxAarrivalTime: '', // 放款时间 结束
        userName: '', // 用户昵称
        mobile: '', // 手机号码
        loanNo: '', // 贷款编号
        machineAuditStatus: null, // 机审结果
        examineStatus: '', // 审批状态
        page: 1, // 当前页
        pageSize: 10 // 每页20条数据
      },
      ApprovalStatusList: [], // 审批状态
      MachinelResultList: [] // 机审结果
    }
  },
  mounted() {
    this.getList()
    this.getExamineStatus()//
    this.getMachinelResult()
  },
  methods: {
    // 获取列表
    getList() {
      const that = this
      that.listLoading = true
      allApplications(that.jsondata)
        .then(r => {
          const res = r.data
          that.totalSize = res.totalSize
          that.list = res.list
          that.listLoading = false
        })
        .catch(r => {})
    },
    Search() {
      this.jsondata.page = 1
      this.pageSize = 10
      this.getList()// 获取信审订单
    },
    Export() {},
    // 申请时间
    getTime1(date) {
      console.log(date)
      this.jsondata.minAddtime = date[0]
      this.jsondata.maxAddtime = date[1]
    },
    // 放款时间
    getTime2(date) {
      this.jsondata.minArrival_time = date[0]
      this.jsondata.maxAarrival_time = date[1]
    },
    // 获取审批状态
    getExamineStatus() {
      getExamineStatus({ type: 'admin' })
        .then(r => {
          this.ApprovalStatusList = r.data
        })
        .catch(r => {})
    },
    // 获取机审结果
    getMachinelResult() {
      getMachinelResult()
        .then(r => {
          this.MachinelResultList = r.data
        })
        .catch(r => {})
    },
    // 审批页
    jumpApprovalPage(index) {
      // 跳转审批页
      this.$router.push({ name: 'ApprovalPage', query: { id: this.list[index].userId, type: 'my' }})
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
      .loanNo {
        color: #1890ff;
        cursor: pointer;
      }
    }
  }
}
</style>
