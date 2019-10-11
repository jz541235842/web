<template>
  <div class="container">
    <div class="header">
      <div class="header-item">
        <div class="btn">
          <el-button type="primary" size="mini" @click="approval(1)">电核记录</el-button>
          <el-button v-if="details.isEdit==1" type="success" size="mini" @click="approval(2)">审批</el-button>
          <el-button type="success" size="mini" @click="jumpRecord()">审批记录</el-button>
        </div>
      </div>
      <span class="title">个人信息</span>
      <el-row class="information">
        <el-col :span="3">用户ID</el-col>
        <el-col :span="5">{{ personalData.id }}</el-col>
        <el-col :span="3">注册时间</el-col>
        <el-col :span="5">{{ personalData.authValidTime }}</el-col>
        <el-col :span="3">渠道来源</el-col>
        <el-col :span="5">{{ personalData.agentName }}</el-col>
      </el-row>
      <el-row class="information">
        <el-col :span="3">姓名</el-col>
        <el-col :span="5">{{ personalData.userName }}</el-col>
        <el-col :span="3">性别</el-col>
        <el-col :span="5">
          <span v-if="personalData.gender=='F'">女</span>
          <span v-if="personalData.gender=='M'">男</span>
        </el-col>
        <el-col :span="3">手机号码</el-col>
        <el-col :span="5">{{ personalData.mobile }}</el-col>
      </el-row>
      <el-row class="information">
        <el-col :span="3">证件类型</el-col>
        <el-col :span="5">身份证</el-col>
        <el-col :span="3">身份证号码</el-col>
        <el-col :span="5">{{ personalData.idNumber }}</el-col>
        <el-col :span="3">身份证归属地</el-col>
        <el-col :span="5">{{ personalData.ocrAddress }}</el-col>
      </el-row>
      <el-row class="information">
        <el-col :span="3">年龄</el-col>
        <el-col :span="5">{{ personalData.age }}</el-col>
        <el-col :span="3">婚姻状态</el-col>
        <el-col :span="5">{{ personalData.ocrMaritalStatus }}</el-col>
        <el-col :span="3">居住地址</el-col>
        <el-col :span="5">{{ personalData.address }}</el-col>
      </el-row>
      <el-row class="information">
        <el-col :span="3">教育程度</el-col>
        <el-col :span="5">{{ personalData.education }}</el-col>
        <el-col :span="3">血型</el-col>
        <el-col :span="5">{{ personalData.ocrBloodType }}</el-col>
        <el-col :span="3">税前月收入</el-col>
        <el-col :span="5">{{ personalData.income }}</el-col>
      </el-row>
      <el-row class="information last">
        <el-col :span="3">宗教信仰</el-col>
        <el-col :span="5">{{ personalData.ocrReligion }}</el-col>
      </el-row>
    </div>
    <div class="main header">
      <span class="title">认证信息</span>
      <el-table v-loading="listLoading" :data="details.auth" style="width: 100%" border>
        <el-table-column prop="auth_type" label="类型" />
        <el-table-column prop="status" label="认证状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==0">未认证</span>
            <span v-if="scope.row.status==1">认证中</span>
            <span v-if="scope.row.status==2">已认证</span>
            <span v-if="scope.row.status==3">认证失败</span>
          </template>
        </el-table-column>
        <el-table-column prop="update_time" label="最近一次更新时间" />
      </el-table>
    </div>
    <div class="main header">
      <span class="title">联系人信息</span>
      <el-table v-loading="listLoading" :data="details.contactsUrgents" style="width: 100%" border>
        <el-table-column prop="relation" label="与借款人的关系" />
        <el-table-column prop="relationName" label="姓名" />
        <el-table-column prop="relationMobile" label="手机" />
        <el-table-column prop="updataTime" label="最近一次更新时间" />
      </el-table>
    </div>
    <div class="main header">
      <span class="title">工作信息</span>
      <el-row class="information">
        <el-col :span="3">职业</el-col>
        <el-col :span="5">{{ work.job }}</el-col>
        <el-col :span="3">公司名称</el-col>
        <el-col :span="5">{{ work.work_name }}</el-col>
        <el-col :span="3">公司地址</el-col>
        <el-col :span="5">{{ work.work_address }}</el-col>
      </el-row>
      <el-row class="information last">
        <el-col :span="3">固定电话</el-col>
        <el-col :span="5">{{ work.work_telephone }}</el-col>
        <el-col :span="3">工作邮箱</el-col>
        <el-col :span="5">{{ work.work_email }}</el-col>
        <el-col :span="3">工作证</el-col>
        <el-col :span="5">
          <el-image style="width: 30px; height: 30px" :src="url" :preview-src-list="srcList" />
        </el-col>
      </el-row>
    </div>
    <div class="main header">
      <span class="title">银行卡信息</span>
      <el-table v-loading="listLoading" :data="details.bankCard" style="width: 100%" border>
        <el-table-column prop="card_number" label="银行卡号" />
        <el-table-column prop="bank_name" label="银行名称" />
        <el-table-column prop="isMain" label="卡归属地" />
        <el-table-column prop="bank_mobile" label="预留手机" />
        <el-table-column prop="update_time" label="更新时间" />
      </el-table>
    </div>
    <div class="main header">
      <span class="title">风险信息</span>
      <el-table v-loading="listLoading" :data="details.riskInformation" style="width: 100%" border>
        <el-table-column prop="mobileNum" label="通讯录号码总数" />
        <el-table-column prop="settleLoan" label="最新一笔订单是否结清" />
        <el-table-column prop="settleTime" label="结清订单最后一次借款距今时长" />
        <el-table-column prop="maxOverdueDays" label="最大逾期天数" />
        <el-table-column prop="loanNumMoney" label="累计借款金额" />
        <el-table-column prop="overdueNum" label="逾期订单总数" />
        <el-table-column prop="riskRefuseNum" label="累计被风控拒绝次数" />
        <el-table-column prop="riskInSensitiveTimeNum" label="敏感时间请求风控次数" />
        <el-table-column prop="sensitiveControlScale" label="敏感时间请求风控次数占比" />
      </el-table>
    </div>
    <div class="main header">
      <span class="title">放款信息</span>
      <el-table v-loading="listLoading" :data="details.beingLoan" style="width: 100%" border>
        <el-table-column type="index" width="50" label="序号" />
        <el-table-column prop="loanNo" label="贷款编号" />
        <el-table-column prop="addTime" label="贷款时间" />
        <el-table-column prop="loan_period" label="贷款期限" />
        <el-table-column prop="interestRate" label="贷款利率" />
        <el-table-column prop="loanAmount" label="贷款金额" />
        <el-table-column prop="loanUse" label="贷款用途" />
        <el-table-column prop="repayLoanAmount" label="实际放款金额" />
        <el-table-column prop="planRepayTime" label="还款时间" />
      </el-table>
    </div>
    <div class="main header">
      <span class="title">还款信息</span>
      <el-table v-loading="listLoading" :data="details.historyLoan" style="width: 100%" border>
        <el-table-column type="index" width="50" label="序号" />
        <el-table-column prop="loanNo" label="贷款编号" />
        <el-table-column prop="loanAmount" label="贷款金额" />
        <el-table-column prop="productName" label="产品名称" />
        <el-table-column prop="loanPeriod" label="期限" />
        <el-table-column prop="planRepayTime" label="应还款时间" />
        <el-table-column prop="residueTotal_amount" label="应还款金额" />
        <el-table-column prop="repayLoanAmountIn" label="已还款金额" />
        <el-table-column prop="payWay" label="支付渠道" />
        <el-table-column prop="payType" label="还款方式" />
        <el-table-column prop="payTime" label="还款时间" />
      </el-table>
    </div>
    <!-- 模态框弹出框 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form v-if="flag==1" :model="jsondata" label-width="120px">
        <el-form-item label="电核人">
          <el-select v-model="jsondata.relationName" placeholder="电核人" @change="peopleChoice">
            <el-option
              v-for="(item,index) in people"
              :key="index"
              :label="item.relationName"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="电核结果">
          <el-select v-model="jsondata.status" placeholder="电核结果">
            <el-option
              v-for="(item,index) in phone"
              :key="index"
              :label="item.value"
              :value="item.status"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="jsondata.remark" type="textarea" placeholder="备注" />
        </el-form-item>
      </el-form>
      <el-form v-else ref="form" :model="json" label-width="120px">
        <el-form-item label="审批状态">
          <el-select v-model="json.status" placeholder="审批状态">
            <el-option
              v-for="(item,index) in shenPiList"
              :key="index"
              :label="item.value"
              :value="item.status"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="拒绝原因一">
          <el-select v-model="result3" placeholder="拒绝原因一" @change="choiceRefuse">
            <el-option
              v-for="(item,index) in refuseList"
              :key="index"
              :label="item.value"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="拒绝原因二">
          <el-select v-model="result2" placeholder="拒绝原因二" @change="choiceRefuseTwo">
            <el-option v-for="(item,index) in twoRefusal" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="json.remark" type="textarea" placeholder="备注" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  approvalDetails,
  addPhoneRecord,
  getPhoneResult,
  getReasonsForRefusal,
  getExamineStatus,
  goApproval
} from '@/api/letter'
export default {
  data() {
    return {
      url:
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ],
      dialogVisible: false,
      listLoading: true,
      formInline: {
        user: '',
        region: '',
        desc: ''
      },
      userId: '', // 订单id
      details: {},
      personalData: {}, // 个人信息
      work: {}, // 职业
      jsondata: {
        loanId: '',
        userId: '',
        status: null,
        remark: '',
        relation: '',
        relationName: '',
        relationMobile: ''
      },
      json: {
        loanId: '', // 订单id
        userId: '', // 用户id
        result: '', // 两个原因
        remark: '', // 备注
        status: '' // 状态
      },
      result1: '', // 原因1
      result2: '', // 原因2
      result3: '', // 原因3  傀儡
      people: [], // 电核人
      phone: [], // 电荷结果
      refuseList: [], // 拒绝的list
      twoRefusal: [], // 二级拒绝
      shenPiList: [], // 审批状态
      title: '',
      flag: null // 1是电核记录  2审批
    }
  },
  mounted() {
    this.userId = this.$route.query.id
    this.getDetails() // 获取详情
    this.getPhoneResult() // 电审记录
    this.getReasonsForRefusal() // 获取拒绝原因
  },
  methods: {
    // 审批
    approval(index) {
      this.dialogVisible = true
      this.flag = index
      if (index == 1) {
        this.title = '电核记录'
      } else {
        this.title = '审批'
      }
    },
    handleClose(done) {
      done()
    },
    // 获取详细信息
    getDetails() {
      this.listLoading = true
      approvalDetails({ userId: this.userId })
        .then(r => {
          const res = r.data
          this.details = res
          this.personalData = res.personalData
          this.work = res.work
          // 电核人
          this.people = res.contactsUrgents
          this.listLoading = false
          this.getExamineStatus({ type: 'edit', loanId: res.beingLoan[0].id }) // 获取审批状态
        })
        .catch(r => {})
    },
    // 跳转审批记录
    jumpRecord() {
      this.$router.push({ name: 'ApprovalRecord', query: { id: this.userId }})
    },
    // 筛选 电核人
    peopleChoice(obj) {
      this.jsondata.relation = obj.relation
      this.jsondata.relationMobile = obj.relationMobile
    },
    add() {
      // flag 1是电核记录  2审批
      switch (this.flag) {
        case 1:
          this.addPhoneRecord()
          break
        case 2:
          this.goApproval()
          break
        default:
          break
      }
    },
    // 添加电核记录
    addPhoneRecord() {
      this.jsondata.loanId = this.details.beingLoan[0].id
      this.jsondata.userId = this.userId
      addPhoneRecord(this.jsondata)
        .then(r => {
          this.dialogVisible = false
          this.$message({ type: 'success', message: r.data })
        })
        .catch(r => {})
    },
    // 审批
    goApproval() {
      this.json.loanId = this.details.beingLoan[0].id
      this.json.userId = this.userId
      this.json.result = this.result1 + '-' + this.result2
      goApproval(this.json).then(r => {
        this.$message({ type: 'success', message: r.data })
        this.dialogVisible = false
      })
    },
    // 预先获取电审结果
    getPhoneResult() {
      getPhoneResult().then(r => {
        this.phone = r.data
      })
    },
    // 获取拒绝原因
    getReasonsForRefusal() {
      getReasonsForRefusal().then(r => {
        this.refuseList = r.data
      })
    },
    // 监听拒绝原因 一级
    choiceRefuse(obj) {
      this.twoRefusal = obj.strings
      this.result1 = obj.value
    },
    // 监听拒绝原因 二级
    choiceRefuseTwo() {},
    getExamineStatus(data) {
      getExamineStatus(data).then(r => {
        this.shenPiList = r.data
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
      height: 35px;
    }
    .title {
      font-size: 16px;
      display: block;
      margin-bottom: 10px;
    }
    .btn {
      float: right;
    }
    .information {
      border: 1px solid #e4e4e4;
      border-bottom: none;
      color: #333;
      height: 35px;
      line-height: 35px;
      text-align: center;
      overflow: hidden;
      &:hover {
        background: #f5f7fa;
      }
      .el-col-3 {
        background: #ebeef5;
        font-size: 14px;
      }
      .el-col-5 {
        font-size: 13px;
        min-height: 35px;
      }
    }
    .last {
      border-bottom: 1px solid #e4e4e4;
    }
  }
  // 主体
  .main {
    background: #fff;
    padding: 20px;
  }
}
</style>
