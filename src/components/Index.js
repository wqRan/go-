import React, { Component } from 'react';
import {HashRouter as Router,Link,NavLink,Route,Redirect,Switch} from 'react-router-dom';
import {
  Button,
  Container,
  Header,
  Icon,
  Menu,
  Responsive,
  Segment,
  Visibility,
} from 'semantic-ui-react'
import Welcome from "./Welcome"
import UserInfo from './UserInfo'
import ShowFrom from './ShowFrom'
import Login from './Login'
import Signup from './Signup'
import Add from './Add'
import Edit from './Edit'
import { connect } from 'react-redux'
import WebStorage from "react-webstorage"
var webStorage=new WebStorage(window.localStorage)


const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='欢迎来到go-潮信息管理系统'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '2.5em',
        fontWeight: 'normal',
        marginBottom: 0,
        paddingTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='Do whatever you want when you want to.'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <NavLink to="/showfrom">
      <Button primary size='huge'>进入后台<Icon name='right arrow' /></Button>
    </NavLink>  
        
  </Container>
)


class DesktopContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      name:webStorage.getItem('username'),
      login:''
    }
  }
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })
  delectUser(){
    if (webStorage.removeItem('username')) {      
        webStorage.removeItem('token')
        webStorage.removeItem('username')
    }
        window.location.reload()
  }

  handleClick=(e) =>{
    console.log(this.props)
  }
  render() {
    const { fixed } = this.state

    let username = null
    if (webStorage.getItem('username')) {
      username = <Button inverted={!fixed} >亲爱的管理员：{webStorage.getItem('username')}</Button>
    }else {
      username = <Button inverted={!fixed} >请登录！</Button>
    }

    let login = null
    if (webStorage.getItem('username')) {
      login = <div>
              <Route path="/welcome" exat component={Welcome}></Route>
              <Route path="/userinfo" exat  component={UserInfo}></Route>
              <Route path="/showfrom" exat component={ShowFrom}></Route>
              <Route path="/login" exat  component={Login}></Route>
              <Route path="/signup" exat component={Signup}></Route>
              <Route path="/add" exat component={Add}></Route>
              <Route path="/edit" exat component={Edit}></Route>
              <Redirect to="/welcome"></Redirect> 
              </div>      
    }else {
      login = <div>
              <Route path="/welcome" exat component={Welcome}></Route>
              <Route path="/userinfo" exat  component={Login}></Route>
              <Route path="/showfrom" exat component={Login}></Route>
              <Route path="/login" exat  component={Login}></Route>
              <Route path="/signup" exat component={Signup}></Route>
              <Redirect to="/welcome"></Redirect>
              </div>
    }

    return (
      
      <Responsive {...Responsive.onlyComputer}>
        <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu}>
          <Segment inverted textAlign='center' style={{ minHeight: 700, padding: '1em 0em' }} vertical>
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            > 
              <Container>
              
                <NavLink to="/welcome" className="item" activeClassName="active">首页</NavLink>
                <NavLink to="/userinfo" className="item" activeClassName="active">用户信息</NavLink>
                <NavLink to="/showfrom" className="item" activeClassName="active">童装信息</NavLink>
                <Menu.Item position='right'>
                  {username}&nbsp;&nbsp;&nbsp;
                  <Link to="/login"><Button inverted={!fixed}>Log in</Button></Link>
                  <Link to="/signup"><Button  inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>Sign Up</Button></Link>
                  &nbsp;&nbsp;<Button inverted={!fixed} onClick={()=>this.delectUser()}>Sign out</Button>
                </Menu.Item>
              </Container>
              
            </Menu>

              { login }

          </Segment>
        </Visibility>
      </Responsive>
    )
  }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    Verification:()=>{
       fetch('/api/users/issignin',{
        headers:{
        'X-Access-Token': webStorage.getItem('token')
        }
      })
      .then((response)=>response.json())
      .then((result)=>{
        console.log(result)
        
      })
    }
  }
}
class ResponsiveContainer extends Component {
  constructor(props){
    super(props)
  }
   componentDidMount(){
    this.props.Verification()
   // console.log(this.props)

  }
  render(){
    return (
      <Router>
          <DesktopContainer></DesktopContainer>
      </Router>
      )
  }
}
export default connect(mapDispatchToProps)(ResponsiveContainer)