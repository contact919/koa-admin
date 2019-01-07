<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.sn" @keyup.enter.native="handleFilter" size="medium"  clearable class="filter-item" style="width: 200px;" placeholder="请输入订单编号"/>
      <el-select v-model="listQuery.status" size="medium" clearable style="width: 200px" class="filter-item" placeholder="请选择订单状态">
        <el-option v-for="i in statusMap" :key="i.value" :label="i.label" :value="i.value"/>
      </el-select>
      <el-button class="filter-item" type="primary"  size="medium"  icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" size="small" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" min-width="100" label="订单编号" prop="order_sn"/>
      <el-table-column align="center" label="用户姓名" prop="user_id"/>
      <el-table-column align="center" label="订单状态" prop="order_status">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.order_status | orderStatusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单金额" prop="order_price"/>
      <el-table-column align="center" label="下单时间" prop="add_time"/>
      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 订单详情 -->
    <el-dialog :visible.sync="orderDialogVisible" title="订单详情" width="800">
      <el-form :data="orderDetail" label-position="left">
        <el-form-item label="收货地址">
          <span>{{ orderDetail.order.address }}</span>
        </el-form-item>
        <el-form-item label="商品信息">
          <el-table :data="orderDetail.orderGoods" size="small" border fit highlight-current-row>
            <el-table-column align="center" label="商品名称" prop="goodsName" />
            <el-table-column align="center" label="商品编号" prop="goodsSn" />
            <el-table-column align="center" label="商品价格" prop="price" />
            <el-table-column align="center" label="商品图片" prop="picUrl">
              <template slot-scope="scope">
                <img :src="scope.row.picUrl" width="40">
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 分页 -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<style>

</style>

<script>
import { OrderList } from '@/api/order'
import Pagination from '@/components/Pagination'

export default {
  name: 'Order',
  components: { Pagination },
  filters: {
    orderStatusFilter(status) {
      return status == 100 ? "已完成" : "已取消"
    }
  },
  data() {
    return {
      list: undefined,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sn: '',
        status: ''
      },
      statusMap: [
        {
          value: '100',
          label: '已完成'
        }, {
          value: '200',
          label: '已取消'
        }
      ],
      orderDialogVisible: false,
      orderDetail: {
        order: {},
        user: {},
        orderGoods: []
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      OrderList(this.listQuery).then(res => {
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
    handleDetail(row) {
      this.orderDialogVisible = true
      return
      
      detailOrder(row.id).then(response => {
        this.orderDetail = response.data.data
      })
      this.orderDialogVisible = true
    }
  }
}
</script>
