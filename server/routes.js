
const BlogModel = require('./db.js').BlogModel
const express = require('express')
var router = express.Router()
function dealData(data){
    
}
router.get('/aa', (req, res) => res.send('RouterSuccess'))
router.get('/bb', (req, res) => {
    new BlogModel({
        title: 'title', 
        content: 'content', 
        type: 'FrontEnd', 
        create_time: Date.now() // 创建时间
    }).save((err, data)=>{
        if(data){
            res.send(data);
        }
        
    })
})
router.get('/list',(req, res)=>{
    BlogModel.find({},{__v:0,content:0},(err,data)=>{
        if(data){
            let BlogData= {
                FrontEnd:[],
                Personal:[],
                Recommend:[]
            }
            data.map((item)=>BlogData[item.type].push(item))
            res.send(BlogData)
        }
    })
})
router.get('/article',(req,res)=>{
    const {_id} = req.query
    BlogModel.findById(_id,{__v:0},(err,data)=>{
        if(data){
            res.send(data)
        }
    })
})
router.get('/search',(req,res)=>{
    const {title} = req.query
    const reg = new RegExp(title, 'i')
    BlogModel.find({title: {$regex: reg}},{__v:0,content:0},(err,data)=>{
        if(data){
            res.send(data)
        }
    })
})
module.exports = router
