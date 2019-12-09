import {
    getBlog_title,
    getBlog_article,
    getdata_Search
} from '../api/axiosFn'
//blog
const recieveList = (listdata)=>({type: 'RecieveList',data:listdata})
export function recieveTitle (){
    return async dispatch=>{
        const res = await getBlog_title();
        //res.data.length = 3
        dispatch(recieveList(res.data))

    }
}
//article
export const recieveBlog = (articledata)=>({type: 'RecieveArticle',data:articledata})
export const resetArticle = ()=>({type: 'ResetArticle'})

export function recieveArticle(id){
    return async dispatch=>{
        const res = await getBlog_article(id);
        dispatch(recieveBlog(res.data))
    }
}
//searchdata
export const recieveSearch=(searchdata)=>({type:'RecieveSearchData',data:searchdata})
export function recieveSearchData(title){
    return async dispatch=>{
        
        const res = await  getdata_Search(title);
        console.log(res)
        dispatch(recieveSearch(res.data))
    }
}
