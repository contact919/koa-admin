<template>
  <div class="hello">    
    <div class="app-container">
      <!-- 查询操作 -->
      <div class="filter-container">
        <el-input size="medium" v-model="listQuery.id" @keyup.enter.native="handleFilter" clearable class="filter-item" style="width: 200px;" placeholder="请输入商品编号"/>
        <el-input size="medium" v-model="listQuery.keywords" @keyup.enter.native="handleFilter" clearable class="filter-item" style="width: 200px;" placeholder="请输入商品名称"/>
        <el-button size="medium" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
        <el-button size="medium" class="filter-item" type="primary" icon="el-icon-plus" @click="handleCreate">添加</el-button>
      </div>
      <!-- 查询结果 -->
      <el-table v-loading="listLoading" :data="list" size="small" element-loading-text="正在查询中..." border fit highlight-current-row>
        <!-- 商品画廊 -->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" class="table-expand">
              <el-form-item label="宣传画廊">
                <img v-for="pic in JSON.parse(props.row.gallery)" :key="pic" :src="pic" class="gallery">
              </el-form-item>
              <el-form-item label="商品介绍">
                <span>{{ props.row.brief }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <!-- 商品list -->
        <el-table-column align="center" label="图片">
          <template slot-scope="scope">
            <img v-if="scope.row.pic_url" :src="scope.row.pic_url" width="40">
          </template>
        </el-table-column>
        <el-table-column align="center" label="商品编号" prop="goods_sn"/>
        <el-table-column align="center" label="名称" prop="name"/>     
        <el-table-column align="center" label="原价" prop="counter_price"/>
        <el-table-column align="center" label="当前价格" prop="retail_price"/>
        <el-table-column align="center" label="是否新品" prop="is_new">
          <template slot-scope="scope">
              <el-tag :type="scope.row.is_new ? 'success' : 'error' ">{{ scope.row.is_new ? '新品' : '非新' }}</el-tag>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      <!-- 回顶 -->
      <el-tooltip placement="top" content="返回顶部">
        <back-to-top :visibility-height="100" />
      </el-tooltip>
    </div>
  </div>
</template>

<script>
// import { listBrand, createBrand, updateBrand, deleteBrand } from '@/api/brand'
import { GoodsList, GoodsDelete } from '@/api/goods'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination'

export default {
  name: 'goodsList',
  components: { 
    BackToTop,
    Pagination 
  },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        id: "",
        keywords: "",
        page: 1,
        limit: 20,
      },
      dialogStatus: '',
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      GoodsList(this.listQuery).then( res => {
        console.log(res)
        if (res.status === 200 && res.data.data) {
          this.list = res.data.data.rows
          this.total = res.data.data.count
          this.listLoading = false  
        }
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleCreate() {
      this.$router.push({ path:'/goodsCreate' })
      // this.dialogStatus = 'create'
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    handleUpdate(row) {
      this.$router.push({
        path:'/goodsEdit',
        query:{
          id:row.goods_sn
        }
      })
    },
    handleDelete(row) {
      GoodsDelete(row).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
          this.total--;
        }else{
          this.$notify.error({
            title: '错误',
            message: `错误代码${res.status}`
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.table-expand {
    font-size: 0;
  }
  .table-expand label {
    width: 100px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
  }
  .gallery {
    width: 80px;
    margin-right: 10px;
  }
</style>


