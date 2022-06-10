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
            <el-form-item label="贷款编号">
              <el-input v-model="jsondata.loan_no" placeholder="贷款编号" />
            </el-form-item>
          </el-col>
          <el-col v-if="admin!==1" :span="4">
            <el-form-item label="信审人员">
              <el-select v-model="nausea" placeholder="信审人员" filterable @change="judgePeople">
                <el-option
                  v-for="(item,index) in ExaminePeople"
                  :key="item.value"
                  :label="item.value"
                  :value="item"
                  :value-key="index"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="手机号码">
              <el-input v-model="jsondata.loan_no" placeholder="手机号码" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="用户姓名">
              <el-input v-model="jsondata.mobile" placeholder="用户姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="审批状态">
              <el-select v-model="jsondata.examineStatus" placeholder="审批状态">
                <el-option
                  v-for="(item,index) in fuShenList"
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
            <span
              class="loanNo"
              @click="jumpApprovalPage(scope.$index, scope.row)"
            >{{ scope.row.loanNo }}</span>
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
            <span v-if="scope.row.machineAuditStatus==0">未跑机审</span>
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
  getExamineAdmin
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
        type: '',
        examineStatus: '', // 审批状态
        examineFirstId: '', // type "FIRST"
        examineRepeatId: '', // type "REPEAT"
        page: 1, // 当前页
        pageSize: 10 // 每页20条数据
      },
      nausea: {}, // 傀儡   人社
      ExaminePeople: [], // 信审人员列表
      fuShenList: [], // 信审人员  状态
      admin: null // 获取权限
    }
  },
  mounted() {
    this.getList()
    this.getExamineStatus() // 获取信审状态
    this.getExamineAdmin() // 信审人员
  },
  methods: {
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
      this.jsondata.pageSize = 10
      this.getList()
    },
    Export() {},
    // 申请时间
    getTime1(date) {
      this.jsondata.minAddtime = date[0]
      this.jsondata.maxAddtime = date[1]
    }, // 审批页
    jumpApprovalPage(index) {
      // 跳转审批页
      this.$router.push({
        name: 'ApprovalPage',
        query: { id: this.list[index].userId }
      })
    },
    // 获取审批状态
    getExamineStatus() {
      getExamineStatus({ type: 'admin' }).then(r => {
        this.fuShenList = r.data
      })
    },
    // 获取信审人员
    getExamineAdmin() {
      getExamineAdmin({ type: 'admin' }).then(r => {
        const res = r.data
        this.admin = res.admin
        this.ExaminePeople = res.examineStatuses
      })
    },
    // 信审人员  类型  "FIRST" "REPEAT"
    judgePeople(obj) {
      if (obj.type == 'FIRST') {
        // 初审人员
        this.jsondata.examineFirstId = obj.status // type "FIRST"
        this.jsondata.type = obj.type
        this.jsondata.examineRepeatId = '' // type "REPEAT"
      } else if (obj.type == 'REPEAT') {
        // 复审人员
        this.jsondata.examineFirstId = '' // type "FIRST"
        this.jsondata.type = obj.type
        this.jsondata.examineRepeatId = obj.status // type "REPEAT"
      } else {
        // 管理员
      }
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
