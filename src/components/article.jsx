import React from 'react'
import { Divider,Spin } from 'antd'
import axios from 'axios'
import { connect } from 'react-redux'
import { recieveArticle } from '../redux/actions'
class Article extends React.Component {

    getData = () => {
        axios.get('/api/cc').then((res) => {
            this.refs.articleBody.innerHTML = res.data.content
            console.log(res.data)
        })
    }
    changeRedux = () => {

        //this.props.recieveTitle()
        console.log(this.props);
    }
    dealdate = (y = 0, m = 0, d = 0) => {
        //初始化时间
        if (this.props.article.create_time) {
            var date = new Date(parseInt(this.props.article.create_time))
            d = date.getDay() + 1; m = date.getMonth() + 1; y = date.getFullYear();
        }

        return `${y}年${m}月${d}日`

    }
    async componentDidMount() {
        const pathname = this.props.history.location.pathname
        const _id = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length)
        await this.props.recieveArticle(_id)
        this.refs.articleBody.innerHTML = this.props.article.content
        console.log(this.props);
    }
    render() {
        const time = this.dealdate()
        if (this.props.article.content) {
            return (
                <div>
                    <Divider>{`${time}`}</Divider>
                    <div ref='articleBody' className="articleBody"></div>

                </div>)
        }
        else {
            return (<Spin tip="Loading..."/>)
        }

    }
}
export default connect(
    state => ({ blog: state.blog, article: state.article }),
    { recieveArticle }
)(Article)
