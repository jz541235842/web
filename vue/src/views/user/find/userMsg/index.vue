<template>
  <div class="container">
    <div class="header">
      <div class="header-item">
        <div class="btn">
          <el-button type="primary" size="mini" @click="phoneConnect">记录</el-button>
        </div>
      </div>
      <span class="title">个人信息</span>
      <el-row class="information">
        <el-col :span="3">用户ID</el-col>
        <el-col :span="5">{{ userInfo.userId }}</el-col>
        <el-col :span="3">注册时间</el-col>
        <el-col :span="5">{{ userInfo.registerDate }}</el-col>
        <el-col :span="3">渠道来源</el-col>
        <el-col :span="5">{{ userInfo.channel }}</el-col>
      </el-row>
      <el-row class="information">
        <el-col :span="3">姓名</el-col>
        <el-col :span="5">{{ userInfo.name }}</el-col>
        <el-col :span="3">性别</el-col>
        <el-col :span="5">{{ userInfo.registerDate }}</el-col>
        <el-col :span="3">手机号码</el-col>
        <el-col :span="5">{{ userInfo.mobile }}</el-col>
      </el-row>
      <el-row class="information">
        <el-col :span="3">证件类型</el-col>
        <el-col :span="5">{{ userInfo.registerDate }}</el-col>
        <el-col :span="3">身份证号码</el-col>
        <el-col :span="5">{{ userInfo.idNumber }}</el-col>
        <el-col :span="3">身份证归属地</el-col>
        <el-col :span="5">{{ userInfo.registerDate }}</el-col>
      </el-row>
      <el-row class="information">
        <el-col :span="3">年龄</el-col>
        <el-col :span="5">{{ userInfo.age }}</el-col>
        <el-col :span="3">婚姻状态</el-col>
        <el-col :span="5">{{ userInfo.married }}</el-col>
        <el-col :span="3">子女情况</el-col>
        <el-col :span="5">{{ userInfo.childCount }}</el-col>
      </el-row>
      <el-row class="information">
        <el-col :span="3">居住地址</el-col>
        <el-col :span="5">{{ userInfo.liveAddress }}</el-col>
        <el-col :span="3">教育程度</el-col>
        <el-col :span="5">{{ userInfo.education }}</el-col>
        <el-col :span="3">血型</el-col>
        <el-col :span="5">{{ userInfo.bloodType }}</el-col>
      </el-row>
      <el-row class="information last">
        <el-col :span="3">税前月收入</el-col>
        <el-col :span="5">{{ userInfo.income }}</el-col>
        <el-col :span="3">宗教信仰</el-col>
        <el-col :span="5">{{ userInfo.registerDate }}</el-col>
      </el-row>
    </div>
    <div class="main header">
      <span class="title">认证信息</span>
      <el-table :data="UserAuth" style="width: 100%" border>
        <el-table-column prop="auth" label="类型" />
        <el-table-column prop="status" label="认证状态" />
        <el-table-column prop="updateDate" label="最近一次更新时间" />
      </el-table>
    </div>
    <div class="main header">
      <span class="title">联系人信息</span>
      <el-table :data="Relation" style="width: 100%" border>
        <el-table-column prop="relation" label="与借款人的关系" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="mobile" label="手机" />
        <el-table-column prop="updateTime" label="最近一次更新时间" />
      </el-table>
    </div>
    <div class="main header">
      <span class="title">工作信息</span>
      <el-row class="information">
        <el-col :span="3">职业</el-col>
        <el-col :span="5">{{ userInfo.job }}</el-col>
        <el-col :span="3">公司名称</el-col>
        <el-col :span="5">{{ userInfo.companyName }}</el-col>
        <el-col :span="3">公司地址</el-col>
        <el-col :span="5">{{ userInfo.companyAddress }}</el-col>
      </el-row>
      <el-row class="information last">
        <el-col :span="3">固定电话</el-col>
        <el-col :span="5">{{ userInfo.companyPhone }}</el-col>
        <el-col :span="3">工作邮箱</el-col>
        <el-col :span="5">{{ userInfo.companyEmail }}</el-col>
        <el-col :span="3">工作证</el-col>
        <el-col :span="5">
          <div class="demo-image__preview">
            <el-image
              style="width: 30px; height: 30px"
              :src="userInfo.companyCardPhotoUrl"
              :preview-src-list="srcList"
            />
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="main header">
      <span class="title">银行卡信息</span>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="bankNo" label="银行卡号" />
        <el-table-column prop="bankName" label="银行名称" />
        <el-table-column prop="bankAddress" label="卡归属地" />
        <el-table-column prop="mobile" label="预留手机" />
        <el-table-column prop="updateDate" label="更新时间" />
      </el-table>
    </div>
    <div class="main header">
      <span class="title">放款信息</span>
      <el-table :data="UserLoan" style="width: 100%" border>
        <el-table-column type="index" width="50" label="序号" />
        <el-table-column prop="loanNo" label="贷款编号" />
        <el-table-column prop="loanDate" label="贷款时间" />
        <el-table-column prop="loanPeriod" label="贷款期限" />
        <el-table-column prop="loanRate" label="贷款利率" />
        <el-table-column prop="loanAmount" label="贷款金额" />
        <el-table-column prop="address" label="实际放款金额" />
        <el-table-column prop="channel" label="放款渠道" />
        <el-table-column prop="createDate" label="创建时间" />
      </el-table>
    </div>
    <div class="main header">
      <span class="title">还款信息</span>
      <el-table :data="UserPayment" style="width: 100%" border>
        <el-table-column type="index" width="50" label="序号" />
        <el-table-column prop="paymentNo" label="贷款编号" />
        <el-table-column prop="loanAmount" label="贷款金额" />
        <el-table-column prop="productName" label="产品名称" />
        <el-table-column prop="loanPeriod" label="期限" />
        <el-table-column prop="repayDate" label="应还款时间" />
        <el-table-column prop="repayAmount" label="应还款金额" />
        <el-table-column prop="repayRealAmount" label="已还款金额" />
        <el-table-column prop="channel" label="支付渠道" />
        <el-table-column prop="payType" label="还款方式" />
        <el-table-column prop="createDate" label="创建时间" />
      </el-table>
    </div>
    <div class="main header">
      <span class="title">客服记录</span>
      <el-table :data="service" style="width: 100%" border>
        <el-table-column type="index" width="50" label="序号" />
        <el-table-column prop="name" label="用户号码" />
        <el-table-column prop="name" label="来电号码" />
        <el-table-column prop="address" label="咨询类别" />
        <el-table-column prop="address" label="咨询内容" />
        <el-table-column prop="address" label="客服" />
        <el-table-column prop="address" label="记录时间" />
      </el-table>
    </div>
    <!-- 模态框弹出框 -->
    <el-dialog title="记录" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :model="formInline" label-width="120px">
        <el-form-item label="咨询类别">
          <el-select v-model="formInline.region" placeholder="咨询类别">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="来电号码">
          <el-input v-model="formInline.region" />
        </el-form-item>
        <el-form-item label="备注" prop="desc">
          <el-input v-model="formInline.desc" type="textarea" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { queryUserMessage } from '@/api/user'
export default {
  data() {
    return {
      url:
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ],
      tableData: [],
      dialogVisible: false,
      formInline: {
        user: '',
        region: '',
        desc: ''
      },
      userInfo: {}, // 用户信息
      UserAuth: [], // 用户认证信息
      Relation: [], // 联系人信息
      UserBank: [], // 用户绑卡信息
      UserLoan: [], // 借款数据
      UserPayment: [], // 用户还款数据
      service: []
    }
  },
  created() {
    const { id } = this.$route.params
    queryUserMessage({ poolId: Number(id) }).then(r => {
      this.userInfo = r.data.userInfo
      this.UserAuth = r.data.userAuthInfo
      this.Relation = r.data.relationModelList
      this.UserBank = r.data.userBankInfo
      this.UserLoan = r.data.loanList
      this.UserPayment = r.data.paymentList
      this.service = r.data.CallRecord
    })
  },
  methods: {
    phoneConnect() {
      this.dialogVisible = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    onSubmit() {
      console.log('submit!')
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
