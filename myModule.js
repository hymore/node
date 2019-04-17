const mysql = require('mysql')
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "test"
})

module.exports = (sql,callback)=>{

    connection.query(sql, function(error, results, fields) {
        if (error) throw error
        // console.log(results);
        // response.end(JSON.stringify(results))
        callback(results)
    })
}