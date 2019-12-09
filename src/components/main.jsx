import React from 'react'
import { Carousel, Tabs, List, Skeleton } from 'antd'
import { connect } from 'react-redux'
import { recieveTitle } from '../redux/actions'
const { TabPane } = Tabs;
const { Item } = List;
class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ActiveKey: '1',
            information: [
                {
                    id: 1,
                    title: '前端笔记',
                    type: 'FrontEndNotes',
                    list: [1, 2, 3]
                },
                {
                    id: 2,
                    title: '个人随记',
                    type: 'PersonalNotes',
                    list: [1, 2, 3]
                },
                {
                    id: 3,
                    title: '优质内容推荐',
                    type: 'Recommends',
                    list: [1, 2, 3]
                }
            ]
        }
    }
    handleafterChange = (index) => {

        this.setState({
            ActiveKey: parseInt(index) + 1 + ''
        })
    }
    handleTabClick = (index) => {
        this.setState({
            ActiveKey: parseInt(index) + ''
        })
        this.refs.carousel.goTo(index - 1)
    }
    handleListTo(id) {
        console.log(id)
        this.props.history.push('/article/' + id)
    }
    async componentDidMount() {
        await this.props.recieveTitle();
        const Lists = this.state.information.map((item) => {
            item.list = this.props.blog[item.type]
            return item
        })
        console.log(Lists)
        this.setState({
            information: Lists
        })
    }
    render() {
        return (
            <div className='MainComponent'>
                <Carousel ref='carousel' afterChange={this.handleafterChange}>
                    {this.state.information.map(item => {
                        return (<div key={item.id}><h3>{item.title}</h3></div>)
                    })}
                </Carousel>
                <Tabs onTabClick={this.handleTabClick} activeKey={this.state.ActiveKey}>
                    {this.state.information.map(item => {
                        return (
                            <TabPane tab={item.title} key={item.id}>
                                <List
                                    size="small"
                                    bordered
                                    dataSource={item.list}
                                    renderItem={
                                        item => {
                                            
                                            return (
                                                <Skeleton style={{marginTop:'10px'}} paragraph={{ rows: 1 }} 
                                                title={false} loading={!item.title} active>
                                                    <Item
                                                        style={{ cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                                                        onClick={item._id ? () => this.handleListTo(item._id) : null}>{item.title}</Item>
                                                </Skeleton>
                                            )
                                        }

                                    }
                                />
                            </TabPane>
                        )
                    })}
                </Tabs>
                <a className='SeeMore'>
                    >> see more
                </a>
            </div>

        )
    }
}
export default connect(
    state => ({ blog: state.blog }),
    { recieveTitle }
)(Main)
