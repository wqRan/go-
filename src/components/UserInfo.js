import React,{Component} from 'react'

import { Table, Icon, Button } from 'antd';
import { connect } from 'react-redux'

const columns = [{
  title: '用户名',
  dataIndex: 'userName',
  key: 'userName',
  
}, {
  title: '性别',
  dataIndex: 'sex',
  key: 'sex',
}, {
  title: '注册时间',
  dataIndex: 'createTime',
  key: 'createTime',
}];

const mapStateToProps= (state) => {
  return {
      userInfoList:state.user
    }
}
const mapDispatchToProps= (dispatch)=>{
  return {
      LoadDate:()=>{
        dispatch(()=>{
           fetch('/api/clientuser/list')
           .then(response => response.json())
           .then(result => {
              console.log(result)
              dispatch({
                type: 'LoadUserInfo',
                list:result.data.map(({_id, userName, sex, createTime}) => ({
                  key: _id,
                  sex:sex,
                  createTime:createTime,
                  userName:userName
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
  }
  componentDidMount() {
    this.props.LoadDate()
  }
  render() {
    return (
      <Table columns={columns} 
             pagination={{
                defaultPageSize: 5
              }}
      dataSource={this.props.userInfoList} />
    )
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Form)