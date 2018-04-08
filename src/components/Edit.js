import React,{Component} from 'react'
import {NavLink} from 'react-router-dom';
import { Form, Button, Upload, Icon } from 'antd';
const FormItem = Form.Item;



const props = {
  name: 'comPic',
  listType: 'picture',
  action: '/api/newslist/add'
}

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      comName: '',
      comPic:'',
      comPrice:'',
      comNumber:'',
      comCategory:''
    }
  }

  componentDidMount() {
    const hash = this.props.location.pathname.split('/')
    const Id = hash[2]
    const result = fetch('/api/newslist/item/'+Id, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((result) => {        
        this.setState({
          comName: result.data.comName,
          comPic:result.data.comPic,
          comPrice:result.data.comPrice,
          comNumber:result.data.comNumber,
          comCategory:result.data.comCategory
        })
      })

  }

    handleChange1(e) {
        this.setState({
            comName:e.target.value
        })
      } 
      handleChange2(e) {
        this.setState({
            comPic:this.file
        })
      } 
      handleChange3(e) {
        this.setState({
            comPrice:e.target.value
        })
      } 
      handleChange4(e) {
        this.setState({
            comNumber:e.target.value
        })
      } 
      handleChange5(e) {
        this.setState({
            comCategory:e.target.value
        })
      }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    const hash = this.props.location.pathname.split('/')
    const Id = hash[2]
    fetch('/api/newslist/edit/'+Id, {
      method: 'POST',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body: JSON.stringify(this.state)
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          this.props.history.push('/showfrom')
        }
      })
  }

 
  render() {
    // const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };

    let Pic = null
    if (this.state.comPic != this.file) {
      Pic = <img width='50' height='50' src={'http://localhost:8000/uploads/'+this.state.comPic} />
    }

    return (
      <Form onSubmit={this.handleSubmit}>
      {/*-------商品名称-------*/}
        <FormItem
          {...formItemLayout}
          label={(
            <span>商品名称</span>
          )}
          hasFeedback
        >
          <input value={this.state.comName} onChange={this.handleChange1.bind(this)}  id="showName" name="comName"/>
          
        </FormItem>
         {/*-------商品图片-------*/}
        <FormItem
          {...formItemLayout}
          label={(
            <span>商品图片</span> 
          )}
          hasFeedback
        >
              { Pic }
           <Upload {...props} onChange={this.handleChange2.bind(this)}>     
            <Button>
              <Icon type="upload" /> 请添加商品图片
            </Button>
          </Upload>
      
        </FormItem>
         {/*-------商品价格-------*/}
        <FormItem
          {...formItemLayout}
          label={(
            <span>商品价格</span>
          )}
          hasFeedback
        >   
            <input value={this.state.comPrice} onChange={this.handleChange3.bind(this)} name="comPrice"/>
        </FormItem>
         {/*-------商品数量-------*/}
        <FormItem
          {...formItemLayout}
          label={(
            <span>商品数量</span>
          )}
          hasFeedback
        >
            <input value={this.state.comNumber} onChange={this.handleChange4.bind(this)} name="comNumber"/>
        </FormItem>
         {/*-------商品分类-------*/}
        <FormItem
          {...formItemLayout}
          label={(
            <span>商品分类</span>
          )}
          hasFeedback
        >

        <input value={this.state.comCategory} onChange={this.handleChange5.bind(this)} name="comCategory"/>
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">提交修改</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <NavLink to="/showfrom"><Button type="danger" size="large">返回</Button></NavLink>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm
