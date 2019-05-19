<template>
  <div class="testList" @mousewheel="handleScroll">
    <table 
      v-loading.fullscreen.lock="loadding"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading">
      <colgroup>
        <col width="33%">
        <col width="33%">
        <col>
      </colgroup>
      <thead>
        <tr>
          <th>序号</th>
          <th>姓名</th>
          <th>性别</th>
        </tr>
      </thead>
      <tbody ref="tbody">
        <tr v-for="(item, index) in tableList" :key="index">
          <td>{{item.number}}</td>
          <td>{{item.name}}</td>
          <td>{{item.sex}}</td>
        </tr>
      </tbody>
    </table>
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
const ODD = {
  name: '李响',
  sex: '男'
}
const EVEN = {
  name: '新雅',
  sex: '女'
}
export default {
  name: 'UserAddress',
  components: { 
    Pagination,
    BackToTop 
  },
  data() {
    return {
      list: [],
      tableList: [],
      loadding: false,
      end: 0
    }
  },
  created () {
    [...Array(1000)].map((item, index) => {
      if (index % 2 === 0) {
        this.list.push({number: index,...EVEN});
      } else {
        this.list.push({number: index, ...ODD});
      }
    })
  },
  mounted () {
    // this.tableList = this.list.slice(0,100)
    this.$nextTick(() => {
      const visibleCount = Math.ceil(window.outerHeight / 35);
      const start = 0;
      this.end = start + visibleCount;
      console.log('initStrat:', start, 'initEnd:', this.end);
      this.tableList.push(...this.list.slice(start, this.end));
    })
  },
  methods: {
    updateVisibleData(scrollTop) {
      scrollTop = scrollTop || 0;
      //距离200px时滚动加载
      const visibleCount = Math.ceil(window.outerHeight / 35);
      this.tableList.push(...this.list.slice(this.end, this.end + 20));
      this.end +=20;
    },
    handleScroll () {
      if (this.tableList.length <= this.list.length) {
        const scrollTop = window.pageYOffset
        if (window.outerHeight -50 + scrollTop +200  >= this.$el.clientHeight) {
          this.updateVisibleData(scrollTop)
        }
      }
    }
  }
}
</script>

<style lang="scss">
.testList {
  padding: 30px;
  table {
    width: 100%;
    border-collapse: collapse;
  }
  table, th, td{
    text-align: center;
    border: 1px solid #ccc
  }

  th{
    height: 35px;
  }
  td {
    height: 35px;
  }
}
</style>

