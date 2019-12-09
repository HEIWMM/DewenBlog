import React from 'react'
import {connect} from 'react-redux'
import { recieveArticle } from '../redux/actions'
class Example extends React.Component{
    render(){
        return (
        <div>
            
        </div>)
    }
}
export default connect(
    state=>({blog: state.blog,article:state.article}),
    { recieveArticle }
)(Example)
