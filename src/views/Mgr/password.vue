<template>
  <div class="app-container">
    <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
      <el-form-item label="帐号">
        <el-input v-model="username" disabled/>
      </el-form-item>
      <el-form-item label="原密码" prop="oldPassword">
        <el-input v-model="dataForm.oldPassword" type="password"/>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="dataForm.newPassword" type="password" auto-complete="off"/>
      </el-form-item>
      <el-form-item label="确认密码" prop="newPassword2">
        <el-input v-model="dataForm.newPassword2" type="password" auto-complete="off"/>
      </el-form-item>
    </el-form>
    <div style="margin-left:100px;">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="change">确定</el-button>
    </div>
  </div>
</template>

<script>
import { Info, ChangePwd } from '@/api/mgr'

export default {
  name: 'password',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.dataForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      username: '',
      dataForm: {
        id: '',
        oldPassword: '',
        newPassword: '',
        newPassword2: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '旧密码不能为空', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '新密码不能为空', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        newPassword2: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUsrInfo(this.$store.state.token)
  },
  methods: {
    getUsrInfo(token) {
      Info(token).then(res => {
        this.username = res.data.data.username
        this.dataForm.id = res.data.data.id
      })
    },
    cancel() {
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
      })
    },
    change() {
      this.$refs['dataForm'].validate((valid) => {
        if (!valid) {
          return
        }
        ChangePwd(this.dataForm).then(res => {
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
  }
}
</script>
