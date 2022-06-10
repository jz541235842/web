<template>
  <div class="container">
    <div class="header">
      <div class="header-item">
        <span class="title">查询条件</span>
        <div class="btn">
          <el-button type="primary" size="mini">查询</el-button>
        </div>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="用户ID">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号码">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
         
        </el-row>
      </el-form>
    </div>
    <div class="main">
      <el-row>
        <el-col>
          <el-radio v-model="radio" label="1">短信消息</el-radio>
          <el-radio v-model="radio" label="2">系统消息</el-radio>
        </el-col>
      </el-row>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        class="list"
        border
      >
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column prop="name" label="标题"></el-table-column>
        <el-table-column prop="name" label="内容"></el-table-column>
        <el-table-column prop="name" label="发送结果"></el-table-column>
        <el-table-column prop="name" label="发送时间"></el-table-column>
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
      <!-- 提示框 -->
      <el-dialog title="批量分配" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form>
          <el-form-item label="信审人员">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
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
      currentPage3: 1,
      multipleSelection: [],
      radio: "1",
      dialogVisible: false
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    find() {},
    // 批量
    batch() {
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
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
