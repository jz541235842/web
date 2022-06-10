<template>
  <div class="container">
    <div class="main">
      <div>
        <span class="title">组别配置</span>
        <el-button type="primary" class="btn" size="mini" @click="add(3)">新增</el-button>
        <el-button type="success" size="mini" class="btn btn1" @click="journal">操作日志</el-button>
      </div>
      <el-table v-loading="listLoading" :data="letterTeam" border class="list">
        <el-table-column label="序号" type="index" width="50" />
        <el-table-column prop="groupName" label="信审组" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="edit(scope.$index, scope.row,1)">编辑</el-button>
            <!-- <el-button type="danger" size="mini" @click="del(scope.$index, scope.row,2)">删除2</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="main">
      <div>
        <span class="title">组员配置</span>
        <el-button type="primary" class="btn" size="mini" @click="add(-3)">新增</el-button>
      </div>
      <el-table v-loading="listLoading" :data="letterPeople" border class="list">
        <el-table-column label="序号" type="index" width="50" />
        <el-table-column prop="adminName" label="信审员" />
        <el-table-column prop="groupName" label="信审组" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="edit(scope.$index, scope.row,-1)">编辑</el-button>
            <!-- <el-button type="danger" size="mini" @click="del(scope.$index, scope.row,-2)">删除-2</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="totalSize>0"
        :total="totalSize"
        :page.sync="page.page"
        :limit.sync="page.pageSize"
        @pagination="getList"
      />
    </div>
    <!-- 模态框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <!-- 信审组 -->
      <el-form v-if="flag==3||flag==1" ref="form" :model="json" label-width="80px">
        <el-form-item label="信审组">
          <el-input v-model="json.groupName" />
        </el-form-item>
      </el-form>
      <!-- 信审员 -->
      <el-form v-if="flag==-3||flag==-1" ref="form" :model="jsondata" label-width="80px">
        <el-form-item label="信审员">
          <el-select
            v-model="jsondata.adminName"
            placeholder="信审员"
            :disabled="adminNameStatus"
            @change="getPeople"
          >
            <el-option
              v-for="(item,index) in allLetterPeople"
              :key="index"
              :label="item.adminName"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="信审组">
          <el-select v-model="jsondata.groupName" placeholder="信审组" @change="getTeam">
            <el-option
              v-for="(item,index) in letterTeam"
              :key="index"
              :label="item.groupName"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import {
  addLetterTeam,
  addLetterPeople,
  getLetterTeamList,
  getLetterPeopleList
} from '@/api/config'
export default {
  components: { Pagination },
  data() {
    return {
      dialogVisible: false,
      listLoading: false, // table  loading
      totalSize: 10,
      // 信审组
      json: {
        groupName: ''
        // id: ""
      },
      // 信审组员
      jsondata: {
        groupId: '', // 信审组id   选择信审组获取
        groupName: '', // 组名
        adminId: '', // 管理员id
        adminName: '' // 管理员名字
        // id: "" //组员id
      },
      adminNameStatus: false, // 获取信审人员的 adminId  和信审人员的adminName  不灵性
      // 组员  每页10条
      page: {
        page: 1,
        pageSize: 10
      },
      // 全部组员
      page1: {
        page: 1,
        pageSize: 999
      },
      letterTeam: [], // 信审组列表
      letterPeople: [], // 信审员列表
      allLetterPeople: [], // 全部信审员列表
      flag: null // 1编辑组别 -1编辑组员 2删除组别 -2删除组员  3新增组别  -3新增组别
    }
  },
  mounted() {
    this.getLetterTeamList() // 获取信审组
    this.getList() // 信审员列表
    this.getLetterPeopleList() // 获取全部组员
  },
  methods: {
    // 新增
    add(flag) {
      this.flag = flag
      if (flag == 3) {
        // 新增信审组
        this.json = {
          groupName: ''
          // id: ""
        }
      } else if (flag == -3) {
        // 新增信审组员
        this.jsondata = {
          groupId: '', // 信审组id   选择信审组获取
          groupName: '', // 组名
          adminId: '', // 管理员id
          adminName: ''// 管理员名字
          // id: "" //组员id
        }
        this.adminNameStatus = false
      }
      this.dialogVisible = true
    },
    // 编辑
    edit(index, item, flag) {
      this.flag = flag
      if (flag == 1) {
        // 编辑组别
        this.json = {
          groupName: item.groupName,
          id: item.id.toString()
        }
      } else if (flag == -1) {
        // 编辑组员
        this.jsondata = {
          groupId: item.groupId.toString(), // 信审组id   选择信审组获取
          groupName: item.groupName, // 组名
          adminId: item.adminId.toString(), // 管理员id
          adminName: item.adminName, // 管理员名字
          id: item.id.toString() // 组员id
        }
        this.adminNameStatus = true
      }
      this.dialogVisible = true
    },
    // 获取信审组列表
    getLetterTeamList() {
      getLetterTeamList().then(r => {
        this.letterTeam = r.data
      })
    },
    // 确定
    sure() {
      // flag  //1编辑组别 -1编辑组员 2删除组别 -2删除组员  3新增组别  -3新增组组员
      switch (this.flag) {
        case 1:
          this.addLetterTeam()
          break
        case 3:
          this.addLetterTeam()
          break
        case -1:
          this.addLetterPeople()
          break
        case -3:
          this.addLetterPeople()
          break
        default:
          break
      }
    },
    // 删除
    del() {},
    // 操作日志
    journal() {
      this.$router.push({ path: 'groupList' })
    },
    // 获取信审员列表
    getList() {
      getLetterPeopleList(this.page).then(r => {
        const res = r.data
        this.letterPeople = res.list
      })
    },
    getLetterPeopleList() {
      getLetterPeopleList(this.page1).then(r => {
        const res = r.data
        this.allLetterPeople = res.list
      })
    },
    // 新增信审组  和编辑信审组
    addLetterTeam() {
      console.log(this.json)
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
      addLetterTeam(this.json).then(r => {
        this.$message({ type: 'success', message: r.data })
        this.listLoading = false
        this.dialogVisible = false
        this.getLetterTeamList()
      })
    },
    // 新增信审组员和编辑信审组员
    addLetterPeople() {
      var obj = this.jsondata
      for (var key in obj) {
        if (obj[key].trim() == '') {
          this.$alert('请确认字段是否都填写', '提示', {
            confirmButtonText: '确定'
          })
          return false
        }
      }
      this.listLoading = true
      addLetterPeople(this.jsondata).then(r => {
        this.$message({ type: 'success', message: r.data })
        this.listLoading = false
        this.dialogVisible = false
        this.getList()
      })
    },
    // 监听信审组  获取信审组id
    getTeam(obj) {
      this.jsondata.groupName = obj.groupName // 催收组名称
      this.jsondata.groupId = obj.id.toString() // 催收组id
    },
    // 监听信审人员
    getPeople(obj) {
      this.jsondata.adminId = obj.adminId.toString()
      this.jsondata.adminName = obj.adminName
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
    .btn1 {
      margin-right: 10px;
    }
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
