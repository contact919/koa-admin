<template>
  <div class="app-container">
    <el-upload
      class="upload-demo"
      :action="uploadPath"
      :show-file-list="false"
      :headers="headers"
      :on-success="uploadPicUrl"
      drag
      accept=".jpg,.jpeg,.png,.gif">
      <img v-if="mgr.avatar" :src="mgr.avatar" class="avatar">
      <i v-else class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getMgr, setMgr } from '@/utils/auth'
import uploadPath from '@/api/upload'

export default {
  data() {
    return {
      uploadPath,
    }
  },
  computed: {
    ...mapGetters([
      'mgr'
    ]),
    headers() {
      return {
        'X-Litemall-Admin-Token': 12345
      }
    }
  },
  methods: {
    uploadPicUrl(res) {
      this.$store.dispatch('SetMgr',{avatar: res.file})

      let str = getMgr()
      str.avatar = res.file
      setMgr(str)
    },
  },
}
</script>

<style lang="scss" scoped>
  .upload-demo{
    width: 360px;
    margin-left: 40px;
  }
  .avatar{
      width: 76px;
      height: 76px;
      margin: 14px 0 16px;
      border-radius: 10px;
  }
</style>

