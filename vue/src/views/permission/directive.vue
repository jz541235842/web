<template>
  <el-container>
    <el-aside class="aside">
      <el-tree :data="options" :props="defaultProps" @node-click="handleNodeClick" />
    </el-aside>
    <el-main>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-row>
          <el-form-item label="ID">
            <el-input v-model="jsondata.id" disabled />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="父级ID">
            <el-input v-model="jsondata.parentId" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="title">
            <el-input v-model="jsondata.title" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="name">
            <el-input v-model="jsondata.name" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="icon">
            <el-input v-model="jsondata.icon" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="component">
            <el-input v-model="jsondata.component" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="path">
            <el-input v-model="jsondata.path" />
          </el-form-item>
        </el-row>
        <el-row>
          <span>是否启用</span>
          <el-radio v-model="jsondata.status" label="1">是</el-radio>
          <el-radio v-model="jsondata.status" label="2">否</el-radio>
        </el-row>
        <el-row>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">更新</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="init">新增</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="clear">清空</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import {
  queryAllRule,
  editAuthRule,
  queryAuthById,
  addAuthRule
} from '@/api/permission'
export default {
  data() {
    return {
      form: {
        id: '',
        radio: '1'
      },
      options: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      formInline: {
        user: '',
        region: ''
      },
      jsondata: {
        id: '',
        icon: null,
        name: '',
        path: '',
        title: '',
        component: '',
        status: '',
        listOrder: '',
        parentId: ''
      }
    }
  },
  created() {
    queryAllRule().then(r => {
      this.options = r.data
      this.form.id = r.data.id
      this.jsondata.id = r.data.id
      console.log(r.data)
    })
  },
  methods: {
    handleNodeClick(data) {
      queryAuthById({ id: data.id }).then(r => {
        this.jsondata.id = r.data.id
        this.jsondata.icon = r.data.icon
        this.jsondata.name = r.data.name
        this.jsondata.path = r.data.path
        this.jsondata.title = r.data.title
        this.jsondata.component = r.data.component
        this.jsondata.status = r.data.status.toString()
        this.jsondata.listOrder = r.data.listOrder
        this.jsondata.parentId = r.data.parentId
        console.log(r)
      })
    },
    onSubmit() {
      console.log(this.jsondata)
      editAuthRule(this.jsondata).then(r => {
        if (r.success) {
          alert('修改成功')
        } else {
          alert('修改失败')
        }
      })
    },
    clear() {
      this.jsondata = {
        id: '',
        icon: null,
        name: '',
        path: '',
        title: '',
        component: '',
        status: '',
        listOrder: '',
        parentId: ''
      }
    },
    init() {
      addAuthRule(this.jsondata).then(r => {
        if (r.success) {
          alert('添加成功')
        } else {
          alert('添加失败')
        }
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
.asid {
  border-right: 1px solid #f2f2f2;
}
</style>

