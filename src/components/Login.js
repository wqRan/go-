import React,{Component} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import Logo from '../image/title5.png'
import WebStorage from "react-webstorage"

var webStorage=new WebStorage(window.localStorage)

class Login extends Component {
	state = { username: '', password: ''}
	handleChange = (e, { name, value }) => this.setState({ [name]: value })

	handleSubmit = (e) => {
		e.preventDefault();
	    const { username, password } = this.state
	    this.setState({ username,password})
	    fetch('/api/users/signin', {
		 method: 'POST',
	     headers: {'Content-Type':'application/json'},
	     body: JSON.stringify(this.state)
		})
		.then((response)=>response.json())
        .then((result)=> {
         if(result.data.success){
         	console.log(result.data)
         	webStorage.setItem('username', result.data.username)
         	webStorage.setItem('token',result.data.token)
         	this.props.history.push('/welcome')
         }
      })
	}
	render(){
		//const { name, email, submittedName, submittedEmail } = this.state
		return (
			<div className='login-form'>
    
			    <style>{`
			      body > div,
			      body > div > div,
			      body > div > div > div.login-form {
			        height: 100%;
			      }
			    `}</style>
			    <Grid
			      textAlign='center'
			      style={{ height: '100%' }}
			      verticalAlign='middle'
			    >
		      		<Grid.Column style={{ maxWidth: 450 }}>
		        		<Header as='h2' color='teal' textAlign='center'>
		          			 <Image src={Logo} style={{ background: '#fff' }} />
		         			登录Go潮吧~
		        		</Header>
				        <Form size='large' onSubmit={this.handleSubmit}>
			              <Segment stacked>
			                  <Form.Input
			                    fluid
			                    icon='user'
			                    iconPosition='left'
			                    placeholder='Username'
			                    name='username'
			                    onChange={this.handleChange}
			                  />
			                  <Form.Input
			                    fluid
			                    icon='lock'
			                    iconPosition='left'
			                    placeholder='Password'
			                    type='password'
			                    name='password'
			                    onChange={this.handleChange}
			                  />
			                  <Button color='teal' fluid size='large'>登录</Button>
			              </Segment>
            			</Form>

				        <Message>
				          新用户? <a href='#/signup'>注册</a>
				        </Message>
      				</Grid.Column>
    			</Grid>
  			</div>
			)
	}
}


export default Login


