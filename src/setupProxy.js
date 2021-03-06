const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(proxy("/api", {
        target: "http://localhost:5000" , //配置你要请求的服务器地址
        changeOrigin: true,
        pathRewrite:{
          '^/api': ''
        }
    }))
};
