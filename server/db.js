const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Blog', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, '连接数据库失败'));
db.once('open', () => {
    console.log('连接成功');//成功连接
});
//定义blogs集合的文档结构
const blogSchema = mongoose.Schema({
    title: { type: String, required: true }, 
    content: { type: String, required: true }, 
    type: { type: String, required: true }, 
    create_time: { type: Number } // 创建时间
})
const model = {
    BlogModel: mongoose.model('Blog', blogSchema)
};

module.exports = model;