const fs = require("fs")
const path = require("path")
const querystring = require("querystring")
const url = require("url")
const myModule = require("./../myModule")
module.exports = (request, response) => {
    // 获取请求的url
    let reqUrl = request.url
    const reqMethod = request.method
    // 获取全部数据 请求地址/list 请求方式get 请求数据无
    if (reqUrl === "/list" && reqMethod === "GET") {
        const sql = `select * from cq`
        // connection.query(sql, function(error, results, fields) {
        //     if (error) throw error
        //     // console.log(results);
        //     response.end(JSON.stringify(results))
        // })
        myModule(sql, results => {
            response.end(JSON.stringify(results))
        })

        // 查询英雄详情 请求地址/detail 请求方式get 请求数据id
    } else if (reqUrl.indexOf("/detail?id=") != -1 && reqMethod === "GET") {
        const id = url.parse(reqUrl, true).query.id
        const sql = `select * from cq where id = ${id} `
        myModule(sql, results => {
            response.end(JSON.stringify(results[0]))
        })
    } else if (reqUrl === "/addhero" && reqMethod === "POST") {
        let str = ""
        request.on("data", data => {
            str += data
        })
        request.on("end", () => {
            const data = querystring.parse(str)
            // console.log(data);
            const sql = `insert into cq (heroName,heroIcon) values('${
                data.heroName
            }' , '${data.heroIcon}')`
            // console.log(sql);
            myModule(sql, results => {
                response.end(
                    JSON.stringify({
                        msg: "数据添加成功",
                        code: 200
                    })
                )
            })
        })
    } else if (reqUrl.indexOf("/deletehero?id=") != -1 && reqMethod === "GET") {
        const id = url.parse(reqUrl, true).query.id
        sql = `delete from cq where id = ${id}`
        // console.log(sql);
        myModule(sql, results => {
            if (results.affectedRows > 0) {
                response.end(
                    JSON.stringify({
                        msg: "数据删除成功",
                        code: 200
                    })
                )
            } else {
                response.end(
                    JSON.stringify({
                        msg: "删除数据不存在",
                        code: 404
                    })
                )
            }
        })
    } else {
        //请求网页
        // 读取文件
        if (reqUrl.indexOf("/detail.html") != -1) {
            reqUrl = reqUrl.split("?")[0]
            // console.log(reqUrl)
        }
        fs.readFile(path.join(__dirname, "../views", reqUrl), (err, data) => {
            if (!err) {
                // 响应返回数据
                response.end(data)
            } else response.end("<h1>404 Not Found</h1>")
        })
    }
}
