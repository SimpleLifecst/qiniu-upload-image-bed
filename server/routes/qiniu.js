const express = require("express");
const router = express.Router(); // 路由模块
const qiniu = require("qiniu"); // 七牛云模块
const { SECRET_KEY, ACCESS_KEY } = require("../../config");

function getToken() {
  // 将getToken封装成函数，每次请求token将获取一个新的token
  const mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);
  const options = {
    scope: "github-test-cst", // 存储空间名称
    expires: 7200, // 过期时间
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  return putPolicy.uploadToken(mac);
}

router.get("/get-qiniu-token", (req, res) => {
  const token = getToken();

  res.send({
    status: 200,
    message: "上传凭证获取成功",
    token,
  });
});

module.exports = router;
