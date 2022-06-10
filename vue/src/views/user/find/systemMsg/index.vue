<template>
  <div class="container">
    <div class="header">
      <div class="header-item">
        <span class="title">查询条件</span>
        <div class="btn">
          <el-button v-show="form.show" type="primary" size="mini" @click="query">查询</el-button>
          <el-button v-show="!form.show" type="success" size="mini" @click="query">查询</el-button>
        </div>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="用户ID">
              <el-input v-model="form.userId" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号码">
              <el-input v-model="form.phone" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="main">
      <el-row>
        <el-col>
          <el-radio v-model="radio" label="1" @change="open">短信消息</el-radio>
          <el-radio v-model="radio" label="2" @change="open1">系统消息</el-radio>
        </el-col>
      </el-row>
      <div v-show="form.show">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          class="list"
          border
        >
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column prop="templateCode" label="标题" />
          <el-table-column prop="content" label="内容" />
          <el-table-column label="发送结果">
            <template slot-scope="scope">
              <span v-if="scope.row.sendStatus==0">未推送</span>
              <span v-if="scope.row.sendStatus==1">推送成功</span>
              <span v-if="scope.row.sendStatus==2">推送失败</span>
            </template>
          </el-table-column>
          <el-table-column prop="sendTime" label="发送时间" />
        </el-table>
      </div>

      <div v-show="!form.show">
        <el-table
          ref="multipleTable"
          :data="tableData1"
          tooltip-effect="dark"
          style="width: 100%"
          class="list"
          border
        >
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column prop="title" label="标题" />
          <el-table-column prop="content" label="内容" />
          <el-table-column label="发送结果">
            <template slot-scope="scope">
              <span v-if="scope.row.sendStatus==0">未推送</span>
              <span v-if="scope.row.sendStatus==1">推送成功</span>
              <span v-if="scope.row.sendStatus==2">推送失败</span>
            </template>
          </el-table-column>
          <el-table-column prop="addTime" label="发送时间" />
        </el-table>
      </div>
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
import { queryDetailedMessage, queryUserSms } from '@/api/user'
export default {
  data() {
    return {
      form: {
        date1: '',
        date2: '',
        name: '',
        region: '',
        userId: '',
        phone: '',
        show: true
      },
      tableData: [],
      tableData1: [],
      jsondata: {},
      jsondata1: {},
      currentPage3: 1,
      multipleSelection: [],
      radio: '1',
      dialogVisible: false
    }
  },
  created() {
    queryDetailedMessage(this.jsondata).then(r => {
      this.tableData1 = r.data.list
    })
    queryUserSms(this.jsondata1).then(r => {
      this.tableData = r.data.list
    })
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    find() {},
    // 批量
    batch() {
      this.dialogVisible = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    open() {
      this.form.show = true
    },
    open1() {
      this.form.show = false
    },
    query() {
      this.jsondata.userId = this.form.userId
      this.jsondata.mobile = this.form.phone
      if (this.form.userId == '') {
        this.jsondata.userId = null
      }
      if (this.form.phone == '') {
        this.jsondata.mobile = null
      }
      queryDetailedMessage(this.jsondata).then(r => {
        this.tableData1 = r.data.list
      })
    },
    query1() {
      this.jsondata1.userId = this.form.userId
      this.jsondata1.mobile = this.form.phone
      if (this.form.userId == '') {
        this.jsondata1.userId = null
      }
      if (this.form.phone == '') {
        this.jsondata1.mobile = null
      }
      queryDetailedMessage(this.jsondata).then(r => {
        this.tableData = r.data.list
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
    .list {
      margin-top: 20px;
    }
    .paging {
      margin-top: 15px;
    }
  }
}
</style>
