module.exports = {
    publicPath: './',
    assetsDir: 'static',
    configureWebpack: {
        devServer: {
            before(app){
                app.get('/api/goods',function(req,res){
                    res.json({
                        code: 0,
                        list: [
                            { id: 1, text: "web全栈架构师", price: 1000 },
                            { id: 2, text: "python架构师", price: 2000 }
                        ]
                    })
                })
            }
        }
    }
}


// module.exports = {
//     publicPath: './',
//     assetsDir: 'static',
//     configureWebpack: {
//         devServer: {
//             before(app) {//相当于搭建了一个小型的服务器
//                 app.get("/api/getUsers", function (req, res) {
//                     res.json({
//                         code: 200,
//                         data: [{ id: 1, name: "bob", age: 23 }, { id: 2, name: "jack", age: 24 }]
//                     })
//                 })
//                 app.post("/api/setUsers", function (req, res) {
//                     res.json({
//                         code: 200,
//                         msg: "修改成功"
//                     })
//                 })
//             }
//         }
//     }
// }