import axios from 'axios'
export function getBlog_title(){
    return axios.get('/api/list')
}
export function getBlog_article(id){
    return axios.get('/api/article',{
        params:{
            _id: id
        }
    })
}
export function getdata_Search(title){
    return axios.get('/api/search',{
        params:{
            title: title
        }
    })
}