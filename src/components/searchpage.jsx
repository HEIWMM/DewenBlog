import React from 'react'
import { List,Spin } from 'antd'
import { connect } from 'react-redux'
import { recieveSearchData } from '../redux/actions'
class Searchpage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            Lists:[],
            key: ''
        }
    }
    async componentDidMount() {
        const search = this.props.history.location.search
        const title = search.split('title=')[1]
        await this.props.recieveSearchData(title)
        const {Lists} = this.props.searchdata
        //const _lists = Lists.map((item)=>{})
        // this.setState({
        //     Lists: Lists
        // })
        console.log(this.props);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    }
    handleListTo=(id)=>{
        this.props.history.push('/article/' + id)
    }
    render() {
        const searchdata = this.props.searchdata
        const key = this.props.location.search.split('=')[1] 
        if(searchdata.Lists.length&&!searchdata.Lists[0]._id){
            return (<Spin tip="Loading..."/>)
        }
        return (
            <div className="searchpage">
                <List
                    size="large"
                    header={<b>检索结果页</b>}
                    footer={
                        <div style={{textAlign:"center"}}>
                            <i>{`共${searchdata.Lists.length}条结果`}</i>
                        </div>}
                    bordered
                    dataSource={searchdata.Lists}
                    renderItem={item => {
                        let _key = key
                        if(item.title.indexOf(key)== -1){
                            _key = key.charCodeAt()>91?key.toUpperCase():key.toLowerCase()
                        }
                        let nkey = `<b class='keyword'>${_key}</b>`
                        let _title = item.title.replace(_key,nkey)
                        //关键字变色            
                        return (<List.Item
                            style={{ cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                            onClick={item._id ? () => this.handleListTo(item._id) : null}
                        ><p dangerouslySetInnerHTML = {{ __html: _title }}></p></List.Item>)
                    }}
                />
                
            </div>)
    }
}
export default connect(
    state => ({ searchdata: state.searchdata }),
    { recieveSearchData }
)(Searchpage)
