import { combineReducers } from 'redux'

const initList = {
    FrontEndNotes: [{
        _id: '',
        title: '',
        create_time: ''
    }],
    PersonalNotes: [{
        _id: '',
        title: '',
        create_time: ''
    }],
    Recommends: [{
        _id: '',
        title: '',
        create_time: ''
    }]

}
const initArticle = {
    title: '',
    content: '',
    type: '',
    create_time: ''
}
const initSearch = {
    Lists:[{
        _id: "",
        title: "",
        create_time: "",
        type: ""
    }]
}
function blog(state = initList, action) {
    switch (action.type) {
        case 'RecieveList':
            return {
                FrontEndNotes: [
                    ...action.data.FrontEnd
                ],
                PersonalNotes: [
                    ...action.data.Personal
                ],
                Recommends: [
                    ...action.data.Recommend
                ]
            }
        case 'RecieveTitle':
            return {
                ...initArticle
            }
        default:
            return state
    }

}
function article(state = initArticle, action) {
    
    switch (action.type) {
        case 'RecieveArticle':
            return {
                ...action.data
            }
        case 'ResetArticle':
            return {
                ...initArticle
            }
        default:
            return state
    }
}
function searchdata(state=initSearch,action){
    
    switch(action.type){
        case 'RecieveSearchData':
            return {
                Lists: [...action.data]
            }
        default: 
            return state;
    }
}
const rootReducer = combineReducers({
    blog,
    article,
    searchdata
})

export default rootReducer