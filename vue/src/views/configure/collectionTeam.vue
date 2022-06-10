<template>
  <div class="container">
    <div class="main">
      <div>
        <span class="title">组别配置</span>
        <el-button type="success" class="btn" size="mini" @click="add(1)">新增</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="groupList"
        border
        class="list"
        header-row-class-name="table-header"
      >
        <el-table-column label="序号" type="index" width="50" />
        <el-table-column prop="name" label="催收组" />
        <el-table-column prop="startDays" label="催收开始时间" />
        <el-table-column prop="endDays" label="催收结束时间" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="edit(scope.$index, scope.row,-1)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="main">
      <div>
        <span class="title">组员配置</span>
        <el-button type="success" class="btn" size="mini" @click="add(2)">新增</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="customerList"
        border
        class="list"
        header-row-class-name="table-header"
      >
        <el-table-column label="序号" type="index" width="50" />
        <el-table-column prop="name" label="催收员" />
        <el-table-column prop="groupId" label="催收组" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="edit(scope.$index, scope.row,-2)">编辑</el-button>
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
    </div>
    <!-- 模态框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="Close">
      <!-- 组名 -->
      <el-form v-if="flag==1||flag==-1" ref="form" :model="json" label-width="120px">
        <el-form-item label="催收组">
          <el-input v-model="json.name" :readonly="groupStatus" />
        </el-form-item>
        <el-form-item label="催收开始时间(天)">
          <el-input v-model="json.startDays" />
        </el-form-item>
        <el-form-item label="催收截至时间(天)">
          <el-input v-model="json.endDays" />
        </el-form-item>
      </el-form>
      <!-- 组员 -->
      <el-form v-if="flag==2||flag==-2" :model="jsonCust" label-width="120px">
        <el-form-item label="催收员">
          <el-select v-model="jsonCust.adminId" placeholder="催收员" :disabled="collectorStatus" @change="getCusterName">
            <el-option
              v-for="(item,index) in customerList"
              :key="index"
              :label="item.name"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="催收组">
          <el-select v-model="jsonCust.groupId" placeholder="催收组">
            <el-option
              v-for="(item,index) in groupList"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="success" @click="save">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import {
  queryGroup,
  queryCustomer,
  saveOrUpdateGroup,
  saveOrUpdateCustomer
} from '@/api/config'
export default {
  components: { Pagination },
  data() {
    return {
      // 组别json
      json: {
        id: 0,
        name: '',
        startDays: '',
        endDays: ''
      },
      // 组员 jsonCust
      jsonCust: {
        id: '',
        name: '',
        adminId: null,
        groupId: null
      },
      custerName: '', // 催收组姓名
      listLoading: false, // table  loading
      groupStatus: false, // 催收组输入框状态
      collectorStatus: false, // 催收员输入状态
      dialogVisible: false,
      totalSize: 10,
      listLoading: true,
      jsondata: {
        page: 1, // 当前页
        pageSize: 10 // 每页10条数据
      },
      groupList: [], // 催收组
      customerList: [], // 催收员
      flag: null // 1代表新增组别配置  -1代表编辑组别配置 2代表组员配置  -2代表编辑组员配置
    }
  },
  mounted() {
    this.queryGroup()
    this.queryCustomer()
  },
  methods: {
    cancel() {
      this.collectorStatus = false
      this.groupStatus = false
      this.dialogVisible = false
    },
    Close(done) {
      done()
      this.collectorStatus = false
      this.groupStatus = false
    },
    getList() {},
    add(index) {
      this.flag = index
      if (index == 1) {
        this.json = {
          name: '',
          startDays: '',
          endDays: ''
        }
        // 组别新增
      } else {
        this.jsonCust = {}
        // 组员新增
      }
      this.dialogVisible = true
    },
    edit(index, item, flag) {
      this.flag = flag
      if (flag == -1) {
        // 编辑组别配置
        this.json = {
          id: item.id,
          name: item.name,
          startDays: item.startDays,
          endDays: item.endDays
        }
        this.groupStatus = true
      } else {
        // 编辑组员配置
        this.jsonCust = {
          id: item.id,
          name: item.name,
          adminId: item.adminId,
          groupId: item.groupId
        }
        this.collectorStatus = true
      }
      this.dialogVisible = true
    },
    // 查询催收员接口
    queryGroup() {
      queryGroup().then(r => {
        this.groupList = r.data
        this.listLoading = false
      })
    },
    // 催收员
    queryCustomer() {
      queryCustomer(this.jsondata).then(r => {
        this.customerList = r.data
        this.listLoading = false
      })
    },
    // 保存
    save() {
      // 1代表新增组别配置  -1代表编辑组别配置 2代表组员配置  -2代表编辑组员配置
      switch (this.flag) {
        case 1:
          this.addGroup()
          break
        case -1:
          this.editGroup()
          break
        case 2:
          this.addCust()
          break
        case -2:
          this.editCust()
          break
        default:
          break
      }
    },
    // 组别新增
    addGroup() {
      var obj = this.json
      for (var key in obj) {
        if (obj[key].trim() == '') {
          this.$alert('请确认字段是否都填写', '提示', {
            confirmButtonText: '确定'
          })
          return false
        }
      }
      this.listLoading = true
      saveOrUpdateGroup(this.json).then(r => {
        this.$message({ type: 'success', message: r.data })
        this.listLoading = false
        this.dialogVisible = false
        this.queryGroup()
      })
    },
    // 编辑组别
    editGroup() {
      this.listLoading = true
      saveOrUpdateGroup(this.json).then(r => {
        this.$message({ type: 'success', message: r.data })
        this.listLoading = false
        this.dialogVisible = false
        this.queryGroup()
      })
    },
    // 新增组员
    addCust() {
      this.jsonCust.name = this.custerName
      var obj = this.jsonCust
      for (var key in obj) {
        if (obj[key].trim() == '') {
          this.$alert('请确认字段是否都填写', '提示', {
            confirmButtonText: '确定'
          })
          return false
        }
      }
      this.listLoading = true
      saveOrUpdateCustomer(this.jsonCust).then(r => {
        this.jsondata = {
          page: 1,
          pageSize: 10
        }
        this.$message({ type: 'success', message: r.data })
        this.queryCustomer()
        this.listLoading = false
        this.dialogVisible = false
      })
    },
    // 编辑组员
    editCust() {
      this.listLoading = true
      saveOrUpdateCustomer(this.jsonCust).then(r => {
        this.jsondata = {
          page: 1,
          pageSize: 10
        }
        this.$message({ type: 'success', message: r.data })
        this.queryCustomer()
        this.listLoading = false
        this.dialogVisible = false
      })
    },
    // 获取催收员姓名
    getCusterName(obj) {
      this.custerName = obj.name
    }
  }
}
</script>
<style  lang="scss" scoped>
.container {
  background: #f2f2f2;
  padding: 20px;
  padding-top: 10px;
  // 主体
  .main {
    background: #fff;
    padding: 20px;
    margin-top: 10px;
    .btn {
      float: right;
    }
    .table-header {
      font-size: 13px !important;
    }
    .list {
      margin-top: 20px;
    }
  }
}
</style>
