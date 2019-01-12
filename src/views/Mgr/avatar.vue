<template>
  <div class="app-container">
    <div class="pan-info">
      <img :src="mgr.avatar" class="avatar">
      <el-button type="primary" class="btn-file" size="medium" @click="dialogVisible = true">选择文件 <i class="el-icon-document"></i></el-button>
    </div>
    <!-- dialog -->
    <el-dialog
      title="更换头像"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="beforeClose">
      <el-upload
        ref="upload"
        class="upload-demo"
        :action="uploadPath"
        :show-file-list="false"
        :headers="headers"
        :auto-upload="false"
        :on-change="fileChange"
        :before-upload="beforeUpload"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        drag
        accept=".jpg,.jpeg,.png,.gif">
        <img v-if="imgUrl" :src="imgUrl" class="pre-avatar">
        <i v-else class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" size="medium" @click="handleSubmit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken, removeToken, getMgr, setMgr } from '@/utils/auth'
import uploadPath from '@/api/upload'
import { SetAvatar } from '@/api/mgr'

export default {
  data() {
    return {
      uploadPath,
      imgUrl: '',
      dialogVisible: false,
      chgNum: 0,
      subNum: 0
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
    },
  },
  methods: {
    /**
     * 1、上传时用base64编码在前端预览,确定更换时再发送请求,后台返回路径并delete原图
     * 2、当触发n次el-upload的on-chang时 它会保留之前记录️🔪  在你submit手动上传时会连续触发n次before-upload on-success等事件
     *    其实我们只需要最后一次的chang事件: 在before-upload判断触发success的次数和change次数是否相等就OK了
     *    注意触发success时也会触发change事件 此时status是success 而change时是ready
     */
    fileChange(file, fileList) {
      if (file.status === 'ready') {
        this.chgNum++
        let reader =new FileReader()
        reader.readAsDataURL(file.raw)
        reader.onloadend = ()=>{
          this.imgUrl = reader.result
        }
      }
    },
    handleSubmit() {
      if (this.imgUrl === '') {
        this.$message.error('请上传文件')
        return
      }
      this.$refs.upload.submit()
    },

    beforeUpload(file) {
      this.subNum++
      if (this.subNum !== this.chgNum) return false   //stop upload
    },
    uploadSuccess(res,file, fileList) {
      this.imgUrl = res.file
      //id from vuex also can carry jwttoken by ajax 
      SetAvatar({id:this.mgr.id, avatar: this.imgUrl}).then(res => {
        if (res.status === 200) {
          this.$store.dispatch('SetMgr',{id:this.mgr.id, username:this.mgr.name, avatar: this.imgUrl})
          let str = getMgr()
          str.avatar = this.imgUrl
          setMgr(str) 

          this.beforeClose()
          this.$notify.success({
            title: '成功',
            message: '设置成功'
          })
        }
      })
    },
    uploadError(err) {
      this.$alert('身份过期，请重新登录', '未登录', {
        confirmButtonText: '确定',
        type: 'error'
      }).then(() => {
        removeToken()
        location.reload()
      })
    },

    beforeClose() {
      this.dialogVisible = false
      this.imgUrl = ''
    }
  },
}
</script>

<style lang="scss" scoped>
  .upload-demo{
    width: 360px;
    margin: 0 auto;
  }
  .pan-info{
    width: 300px;
  }
  .avatar{
    display: block;
    width: 150px;
    height: 150px;
    margin: 20px 70px 0;
    border-radius: 50%;
  }
  .btn-file{
    margin-left: 87px;
    margin-top: 50px;
  }
  .pre-avatar{
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