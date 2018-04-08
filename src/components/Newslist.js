import React, {Component} from 'react'
import { Table, Icon, Button } from 'antd';
import {Link,NavLink,Route,Redirect} from 'react-router-dom';
import { connect } from 'react-redux'

// const columns = [
//   {
//     title: '商品图片',
//     dataIndex: 'comPic',
//     key: 'comPic',
//   },
//   {
//     title: '商品名称',
//     dataIndex: 'comName',
//     key: 'comName',
//   }, {
//     title: '商品价格',
//     dataIndex: 'comPrice',
//     key: 'comPrice',
//   }, {
//     title: '商品数量',
//     dataIndex: 'comNumber',
//     key: 'comNumber',
//   },{
//     title: '商品分类',
//     dataIndex: 'comCategory',
//     key: 'comCategory',
//   },{
//     title: '操作',
//     key: 'action',
//     render: (text, record) => (
//       <span>
//         <Button type="primary" onClick={() => this.handleEdit(text)}>编辑<Icon type="tool" /></Button>
//         <Button type="danger" onClick={() => handleClick(text)}>删除<Icon type="frown-o" /></Button>
//       </span>
//     ),
// }];

// const handleClick = (text)=>{
//     console.log(text)
//     fetch('/api/newslist/remove/'+text.key, {
//       method: 'GET'
//     })
//       .then((response) => response.json())
//       .then((result) => {
        
//         Form.dispatch({
//           type: 'SELECT_ONE',
//           id:text.key
//         })
        
//       })

// console.log(new Form())
// }


// const handleEdit = (text)=>{
//     console.log(text)
    // console.log(location.hash)
    // location.hash = '/edit'+text.key

    // this.handleEditList(text)
    // fetch('/api/newslist/edit/'+text.key, {
    //   method: 'GET'
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     if (result.data) {
    //        
    //        
    //     }
    //   })

     
    
// }



const mapStateToProps = (state) => {
  return {
    storeList: state.newslist
  }
}

const mapDispatchToProps = (dispatch) => {

  Form.dispatch = dispatch
  
  return {
    loadData: () => {

      dispatch(() => {
        fetch('/api/newslist/findAll/true')
          .then(response => response.json())
          .then(result => {
            dispatch({
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
      })
    }
  }
}

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns:[
        {
          title: '商品图片',
          dataIndex: 'comPic',
          key: 'comPic',
        },
        {
          title: '商品名称',
          dataIndex: 'comName',
          key: 'comName',
        }, {
          title: '商品价格',
          dataIndex: 'comPrice',
          key: 'comPrice',
        }, {
          title: '商品数量',
          dataIndex: 'comNumber',
          key: 'comNumber',
        },{
          title: '商品分类',
          dataIndex: 'comCategory',
          key: 'comCategory',
        },{
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <span>
              <NavLink to={"/edit/"+text.key}><Button type="primary">编辑<Icon type="tool" /></Button></NavLink>
              <Button type="danger" onClick={() => this.handleClick(text)}>删除<Icon type="frown-o" /></Button>
            </span>
          ),
      }]
    }
  }

handleClick(text){

    fetch('/api/newslist/remove/'+text.key, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((result) => {
        
        Form.dispatch({
          type: 'SELECT_ONE',
          id:text.key
        })
        
      })
}

  componentDidMount() {
    this.props.loadData()
  }


  render() {
    return (
      <Table
        columns={this.state.columns}
        pagination={{
          defaultPageSize: 3
        }}
        dataSource={this.props.storeList} />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
// export default Form