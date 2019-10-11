<template>
  <div class="container">
    <div class="main">
      <el-row>
        <el-col>
          <el-radio v-model="radio" label="1" @change="openOne">角色组配置</el-radio>
          <el-radio v-model="radio" label="2" @change="openTwo">角色配置</el-radio>
        </el-col>
      </el-row>
      <div v-show="open">
        <el-button size="mini" class="btn" type="primary" @click="addGrounp">新增</el-button>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          class="list"
          border
        >
          <el-table-column prop="id" label="序号" />
          <el-table-column prop="groupName" label="角色组名称" />
          <el-table-column prop="name" label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="mini" @click="batch(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="find(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div v-show="!open" class="pend">
        <el-row>
          <el-col :span="4" class="name">
            <span>角色名称</span>
            <el-input v-model="lole.roleName" placeholder="请输入内容" />
          </el-col>
          <el-col :span="5">
            <span>所属角色组</span>
            <el-select v-model="lole.groupId" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="14">
            <el-button size="mini" class="btn" type="primary" @click="query">查询</el-button>
            <el-button size="mini" class="btn" type="primary" @click="into">新增</el-button>
          </el-col>
        </el-row>
        <el-table
          ref="multipleTable"
          :data="loleData"
          tooltip-effect="dark"
          style="width: 100%"
          class="list"
          border
        >
          <el-table-column prop="id" label="序号" />
          <el-table-column prop="roleName" label="角色名称" />
          <el-table-column prop="remark" label="角色描述" />
          <el-table-column prop="name" label="操作" width="250">
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
              <el-button
                size="mini"
                type="danger"
                @click="setCheckedKeys(scope.$index, scope.row)"
              >编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog title="编辑" :visible.sync="dialogVisible" width="30%">
      <el-form>
        <el-form-item label="角色组名称">
          <el-input v-model="form.groupName" placeholder="请输入内容" class="fpInput" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="determine">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="新增" :visible.sync="dialog" width="30%">
      <el-form>
        <el-form-item label="角色组名称">
          <el-input v-model="list.groupName" placeholder="请输入内容" class="fpInput" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="determine1">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="编辑" :visible.sync="dialogin" width="30%">
      <el-form>
        <el-col>
          <el-form-item label="角色名称">
            <el-input v-model="bjform.roleName" placeholder="请输入内容" class="fpInput" />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="角色描述">
            <el-input v-model="bjform.remark" placeholder="请输入内容" class="fpInput" />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="角色组">
            <el-select v-model="bjform.groupId" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="角色标识">
            <el-select v-model="bjform.code" placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item>
            <el-tree
              ref="tree"
              :data="data"
              show-checkbox
              node-key="id"
              default-expand-all
              :props="defaultProps"
            />
          </el-form-item>
        </el-col>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogin = false">取 消</el-button>
        <el-button type="primary" @click="getCheckedKeys">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="新增" :visible.sync="dialoginto" width="30%">
      <el-form>
        <el-col>
          <el-form-item label="角色名称">
            <el-input v-model="xzform.roleName" placeholder="请输入内容" class="fpInput" />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="角色描述">
            <el-input v-model="xzform.remark" placeholder="请输入内容" class="fpInput" />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="角色标识">
            <el-select v-model="xzform.code" placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="角色组">
            <el-select v-model="xzform.groupId" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="关联功能">
            <el-tree
              ref="tree"
              :data="data"
              show-checkbox
              node-key="id"
              :default-expanded-keys="data1"
              :default-checked-keys="data1"
              :props="defaultProps"
            />
          </el-form-item>
        </el-col>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialoginto = false">取 消</el-button>
        <el-button type="primary" @click="getCheckedKey">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryAuthGroupList,
  editAuthGroup,
  addAuthGroup,
  queryRoleList,
  unbanAdmin,
  queryAllRule,
  queryRoleById,
  editRole,
  addRole,
  banRole,
  unbanRole,
  queryBasicRole
} from '@/api/permission'
export default {
  data() {
    return {
      form: {
        groupName: '',
        id: ''
      },
      list: {
        groupName: ''
      },
      lolefrom: {
        roleName: null,
        groupId: null
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      bjform: {
        code: '',
        id: '',
        roleName: '', // 角色名称
        remark: '', // 角色描述
        groupId: '',
        rules: ''
      },
      xzform: {
        roleName: '',
        remark: null,
        code: '',
        groupId: '',
        rules: ''
      },
      lole: {
        roleName: '',
        groupId: ''
      },
      data: [],
      data1: [],
      data2: [],
      options: [],
      options1: [],
      ban: false,
      dialogin: false,
      currentPage3: 1,
      tableData: [],
      loleData: [],
      currentPage3: 1,
      radio: '1',
      dialogVisible: false,
      dialog: false,
      dialoginto: false,
      open: true
    }
  },
  created() {
    queryAuthGroupList().then(r => {
      this.tableData = r.data
      for (let i = 0; i < r.data.length; i++) {
        const str = {
          value: r.data[i].id,
          label: r.data[i].groupName
        }
        this.options.push(str)
      }
    })
    queryRoleList().then(r => {})
    queryAllRule().then(r => {
      this.data = r.data
    })
    queryBasicRole().then(r => {
      for (let i = 0; i < r.data.length; i++) {
        for (const k in r.data[i]) {
          const str = {
            value: k,
            label: k
          }
          this.options1.push(str)
        }
      }
    })
  },
  methods: {
    batch(index, row) {
      this.dialogVisible = true
      this.form.groupName = row.groupName
      this.form.id = row.id
    },
    batch1(index, row) {
      row.status = 1
      unbanRole({ id: row.id }).then(r => {
        if (r.success) {
          alert('修改成功')
        } else {
          alert('修改失败')
        }
      })
    },
    determine() {
      this.dialogVisible = false
      editAuthGroup(this.form).then(r => {
        if (r.success) {
          alert('编辑成功')
        } else {
          alert('编辑失败')
        }
      })
    },
    addGrounp() {
      this.dialog = true
    },
    determine1() {
      this.dialog = false
      addAuthGroup(this.list).then(r => {
        if (r.success) {
          alert('添加成功')
        } else {
          alert('添加失败')
        }
      })
    },
    find() {},
    find1(index, row) {
      row.status = 0
      banRole({ id: row.id }).then(r => {
        if (r.success) {
          alert('修改成功')
        } else {
          alert('修改失败')
        }
      })
    },
    setCheckedKeys(index, row) {
      this.dialogin = true
      queryRoleById({ id: row.id }).then(r => {
        const list = r.data.rules.split(',')
        for (let i = 0; i < list.length; i++) {
          this.data1.push(Number(list[i]))
        }
      })
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(this.data1)
        this.data1 = []
      })
      this.bjform.id = row.id
      this.bjform.roleName = row.roleName
      this.bjform.remark = row.remark
    },
    query() {
      if (this.lole.roleName == '') {
        this.lolefrom.roleName = null
      } else {
        this.lolefrom.roleName = this.lole.roleName
      }
      if (this.lole.groupId == '') {
        this.lolefrom.groupId = null
      } else {
        this.lolefrom.groupId = this.lole.groupId
      }
      queryRoleList(this.lolefrom).then(r => {
        this.loleData = r.data
      })
    },
    getCheckedKeys() {
      this.data2 = this.$refs.tree.getCheckedKeys()
      this.dialogin = false
      this.bjform.rules = this.data2.join(',')
      console.log(this.bjform)
      editRole(this.bjform).then(r => {
        if (r.success) {
          alert('修改成功')
        } else {
          alert('修改失败')
        }
      })
    },
    getCheckedKey() {
      this.xzform.rules = this.$refs.tree.getCheckedKeys().join(',')
      this.dialoginto = false
      addRole(this.xzform).then(r => {
        if (r.success) {
          alert('修改成功')
        } else {
          alert('修改失败')
        }
      })
    },
    into() {
      this.dialoginto = true
    },
    openOne() {
      this.open = true
    },
    openTwo() {
      this.open = false
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
  .btn {
    float: right;
    margin: 20px;
  }
  .main {
    background: #fff;
    padding: 20px;
    .list {
      margin-top: 20px;
    }
  }
}
.name {
  margin-right: 20px;
}
.pend {
  margin-top: 40px;
}
</style>
