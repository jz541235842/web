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
      <el-form ref="form" :model="form" label-width="90px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="应还款时间">
              <date @getDate="getTime1" />
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="2">
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
          <el-col :span="4">
            <el-form-item label="催收阶段">
              <el-select v-model="form.value3" placeholder="催收阶段">
                <el-option
                  v-for="item in options3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="催收员">
              <el-select v-model="form.value1" placeholder="催收员">
                <el-option
                  v-for="item in options1"
                  :key="item.value1"
                  :label="item.label"
                  :value="item.value1"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="用户姓名">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号码">
              <el-input v-model="form.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="贷款编号">
              <el-input v-model="form.number" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="分配状态">
              <el-select v-model="form.value4" placeholder="分配状态">
                <el-option
                  v-for="item in options4"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="main">
      <el-button size="mini" class="batch" @click="bach">批量分配</el-button>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        class="list"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" />
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
        <el-table-column label="分配状态">
          <template slot-scope="scope">
            <span v-if="scope.row.isAllocate==1">未分配</span>
            <span v-if="scope.row.isAllocate==0">已分配</span>
          </template>
        </el-table-column>
        <el-table-column prop="loanRepayTime" label="应还款时间" />
        <el-table-column prop="loanRepayAmount" label="应还总金额" />
        <el-table-column prop="loanRepayRealAmount" label="已还金额" />
        <el-table-column prop="overdueDays" label="逾期天数" />
        <el-table-column prop="customerName" label="催收员" />
        <el-table-column prop="name" label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" :disabled="scope.row.isAllocate == 0" @click="batch(scope.$index, scope.row)">分配</el-button>
            <el-button size="mini" type="danger" @click="find(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="form.totalSize"
        :page.sync="jsondata.page"
        :limit.sync="jsondata.pageSize"
        @pagination="getList"
      />
      <!-- 提示框 -->
      <el-dialog title="分配" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form>
          <el-form-item label="请选择催收员">
            <el-select v-model="form.value1" placeholder="催收员">
              <el-option
                v-for="item in options1"
                :key="item.value1"
                :label="item.label"
                :value="item.value1"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="determine">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  queryCustomerList,
  queryAllLoans,
  AllocateRequest
} from '@/api/collection'
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
        number: '',
        region: '',
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        input: 1,
        totalSize: 0,
        page: 1, // 当前页
        pageSize: 20 // 每页20条数据
      },
      tableData: [],
      multipleSelection: [],
      cateRequest: {
        // 分配案件接口数据
        poolIdList: [],
        customerId: ''
      },
      currentPage3: 1,
      radio: '1',
      dialogVisible: false,
      options2: [
        // 催收状态
        {
          value: '0',
          label: '待提醒'
        },
        {
          value: '1',
          label: '提醒成功'
        },
        {
          value: '2',
          label: '提醒失败'
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
      ],
      options4: [
        {
          value: '0',
          label: '已分配'
        },
        {
          value: '1',
          label: '待分配'
        }
      ],
      options1: [],
      jsondata: {
        beginLoanRepayTime: null, // 预计还款时间 begin
        endLoanRepayTime: null, // 预计还款时间 end
        status: null, // 催收状态
        stageStatus: null, // 催收阶段
        userName: null, // 用户姓名
        userMobile: null, // 用户手机号
        referLoanNo: null, // 平台借款编号
        isAllocate: 0, // 是否以分配
        customerName: null, // 催收员姓名
        page: 1,
        pageSize: 10
      }
    }
  },
  created() {
    queryCustomerList().then(r => {
      // 插入所有催收员列表
      for (let i = 0; i < r.data.length; i++) {
        const str = {
          value1: r.data[i].id,
          label: r.data[i].name
        }
        this.options1.push(str)
      }
    }),
    queryAllLoans(this.jsondata).then(r => {
      // 查询所有未催收列表
      this.tableData = r.data.list
      this.form.totalSize = r.data.totalSize
      console.log(r)
    })
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    find(index, row) {
      // 此处需要把用户id发过去
      this.jsondata.referLoanNo = row.referLoanNo
      queryAllLoans(this.jsondata).then(r => {
        const cons = row.id
        this.$router.push({ path: `myCas/${cons}` })
      })
    },
    batch(index, row) {
      this.dialogVisible = true
      this.cateRequest.poolIdList.push(row.id)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    determine() {
      this.dialogVisible = false
      this.cateRequest.customerId = this.form.value1
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.cateRequest.poolIdList.push(this.multipleSelection[i].id)
      }
      console.log(this.cateRequest)
      AllocateRequest(this.cateRequest).then(r => {
        if (r.success) {
          alert('分配成功')
          queryAllLoans(this.jsondata).then(r => {
            this.tableData = r.data.list
            this.form.totalSize = r.data.totalSize
            this.cateRequest.poolIdList = []
          })
        } else {
          alert('分配失败')
        }
      })
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
      // 判断是否已分配
      if (this.form.value4 == '') {
        this.jsondata.isAllocate = null
      } else {
        this.jsondata.isAllocate = this.form.value4
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
      this.jsondata.isAllocate = this.form.value4
      queryAllLoans(this.jsondata).then(r => {
        this.tableData = r.data.list
        this.form.totalSize = r.data.totalSize
      })
    },
    getTime1(date) {
      this.form.date1 = date[0]
      this.form.date2 = date[1]
    },
    bach() {
      this.dialogVisible = true
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
    background: #fff;
    padding: 20px;
    .batch {
      margin-top: 15px;
    }
    .list {
      margin-top: 20px;
    }
    .paging {
      margin-top: 15px;
    }
  }
}
.fpInput {
  width: 50px;
}
</style>
