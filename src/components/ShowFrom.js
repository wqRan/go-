import React,{Component} from 'react'
import { Button, Icon,Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';
import { Input } from 'antd';
import 'semantic-ui-css/semantic.min.css';
import 'antd/dist/antd.css';
import Newslist from './Newslist'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'



const Search = Input.Search;

const mapStateToProps = (state) => {
  return {
    storeList: state.newslist
  }
}



class Role extends Component {
  static contextTypes = {
    store: PropTypes.object
  }
  constructor(props,context) {
    super(props)
    this.state = {
      message:'',
      sort:false
    }
    this.store = context.store
  }

  handleSearch(value){
    fetch('/api/newslist/search/'+value, {
      method: 'POST'
    })
      .then((response) => response.json())
      .then((result) => {
        this.store.dispatch({
            type: 'LOAD',
            list: result.data.map(({_id,comName,comPic,comPrice,comNumber,comCategory}) => ({
              key: _id,
              comPic:<img width='50' height='50' src={'http://localhost:8000/uploads/'+comPic} />,
              comName,
              comPrice,
              comNumber,
              comCategory
            }))
          })
      })
  }

  handleItemSort(){
    fetch('/api/newslist/findAll/'+this.state.sort)
      .then(response => response.json())
      .then(result => {
        this.store.dispatch({
          type: 'LOAD',
          list: result.data.map(({_id,comName,comPic,comPrice,comNumber,comCategory}) => ({
            key: _id,
            comPic:<img width='50' height='50' src={'http://localhost:8000/uploads/'+comPic} />,
            comName,
            comPrice,
            comNumber,
            comCategory
          }))
        })
        this.setState({
          sort:!this.state.sort
        })
      })
  }

  handleDelect(){
    console.log(this.props.storeList)
    const arr = this.props.storeList.slice(0,3)
    const id = []
    arr.map((item) => {
      id.push(item.key)
    })
    id.map((item) => {  
      
      fetch('/api/newslist/remove/'+item, {
        method: 'GET'
      })
        .then((response) => response.json())
        .then((result) => {
          this.store.dispatch({
            type: 'SELECT_ONE',
            id:item
          })
        })
    })
    console.log(id)

  }


  render() {
    const  propsObjs =this.props;

    const { activeItem } = this.state;
    return (
      <div>

        <div id="page-title">
          <h1 className="page-header text-overflow">商品信息管理</h1>
        </div>

       <div style={{paddingLeft:"10px",paddingRight:"10px"}}>
         <Menu>
           <Menu.Item
             name='editorials'
             active={activeItem === 'editorials'}
             onClick={this.handleItemClick}
           >
             <NavLink to="/add"><Button inverted color='purple'>添加&nbsp;&nbsp;&nbsp;<Icon disabled name='plus' style={{color:"#000"}}/></Button></NavLink>
             
           </Menu.Item>

           <Menu.Item
             name='reviews'
             active={activeItem === 'reviews'}
             onClick={()=>this.handleItemSort()}
           >
            <Button inverted color='violet'>排序&nbsp;&nbsp;&nbsp;<Icon disabled name='location arrow' style={{color:"#000"}}/></Button>
           </Menu.Item>

           <Menu.Item
             name='upcomingEvents'
             active={activeItem === 'upcomingEvents'}
             onClick={()=>this.handleDelect()}
           >
            <Button inverted color='red'>批量删除&nbsp;&nbsp;&nbsp;<Icon disabled name='remove' style={{color:"#000"}}/></Button>
             
           </Menu.Item>
           <Search
              placeholder="input search text"
              style={{ width: 400,height:'60%',marginTop:14,marginLeft:50 }}
              onSearch={(value )=> this.handleSearch(value)}
            />
         </Menu>
         <Newslist />
       </div>
      </div>
    )
  }
}
// export default Role

export default connect(mapStateToProps, null)(Role)