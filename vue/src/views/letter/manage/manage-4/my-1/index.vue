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
              <el-input v-model="jsondata.userName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="贷款编号">
              <el-input v-model="jsondata.loan_no"></el-input>
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
              <el-input v-model="jsondata.mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="审批状态">
              <el-select v-model="jsondata.examineStatus" placeholder="审批状态">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="机审结果">
              <el-select v-model="jsondata.machineAuditStatus" placeholder="机审结果">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="main">
      <span class="title">申请列表</span>
      <el-table
        :data="list"
        border
        class="list"
        header-row-class-name="table-header"
        v-loading="listLoading"
      >
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column prop="loanNo" label="贷款编号"></el-table-column>
        <el-table-column prop="name" label="贷款金额"></el-table-column>
        <el-table-column prop="address" label="产品名称"></el-table-column>
        <el-table-column prop="address" label="期限"></el-table-column>
        <el-table-column prop="mobile" label="手机号码"></el-table-column>
        <el-table-column prop="userName" label="姓名"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="address" label="是否复贷"></el-table-column>
        <el-table-column prop="address" label="机审结果"></el-table-column>
        <el-table-column prop="address" label="审批状态"></el-table-column>
        <el-table-column prop="result" label="拒绝原因"></el-table-column>
        <el-table-column prop="address" label="机审时间"></el-table-column>
        <el-table-column prop="address" label="申请时间"></el-table-column>
        <el-table-column prop="address" label="放款时间"></el-table-column>
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
import Pagination from "@/components/Pagination";
import Date from "@/components/Date";
import { allApplications } from "@/api/letter";
export default {
  components: { Pagination, Date },
  data() {
    return {
      list: [],
      totalSize: 0,
      listLoading: true,
      jsondata: {
        minAddtime: "", //申请时间 开始
        maxAddtime: "", //申请时间 结束
        minArrival_time: "", //放款时间 开始
        maxAarrival_time: "", //放款时间 结束
        // userName: "", //用户昵称
        mobile: "15063657193", //手机号码
        // loan_no: "", //贷款编号
        machineAuditStatus: null, //机审结果
        examineStatus: "", //审批状态
        page: 1, //当前页
        pageSize: 20 //每页20条数据
      }
    };
  },
  methods: {
    getList() {
      let that = this;
      that.listLoading = true;
      allApplications(that.jsondata)
        .then(r => {
          let res = r.data;
          that.totalSize = res.totalSize;
          that.list = res.list;
          that.listLoading = false;
        })
        .catch(r => {});
    },
    Search() {
      console.log(this.jsondata);
    },
    Export() {},
    // 申请时间
    getTime1(date) {
      this.jsondata.minAddtime = date[0];
      this.jsondata.maxAddtime = date[1];
    },
    //放款时间
    getTime2(date) {
      this.jsondata.minArrival_time = date[0];
      this.jsondata.maxAarrival_time = date[1];
    }
  },
  mounted() {
    this.getList();
  }
};
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
