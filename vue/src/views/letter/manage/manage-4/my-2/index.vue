<template>
  <div class="container">
    <div class="header">
      <div class="header-item">
        <span class="title">查询条件</span>
        <div class="btn">
          <el-button type="primary" size="mini">查询</el-button>
          <el-button type="success" size="mini">导出</el-button>
        </div>
      </div>
      <el-form ref="form" :model="form" label-width="80px" class="from">
        <el-form-item label="申请时间">
          <el-col :span="4">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="4">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
          <el-col :span="6">
            <el-form-item label="贷款编号">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
           <el-form-item label="信审人员">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="放款时间">
          <el-col :span="4">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="4">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号码">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="审批状态">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="机审结果">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
    <div class="main">
      <span class="title">申请列表</span>
      <el-table :data="tableData" border class="list" header-row-class-name="table-header">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column prop="date" label="贷款编号"></el-table-column>
        <el-table-column prop="name" label="是否复贷"></el-table-column>
        <el-table-column prop="address" label="贷款金额"></el-table-column>
        <el-table-column prop="address" label="产品名称"></el-table-column>
        <el-table-column prop="address" label="期限"></el-table-column>
        <el-table-column prop="address" label="手机号码"></el-table-column>
        <el-table-column prop="address" label="姓名"></el-table-column>
        <el-table-column prop="address" label="性别"></el-table-column>
        <el-table-column prop="address" label="年龄"></el-table-column>
        <el-table-column prop="address" label="审批状态"></el-table-column>
        <el-table-column prop="address" label="备注"></el-table-column>
        <el-table-column prop="address" label="分配时间"></el-table-column>
        <el-table-column prop="address" label="审批时间"></el-table-column>
        <el-table-column prop="address" label="操作"></el-table-column>
      </el-table>
      <div class="paging">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        date1: "",
        date2: "",
        name: "",
        region: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "99"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "888"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "666"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "222 1516 弄"
        }
      ],
      currentPage3: 1
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
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
    .paging {
      margin-top: 15px;
    }
  }
}
</style>
