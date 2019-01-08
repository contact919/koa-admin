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
      <img v-if="imgUrl" :src="imgUrl" class="avatar">
      <i v-else class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>

    <div class="btn-deco">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="handleChange">确定</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken, getMgr, setMgr } from '@/utils/auth'
import uploadPath from '@/api/upload'
import { SetAvatar } from '@/api/mgr'

export default {
  data() {
    return {
      uploadPath,
      imgUrl: ''
    }
  },
  computed: {
    ...mapGetters([
      'mgr'
    ]),
    headers() {
      return {
        'authorization': `Bearer ${getToken()}`
      }
    }
  },
  created() {
    this.imgUrl = this.mgr.avatar
  },
  methods: {
    uploadPicUrl(res) {
      this.imgUrl = res.file
    },
    cancel() {
      this.imgUrl = this.mgr.avatar
    },
    handleChange() {             //设置头像id从vuex获得 ，改密是通过get请求 解析jwt token获得id，都可以
      SetAvatar({id:this.mgr.id, avatar: this.imgUrl}).then(res => {
        if (res.status === 200) {
          this.$store.dispatch('SetMgr',{id:this.mgr.id, username:this.mgr.name, avatar: this.imgUrl})
          let str = getMgr()
          str.avatar = this.imgUrl
          setMgr(str) 
          
          this.$notify.success({
            title: '成功',
            message: '设置成功'
          })
        }
      })
      

      return
      this.$refs['dataForm'].validate((valid) => {
        if (!valid) {
          return
        }
        SetPwd(this.dataForm).then(res => {
          console.log(res);
          if (res.status === 200) {
            if (res.data.data && res.data.data.code === -18) {
              this.$message.error('原密码错误')
            }else{
              this.$notify.success({
                title: '成功',
                message: '修改密码成功'
              })
            }
          }
        })
      })
    }
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
      margin: 14px 141px 16px;
      border-radius: 10px;
  }
  .btn-deco{
    margin-left: 40px;
    margin-top: 20px;
  }
</style>

