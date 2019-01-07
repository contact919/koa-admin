<template>
  <div class="app-container">

    <!-- 查询操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.mobile" @keyup.enter.native="handleFilter" size="medium" clearable class="filter-item" style="width: 200px;" placeholder="请输入用户手机"/>
      <el-input v-model="listQuery.name" @keyup.enter.native="handleFilter" size="medium" clearable class="filter-item" style="width: 200px;" placeholder="请输入用户名称"/>
      <el-button size="medium" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" size="small" element-loading-text="正在查询中..." border fit highlight-current-row>
      <el-table-column align="center" min-width="100px" label="用户姓名" prop="username"/>
      <el-table-column align="center" min-width="100px" label="手机号码(ID)" prop="mobile"/>
      <el-table-column align="center" min-width="80px" label="性别" prop="gender">
        <template slot-scope="scope">
          <el-tag >{{ genderDic[scope.row.gender] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="300px" label="收获地址" prop="address"/>
      <el-table-column align="center" min-width="200px" label="创建时间" prop="add_time" sortable/>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <!-- 回顶 -->
    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100" />
    </el-tooltip>
  </div>
</template>

<script>
import { CustList } from '@/api/cust'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import BackToTop from '@/components/BackToTop'

export default {
  name: 'UserAddress',
  components: { 
    Pagination,
    BackToTop 
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      genderDic: ['未知', '男', '女'],
      listQuery: {
        name: "",
        mobile: "",
        page: 1,
        limit: 20
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      // this.listLoading = true
      CustList(this.listQuery).then(res => {
        if (res.status === 200 && res.data.data) {
          console.log(res)
          this.list = res.data.data.rows
          this.total = res.data.data.count
          this.listLoading = false
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
  }
}
</script>
