const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: false }))

const qiniu = require('./routes/qiniu');

app.use(qiniu);

app.listen(9090, () => {
  console.log('service started http://127.0.0.1:9090');
})
