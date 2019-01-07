<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <div class="logo__img__parent"><img class="pic__logo" :src="img_slider_logo" alt="logo"></div>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#eee"
      active-text-color="#409EFF"
    >
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import img_slider_logo from './../../../../assets/slider_images/logo.png'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  mounted() {
    console.log(this.$router.options)
  },
  data() {
    return {
      img_slider_logo
    }
  }
}
</script>
