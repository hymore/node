// 导入模块
const http = require("http")
const router = require('./libs/router')
// 创建服务器
const server = http.createServer((request, response) => {
   
    router(request,response)
})
// 开启服务器监听
server.listen("4399", () => {
    console.log("ready")
})

