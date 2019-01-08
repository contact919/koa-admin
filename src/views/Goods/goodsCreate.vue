<template>
  <div class="app-container">
    <el-card class="box-card">
      <h3>商品介绍</h3>
      <el-form ref="goods" :rules="rules" :model="goods" label-width="150px">
        <el-form-item label="商品编号" prop="goods_sn">
          <el-input v-model="goods.goods_sn"/>
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="goods.name"/>
        </el-form-item>
        <el-form-item label="原价" prop="counter_price">
          <el-input v-model="goods.counter_price" placeholder="0.00">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="当前价格" prop="retail_price">
          <el-input v-model="goods.retail_price" placeholder="0.00">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="是否新品" prop="is_new">
          <el-radio-group v-model="goods.is_new">
            <el-radio :label="true">新品</el-radio>
            <el-radio :label="false">非新品</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload
            :action="uploadPath"
            :show-file-list="false"
            :headers="headers"
            :on-success="uploadPicUrl"
            class="avatar-uploader"
            list-type="picture-card"
            accept=".jpg,.jpeg,.png,.gif">
            <img v-if="goods.pic_url" :src="goods.pic_url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
        </el-form-item>
        <el-form-item label="宣传画廊">
          <el-upload
            :action="uploadPath"
            :limit="5"
            :headers="headers"
            :on-exceed="uploadOverrun"
            :on-success="uploadGalleryUrl"
            :on-remove="handleRemove"
            multiple
            accept=".jpg,.jpeg,.png,.gif"
            list-type="picture-card">
            <i class="el-icon-plus"/>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品简介">
          <el-input v-model="goods.brief"/>
        </el-form-item>

      </el-form>
    </el-card>

    <div class="op-container">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handlePublish">上架</el-button>
    </div>

  </div>
</template>

<script>
import { GoodsCreate } from '@/api/goods'
import uploadPath from '@/api/upload'

export default {
  name: 'goodsCreate',
  data() {
    return {
      uploadPath,
      goods: { pic_url: '', gallery: [], is_new: false },
      rules: {
        goods_sn: [{ required: true, message: '商品编号不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '商品名称不能为空', trigger: 'blur' }]
      },
    }
  },
  computed: {
    headers() {
      return {
        'X-Litemall-Admin-Token': 12345
      }
    }
  },
  methods: {
    uploadPicUrl: function(res) {
      console.log(res)
      this.goods.pic_url = res.file
    },
    uploadGalleryUrl(response, file, fileList) {    //画廊显示是直接读取的本地图片 未通过koa-static
      // if (response.errno === 0) {
        this.goods.gallery.push(response.file)
      // }
    },
    handleRemove: function(file, fileList) {
      for (let i = 0; i < this.goods.gallery.length; i++) {
        // 这里存在两种情况
        // 1. 如果所删除图片是刚刚上传的图片，那么图片地址是file.response.file
        //    此时的file.file虽然存在，但是是本机地址，而不是远程地址。
        // 2. 如果所删除图片是后台返回的已有图片，那么图片地址是file.file
        let url
        if (file.response === undefined) {
          url = file.file
        } else {
          url = file.response.file
        }
        if (this.goods.gallery[i] === url) {
          this.goods.gallery.splice(i, 1)
        }
      }
    },
    handlePublish: function() {
      this.$refs.goods.validate(valid => {
        if (valid) {
          GoodsCreate(this.goods).then(res => {
            console.log(res)
            if (res.status === 200) {
              this.$notify.success({
                title: '成功',
                message: '创建成功'
              })
              this.$router.push({ path: '/goodsList' })  
            }else{
              this.$notify.error({
                title: '错误',
                message: `创建失败！错误代码${res.status}`
              })
            }
          })
        }        
      })
    },
    handleCancel: function() {
      this.$router.push({ path: '/goodsList' })
    },
    uploadOverrun: function() {
      this.$message({
        type: 'error',
        message: '上传文件个数超出限制!最多上传5张图片!'
      })
    },
  }
}
</script>

<style lang="scss">
  .el-card {
    margin-bottom: 10px;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .input-new-keyword {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 146px;
    height: 146px;
    display: block;
  }
</style>