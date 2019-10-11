<template>
  <div class="container">
    <div class="header">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="账号">
              <el-input v-model="sach.number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="真实姓名">
              <el-input v-model="sach.name" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-button type="primary" @click="query">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="main">
      <el-row>
        <el-col>
          <el-button size="mini" type="primary" @click="add">新增</el-button>
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
        <el-table-column prop="id" label="序号" />
        <el-table-column prop="account" label="账号" />
        <el-table-column prop="username" label="真实姓名" />
        <el-table-column prop="roleName" label="关联角色" />
        <el-table-column prop="groupName" label="所属角色组" />
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status==0"
              size="mini"
              @click="batch1(scope.$index, scope.row)"
            >启用</el-button>
            <el-button
              v-if="scope.row.status==1"
              size="mini"
              type="danger"
              @click="find1(scope.$index, scope.row)"
            >禁用</el-button>
            <el-button size="mini" type="danger" @click="find2(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="form.totalSize"
        :page.sync="form.page"
        :limit.sync="form.pageSize"
        @pagination="getList"
      />
    </div>

    <el-dialog title="编辑" :visible.sync="dialogVisible" width="30%">
      <el-form>
        <el-col>
          <span>账号：</span>
          <el-input v-model="dialog.account" placeholder="账号" style="width:200px" />
        </el-col>
        <el-col>
          <span>密码：</span>
          <el-input v-model="dialog.password" placeholder="密码" show-password style="width:200px" />
        </el-col>
        <el-col>
          <span>重复密码：</span>
          <el-input v-model="dialog.compassword" placeholder="密码" show-password style="width:200px" />
        </el-col>
        <el-col>
          <span>真实姓名：</span>
          <el-input v-model="dialog.username" placeholder="姓名" style="width:200px" />
        </el-col>
        <el-col>
          <span>关联角色</span>
          <el-select v-model="form.value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="determine">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="新增" :visible.sync="dialogOne" width="30%">
      <el-form>
        <el-col>
          <span>账号：</span>
          <el-input v-model="addOne.account" placeholder="账号" style="width:200px" />
        </el-col>
        <el-col>
          <span>密码：</span>
          <el-input v-model="addOne.password" placeholder="密码" show-password style="width:200px" />
        </el-col>
        <el-col>
          <span>重复密码：</span>
          <el-input v-model="addOne.compassword" placeholder="密码" show-password style="width:200px" />
        </el-col>
        <el-col>
          <span>真实姓名：</span>
          <el-input v-model="addOne.username" placeholder="姓名" style="width:200px" />
        </el-col>
        <el-col>
          <span>关联角色</span>
          <el-select v-model="form.value1" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogOne = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import {
  queryAdminList,
  banAdmin,
  unbanAdmin,
  queryAuthGroupList,
  editAuthAdmin,
  queryRoleList,
  addAuthAdmin
} from '@/api/permission'
export default {
  components: { Pagination },
  data() {
    return {
      currentPage3: 1,
      dialogVisible: false,
      dialogOne: false,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '99'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '888'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '666'
        }
      ],
      currentPage3: 1,
      radio: '1',
      form: {
        date1: '',
        date2: '',
        name: '',
        region: '',
        value: '',
        value1: '',
        totalSize: 0,
        page: 1,
        pageSize: 10
      },
      jsondata: {
        account: null,
        username: null,
        pageSize: 10,
        page: 1
      },
      options: [],
      dialog: {
        account: '',
        password: null,
        compassword: null,
        username: '',
        roleId: '',
        id: ''
      },
      addOne: {
        account: '',
        password: '',
        compassword: '',
        username: '',
        roleId: ''
      },
      sach: {
        number: '',
        name: ''
      }
    }
  },
  created() {
    queryAdminList(this.jsondata).then(r => {
      this.tableData = r.data.list
      this.form.totalSize = r.data.totalSize
    })
    queryRoleList({}).then(r => {
      for (let i = 0; i < r.data.length; i++) {
        const str = {
          value: r.data[i].id,
          label: r.data[i].roleName
        }
        this.options.push(str)
      }
    })
  },
  methods: {
    batch1(index, row) {
      row.status = 0
      unbanAdmin({ id: row.id }).then(r => {
        if (r.success) {
          alert('修改成功')
        } else {
          alert('修改失败')
        }
      })
    },
    find1(index, row) {
      row.status = 1
      banAdmin({ id: row.id }).then(r => {
        if (r.success) {
          alert('修改成功')
        } else {
          alert('修改失败')
        }
      })
    },
    find2(index, row) {
      this.dialogVisible = true
      this.dialog.account = row.account
      this.dialog.username = row.username
      this.dialog.id = row.id
    },
    determine() {
      this.dialog.roleId = this.form.value
      console.log(this.dialog.roleId)
      editAuthAdmin(this.dialog).then(r => {
        if (r.success) {
          alert('修改成功')
        } else {
          alert('修改失败')
        }
      })
    },
    add() {
      this.dialogOne = true
    },
    sure() {
      this.dialogOne = false
      this.addOne.roleId = this.form.value1
      addAuthAdmin(this.addOne).then(r => {
        if (r.success) {
          alert('添加成功')
        } else {
          alert('添加失败')
        }
      })
    },
    getList() {
      const that = this
      that.listLoading = true
      queryAdminList(that.jsondata)
        .then(r => {
          const res = r.data
          that.form.totalSize = res.totalSize
          that.tableData = res.list
          that.listLoading = false
        })
        .catch(r => {})
    },
    query() {
      if (this.sach.number == '') {
        this.jsondata.account = null
      } else {
        this.jsondata.account = this.sach.number
      }
      if (this.sach.name == '') {
        this.jsondata.username = null
      } else {
        this.jsondata.username = this.sach.name
      }
      queryAdminList(this.jsondata).then(r => {
        this.tableData = r.data.list
        this.form.totalSize = r.data.totalSize
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
  }
}
.el-col {
  margin-bottom: 20px;
}
</style>
