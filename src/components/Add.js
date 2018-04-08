import React from 'react'
import {NavLink} from 'react-router-dom';
import { Form, Input, Icon, Button, Upload, message } from 'antd';
const FormItem = Form.Item;

const props = {
  name: 'comPic',
  listType: 'picture',
  action: '/api/newslist/add'
}

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
  };


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });

    console.log(this.file)


    fetch('/api/newslist/add', {
      method: 'POST',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body: JSON.stringify(this.props.form.getFieldsValue())
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.ret) {
          this.props.form.setFieldsValue({
            comName: '',
            comPic: {}, 
            comPrice: '', 
            comNumber: '', 
            comCategory: ''
          })
        }
      })

  }
 

  render() {
    const { getFieldDecorator } = this.props.form;
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
          {getFieldDecorator('comName', {
            rules: [{ required: true, message: '请输入商品名称!' }],
          })(
            <Input prefix={<Icon type="cloud" style={{ fontSize: 13 }} />} placeholder="请输入商品名称" />
          )}
        </FormItem>
         {/*-------商品图片-------*/}
        <FormItem
          {...formItemLayout}
          label={(
            <span>商品图片</span> 
          )}
          hasFeedback
        >
          {getFieldDecorator('comPic', {
            rules: [{ required: true, message: '请添加商品图片!' }],
          })(
           <Upload
              {...props}
              
           >
            <Button>
              <Icon type="upload" /> 请添加商品图片
            </Button>
          </Upload>
          )}
        </FormItem>
         {/*-------商品价格-------*/}
        <FormItem
          {...formItemLayout}
          label={(
            <span>商品价格</span>
          )}
          hasFeedback
        >
          {getFieldDecorator('comPrice', {
            rules: [{ required: true, message: '请输入商品价格!' }],
          })(
            <Input prefix={<Icon type="cloud" style={{ fontSize: 13 }} />} placeholder="请输入商品价格" />
          )}
        </FormItem>
         {/*-------商品数量-------*/}
        <FormItem
          {...formItemLayout}
          label={(
            <span>商品数量</span>
          )}
          hasFeedback
        >
          {getFieldDecorator('comNumber', {
            rules: [{ required: true, message: '请输入商品数量' }],
          })(
            <Input prefix={<Icon type="database" style={{ fontSize: 13 }} />} placeholder="请输入商品数量" />
          )}
        </FormItem>
         {/*-------商品分类-------*/}
        <FormItem
          {...formItemLayout}
          label={(
            <span>商品分类</span>
          )}
          hasFeedback
        >
          {getFieldDecorator('comCategory', {
            rules: [{ required: true, message: '请输入商品所属分类' }],
          })(
            <Input prefix={<Icon type="cloud" style={{ fontSize: 13 }} />} placeholder="请输入商品所属分类" />
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">添加</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <NavLink to="/showfrom"><Button type="danger" size="large">返回</Button></NavLink>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm
