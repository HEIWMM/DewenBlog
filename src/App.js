import React from 'react';
import Main from './components/main'
import Article from './components/article'
import Searchpage from './components/searchpage'
import 'antd/dist/antd.css';
import './css/mainpage.scss'
import './css/mditor.min.css'
import { Layout, Menu, Icon, Breadcrumb, Avatar, Input, message, BackTop } from 'antd';
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { recieveBlog, resetArticle, recieveSearchData } from './redux/actions'
import Lifecount from './components/lifecount';
const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      width: 0
    }
  }

  componentDidMount() {
    var isbreak = window.innerWidth>991?0:1
    this.setState({
      isbreak: isbreak
    })
    
    this.props.history.listen((e) => {
      var pathname = e.pathname
      var arr = pathname.split('/')
      if (arr[1] != 'article') {
        this.props.resetArticle();
      }
      //console.log(e)
    })
  }
  handleReset = () => {
    this.props.resetArticle();
    this.props.history.replace('/');
  }
  async handleSearch(value) {
    if (value == '') {
      message.warn('请输入检索关键字', 2)
    }
    else {
      this.props.resetArticle();
      this.props.history.push('/searchpage?title=' + value);
      const search = this.props.history.location.search
      const title = search.split('title=')[1]
      await this.props.recieveSearchData(title)
    }

  }
  render() {
    return (
      <div className='hal'>
        <Layout
        >
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
              broken?this.setState({
                isbreak: 1
              }):
              this.setState({
                isbreak: 0
              })
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
              if(type == 'clickTrigger'){
                return 0;
              }
              collapsed?this.setState({
                isbreak: 1
              }):
              this.setState({
                isbreak: 0
              })
            }}
            style={{
              //overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              zIndex: 99,
              left: 0,
            }}
          >
            {/* <div className="logo"> */}
            <Search
              className="search"
              placeholder="search"
              onSearch={value => this.handleSearch(value)}
              style={{}}
            />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" onClick={() => this.props.history.replace('/')}>
                <Icon type="user" />
                <span className="nav-text">主页</span>
              </Menu.Item>
              <Menu.Item key="2" onClick={() => this.props.history.replace('/tools/lifecount')}>
                <Icon type="video-camera" />
                <span className="nav-text">人生小格</span>
              </Menu.Item>

            </Menu>
          </Sider>
          <Layout className='layout_b' style={!this.state.isbreak?{ marginLeft: 200 }:{}}>
            <BackTop>
            <Avatar className="gotop" size="large" src={require('./static/img/gotop.png')} />
            </BackTop>
            <Header style={{  }} >
              <Avatar size="large" src={require('./static/img/timg.jpg')} />
              <b style={{marginLeft:'20px'}}>DewenBlog</b>
            </Header>
            <Breadcrumb>
              <Breadcrumb.Item onClick={this.handleReset}>
                <Icon type="home" />
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span>{this.props.article.type}</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{this.props.article.title}</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ margin: '24px 16px 0' }} onScroll={(e) => console.log(e)}>
              <div style={{ position:'relative',marginBottom:0,padding: 24, background: '#fff', minHeight: 360 ,borderRadius:'6px'}}>

                <Switch>
                  <Route path="/main" component={Main} />
                  <Route path="/article" component={Article} />
                  <Route path="/searchpage" component={Searchpage} />
                  <Route path="/tools/lifecount" component={Lifecount} />
                  <Route component={Main} />
                </Switch>

              </div>
            </Content>
            {/* <Main/> */}
            {/* <Message/> */}
          </Layout>
        </Layout>
      </div>
    );
  }

}

export default connect(
  state => ({ blog: state.blog, article: state.article }),
  { recieveBlog, resetArticle, recieveSearchData }
)(App)

