<template>
  <div class="container">
    <div class="header">
      <el-button type="primary" size="mini" @click="create = true">新增</el-button>
      <el-button type="success" size="mini" @click="pushPath">操作日志</el-button>
    </div>
    <div class="main">
      <el-table :data="tableData" border class="list" header-row-class-name="table-header">
        <el-table-column label="序号" type="index" width="50" />
        <el-table-column prop="date" label="消息配置名称" />
        <el-table-column prop="date" label="配置状态" />
        <el-table-column prop="name" label="消息内容(CN)" />
        <el-table-column prop="name" label="消息内容(US)" />
        <el-table-column prop="name" label="消息内容(ID)" />
        <el-table-column prop="date" label="消息类型" />
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="save(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="centerDialogVisible = true">禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
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
    <el-dialog title="提示" :visible.sync="create" width="30%" center>
      <el-form label-width="80px" :model="formLabelAlign">
        <el-form-item label="消息标题">
          <el-input v-model="formLabelAlign.name" />
        </el-form-item>
        <el-form-item label="消息内容">
          <el-input v-model="formLabelAlign.name" />
        </el-form-item>
        <el-form-item label="使用场景">
          <el-input v-model="formLabelAlign.name" />
        </el-form-item>
        <el-form-item label="发送方式">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="create = false">取 消</el-button>
        <el-button type="primary" @click="create = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
      <span>确认启用</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑" :visible.sync="edit" width="30%" center>
      <el-form label-width="80px" :model="formLabelAlign">
        <el-form-item label="消息标题">
          <el-input v-model="formLabelAlign.name" />
        </el-form-item>
        <el-form-item label="消息内容">
          <el-input v-model="formLabelAlign.name" />
        </el-form-item>
        <el-form-item label="使用场景">
          <el-input v-model="formLabelAlign.name" />
        </el-form-item>
        <el-form-item label="发送方式">
          <el-input v-model="formLabelAlign.name" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="edit = false">取 消</el-button>
        <el-button type="primary" @click="edit = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普'
        }
      ],
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      currentPage3: 1,
      create: false,
      centerDialogVisible: false,
      edit: false,
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      console.log(process.env.VUE_APP_BASE_API)
    },
    cancel() {},
    save(index, row) {
      this.edit = true
      console.log(row)
      this.formLabelAlign.name = row.name
    },
    pushPath() {
      this.$router.push({ path: 'massageLog' })
    }
  }
}
</script>

<style  lang="scss" scoped>
.container {
  background: #f2f2f2;
  padding: 20px;
  .header {
    padding: 20px;
    margin-bottom: 10px;
    background: #fff;
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
