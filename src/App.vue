<template>
  <div class="App">
    <el-upload class="avatar-uploader" :action="domain" :http-request="uploadImage" :show-file-list="false">
      <el-button :loading="loading">上传图片</el-button>
    </el-upload>

    <el-image :src="imageUrl" fit="fill"></el-image>
  </div>
</template>
<script>
import axios from "axios";
const { DOMAIN, EXTERNAL_DOMAIN } = require('../config')

export default {
  data() {
    return {
      domain: DOMAIN,
      externalDomain: EXTERNAL_DOMAIN,
      imageUrl: sessionStorage.getItem('bg-images') || '',
      loading: false
    }
  },
  methods: {
    async uploadImage(content) {
      this.loading = true

      // 重命名要上传的文件
      const fileName = +new Date() + content.file.name;

      const res = await axios("/api/get-qiniu-token").then(res => {
        // 从后端获取上传凭证token
        const formData = new FormData()
        formData.append('file', content.file)
        formData.append('token', res.data.token)
        formData.append('key', fileName)
        /*
        * 另外一种常见的媒体格式是上传文件之时使用的：
        * multipart/form-data ： 需要在表单中进行文件上传时，就需要使用该格式
        * */
        // 获取到凭证之后再将文件上传到七牛云空间

        return axios({
          url: this.domain,
          method: "POST",
          data: formData
        })
      })

      this.imageUrl = this.externalDomain + res.data.key;
      this.$message.success("更新背景成功");
      this.loading = false
      sessionStorage.setItem('bg-images', this.imageUrl)
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

.el-image {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
}

.avatar-uploader {
  position: fixed;
  z-index: 999;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.el-button {
  opacity: 0.6;
  padding: 25px;
}
</style>