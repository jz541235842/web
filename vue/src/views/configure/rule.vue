<template>
  <div class="container">
    <div class="header">
      <el-button type="primary" size="mini" @click="add(1)">新增</el-button>
      <el-button type="success" size="mini" @click="pushPath">操作日志</el-button>
    </div>
    <div class="main">
      <el-table v-loading="listLoading" :data="productList" border class="list">
        <el-table-column label="序号" type="index" width="50" />
        <el-table-column prop="configKey" label="产品名称" />
        <el-table-column prop="period" label="产品期限" />
        <el-table-column prop="interestRate" label="产品利率" />
        <el-table-column prop="configQuota" label="可贷额度" />
        <el-table-column prop="configType" label="产品类型" />
        <el-table-column prop="serviceRate" label="服务费率" />
        <el-table-column prop="overdueRate" label="逾期费率" />
        <el-table-column prop="dayLimitAmount" label="产品日总额度" />
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.$index, scope.row,2)">编辑</el-button>
            <el-button
              v-if="scope.row.configStatus==0"
              size="mini"
              type="danger"
              @click="change(scope.$index, scope.row,3)"
            >禁用</el-button>
            <el-button
              v-if="scope.row.configStatus==1"
              size="mini"
              type="success"
              @click="change(scope.$index, scope.row,4)"
            >启用</el-button>
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
    <!-- 模态框 新增编辑模态框-->
    <el-dialog title="提示" :visible.sync="DialogVisible" width="40%">
      <el-form v-if="flag==1||flag==2" label-width="100px" :model="json">
        <el-form-item label="产品名称">
          <el-input v-model="json.configKey" />
        </el-form-item>
        <el-form-item label="产品期限">
          <el-input v-model="json.period" />
        </el-form-item>
        <el-form-item label="产品利率">
          <el-input v-model="json.interestRate" />
        </el-form-item>
        <el-form-item label="可贷额度">
          <el-input v-model="json.configQuota" />
        </el-form-item>
        <el-form-item label="产品类型">
          <el-input v-model="json.configType" />
        </el-form-item>
        <el-form-item label="服务费率">
          <el-input v-model="json.serviceRate" />
        </el-form-item>
        <el-form-item label="逾期费率">
          <el-input v-model="json.overdueRate" />
        </el-form-item>
        <el-form-item label="产品日总额度">
          <el-input v-model="json.dayLimitAmount" />
        </el-form-item>
      </el-form>
      <div v-if="flag==3||flag==4">确认{{ text }}</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="DialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import {
  productConfigList,
  addProductConfig,
  updateProductConfig,
  changeStatus
} from '@/api/config'
export default {
  components: { Pagination },
  data() {
    return {
      listLoading: false,
      DialogVisible: false,
      totalSize: 10,
      jsondata: {
        page: 1,
        pageSize: 10
      },
      // json  代表新增的数据
      json: {
        configKey: '', // 产品名称
        period: '', // 产品年限
        interestRate: '', // 产品利率
        configQuota: '', // 可贷额度
        configType: '', // 产品类型
        serviceRate: '', // 服务费率
        overdueRate: '', // 逾期费率
        dayLimitAmount: '' // 产品日总额度
      },
      productList: [], // 产品列表
      flag: '',
      text: '',
      upload: {
        resourceId: '', // 资源Id
        status: '' // 0[关闭] 1[开启]
      }
    }
  },
  mounted() {
    this.getList() // 产品规则列表
  },
  methods: {
    change(index, item, flag) {
      this.flag = flag
      if (flag == 3) { // 禁止
        // 禁用
        this.text = '禁止'
        this.upload = {
          resourceId: item.id, // 资源Id
          status: 1 // 0[关闭] 1[开启]
        }
      } else if (flag == 4) { // 开启
        // 启用
        this.text = '启用'
        this.upload = {
          resourceId: item.id, // 资源Id
          status: 0 // 0[关闭] 1[开启]
        }
      }
      this.DialogVisible = true
    },
    pushPath() {
      this.$router.push({ path: 'productLog' })
    },
    // 新增按钮
    add(flag) {
      this.DialogVisible = true
      this.flag = flag
      this.json = {
        configKey: '', // 产品名称
        period: '', // 产品年限
        interestRate: '', // 产品利率
        configQuota: '', // 可贷额度
        configType: '', // 产品类型
        serviceRate: '', // 服务费率
        overdueRate: '', // 逾期费率
        dayLimitAmount: '' // 产品日总额度
      }
    },
    // 新增
    addProductConfig() {
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
      addProductConfig(this.json).then(r => {
        this.$message({ type: 'success', message: r.data })
        this.listLoading = false
        this.DialogVisible = false
        this.getList()
      })
    },
    // 更新
    updateProductConfig() {
      updateProductConfig(this.json).then(r => {
        this.$message({ type: 'success', message: r.data })
        this.listLoading = false
        this.DialogVisible = false
        this.getList()
      })
    },
    // 保存
    save() {
      switch (this.flag) {
        case 1:
          this.addProductConfig()
          break
        case 2:
          this.updateProductConfig()
          break
        case 3:
          this.prohibit()
          break
        case 4:
          this.enable()
          break
        default:
          break
      }
    },
    // 编辑
    edit(index, item, flag) {
      this.flag = flag
      this.DialogVisible = true
      this.json = {
        id: item.id,
        configKey: item.configKey, // 产品名称
        period: item.period, // 产品年限
        interestRate: item.interestRate, // 产品利率
        configQuota: item.configQuota, // 可贷额度
        configType: item.configType, // 产品类型
        serviceRate: item.serviceRate, // 服务费率
        overdueRate: item.overdueRate, // 逾期费率
        dayLimitAmount: item.dayLimitAmount // 产品日总额度
      }
    },
    // 禁止
    prohibit(index, item) {
      this.listLoading = true
      changeStatus(this.upload).then(r => {
        this.listLoading = false
        this.DialogVisible = false
        this.getList() // 产品规则列表
      })
    },
    // 启用
    enable(index, item) {
      this.listLoading = true
      changeStatus(this.upload).then(r => {
        this.listLoading = false
        this.DialogVisible = false
        this.getList() // 产品规则列表
      })
    },
    // 获取列表
    getList() {
      productConfigList(this.jsondata).then(r => {
        const res = r.data
        this.productList = res.list
      })
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
