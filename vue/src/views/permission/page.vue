<template>
  <div class="container">
    <div class="header">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="资源名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="资源URL">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属部门">
              <el-select v-model="form.region" placeholder="所属部门">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" :offset="1">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="main">
      <el-button size="mini" @click="batch" class="batch" type="primary">新增</el-button>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        class="list"
        border
      >
        <el-table-column label="ID">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="资源名称"></el-table-column>
        <el-table-column prop="name" label="资源URL"></el-table-column>
        <el-table-column prop="name" label="资源类型"></el-table-column>
        <el-table-column prop="name" label="所属系统"></el-table-column>
        <el-table-column prop="name" label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="batch(scope.$index, scope.row)">分配</el-button>
            <el-button size="mini" type="danger" @click="find(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
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
      currentPage3: 1,
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
        }
      ],
      currentPage3: 1,
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
  .header {
    background: #fff;
    padding: 20px;
    margin-bottom: 10px;
  }
  .main {
    background: #fff;
    padding: 20px;
    .list {
      margin-top: 20px;
    }
    .paging {
      margin-top: 15px;
    }
  }
}
</style>
