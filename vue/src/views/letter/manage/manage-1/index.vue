<template>
  <div class="container">
    <div class="header">
      <div class="header-item">
        <span class="title">查询条件</span>
        <div class="btn">
          <el-button type="primary" size="mini" @click="Search">查询</el-button>
          <el-button type="success" size="mini">导出</el-button>
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
          <el-col :span="4">
            <el-form-item label="信审人员">
              <el-select v-model="jsondata.examineFirstId	" placeholder="信审人员">
                <el-option
                  v-for="(item,index) in ExaminePeople"
                  :key="index"
                  :label="item.value"
                  :value="item.status"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="手机号码">
              <el-input v-model="jsondata.mobile" placeholder="手机号码" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="用户姓名">
              <el-input v-model="jsondata.userName" placeholder="用户姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="分配状态">
              <el-select v-model="jsondata.isExamineFirstIssue" placeholder="分配状态">
                <el-option v-for="(item,index) in issueList" :key="index" :label="item.value" :value="item.status" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="审批状态">
              <el-select v-model="jsondata.examineStatus" placeholder="审批状态">
                <el-option
                  v-for="(item,index) in approvalList"
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
      <el-button size="mini" class="batch" type="primary" @click="batch(-1)">批量分配</el-button>
      <el-table
        ref="multipleTable"
        v-loading="listLoading"
        :data="list"
        tooltip-effect="dark"
        style="width: 100%"
        class="list"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" />
        <el-table-column label="序号" type="index" width="50" />
        <el-table-column label="贷款编号">
          <template slot-scope="scope">
            <span
              class="loanNo"
              @click="jumpApprovalPage(scope.$index, scope.row)"
            >{{ scope.row.loanNo }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="isRepeatLoan" label="是否复贷">
          <template slot-scope="scope">
            <span v-if="scope.row.isRepeatLoan==0">未跑机审</span>
            <span v-if="scope.row.isRepeatLoan==1">是</span>
            <span v-if="scope.row.isRepeatLoan==2">不是</span>
          </template>
        </el-table-column>
        <el-table-column prop="loanAmount" label="贷款金额" />
        <el-table-column prop="productName" label="产品名称" />
        <el-table-column prop="name" label="期限" />
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
        <el-table-column prop="name" label="分配状态" />
        <el-table-column prop="name" label="审批员" />
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
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="batch(scope.$index, scope.row)">分配</el-button>
            <el-button size="mini" type="danger" @click="find(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="totalSize>0"
        :total="totalSize"
        :page.sync="jsondata.page"
        :limit.sync="jsondata.pageSize"
        @pagination="getList"
      />
      <!-- 提示框 -->
      <el-dialog title="批量分配" :visible.sync="dialogVisible" width="30%" :before-close="Close">
        <el-form>
          <el-form-item label="信审人员">
            <el-select v-model="json.adminId" placeholder="信审人员">
              <el-option
                v-for="(item,index) in ExaminePeople"
                :key="index"
                :label="item.value"
                :value="item.status"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sure">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import Date from '@/components/Date'
import {
  allApplications,
  distribution,
  getExamineAdmin,
  getExamineStatus,
  getIssue
} from '@/api/letter'
export default {
  components: { Pagination, Date },
  data() {
    return {
      multipleSelection: [],
      dialogVisible: false,
      list: [],
      totalSize: 0,
      listLoading: true,
      jsondata: {
        minAddTime: '', // 申请时间 开始
        maxAddTime: '', // 申请时间 结束
        userName: '', // 用户昵称
        mobile: '', // 手机号码
        loanNo: '', // 贷款编号
        machineAuditStatus: null, // 机审结果
        examineStatus: '0', // 审批状态
        isExamineFirstIssue: null,
        examineFirstId: null,
        page: 1, // 当前页
        pageSize: 10, // 每页20条数据
        type: 'FIRST'
      },
      ids: [], // 人员批量的id
      json: {
        ids: '',
        type: 'FIRST',
        adminId: ''
      },
      ExaminePeople: [], // 信审人员列表
      approvalList: [], // 初审
      issueList: []// 分配状态
    }
  },
  mounted() {
    this.getList()
    this.getExamineAdmin()// 获取信审人员 初审
    this.getExamineStatus()// 获取审批状态 初审
    this.getIssue()// 获取  分配状态
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    Search() {
      this.jsondata.page = 1
      this.jsondata.pageSize = 10
      this.getList()
    },
    // 查看
    find(index) {
      // 跳转审批页
      this.$router.push({
        name: 'ApprovalPage',
        query: { id: this.list[index].userId }
      })
    },
    // 批量
    batch(index) {
      this.ids = []
      if (index == -1) {
        // 批量
        for (let i = 0; i < this.multipleSelection.length; i++) {
          this.ids.push(this.multipleSelection[i].id)
        }
        this.json.ids = this.ids.join(',')
      } else {
        // 单个
        this.json.ids = this.list[index].id
      }
      this.dialogVisible = true
    },
    Close(done) {
      done()
    },
    // 申请时间
    getTime1(date) {
      this.jsondata.minAddtime = date[0]
      this.jsondata.maxAddtime = date[1]
    },
    getList() {
      const that = this
      that.listLoading = false
      allApplications(this.jsondata)
        .then(r => {
          const res = r.data
          that.totalSize = res.totalSize
          that.list = res.list
          that.listLoading = false
        })
        .catch(r => {})
    },
    // 审批页
    jumpApprovalPage(index) {
      // 跳转审批页
      this.$router.push({
        name: 'ApprovalPage',
        query: { id: this.list[index].userId }
      })
    },
    // 确认分配
    sure() {
      distribution(this.json).then(r => {
        this.dialogVisible = false
        this.$message({ type: 'success', message: r.data })
        this.getList() // list重新渲染
      })
    },
    // 获取信审人员
    getExamineAdmin() {
      getExamineAdmin({ type: 'trial' })
        .then(r => {
          this.ExaminePeople = r.data.examineStatuses
        })
        .catch(r => {})
    },
    // 获取审批状态 初审
    getExamineStatus() {
      getExamineStatus({ type: 'FIRST' }).then(r => {
        this.approvalList = r.data
      })
    },
    // 获取  分配状态
    getIssue() {
      getIssue().then((r) => {
        this.issueList = r.data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  background: #f2f2f2;
  padding: 20px;
  .header-item {
    height: 50px;
  }
  .header {
    padding: 20px;
    background: #fff;
    margin-bottom: 10px;
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
    padding: 20px;
    background: #fff;
    .batch {
      margin-top: 15px;
    }
    .list {
      margin-top: 20px;
      .loanNo {
        color: #1890ff;
        cursor: pointer;
      }
    }
    .paging {
      margin-top: 15px;
    }
  }
}
</style>
