import React,{Component} from 'react'
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'
import logo from "../image/title5.png";



class SignupForm extends Component {

  state = { username: '', password: '' }
  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state
    this.setState({ username, password })


    fetch('/api/users/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state)
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if (result.data.success) {
          this.props.history.push('/login')
        }
      })

  }

  render(){
    return(
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
              <Image src={logo} style={{ background: '#fff' }}/>
              {' '}注册go潮吧
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
                  <Button color='teal' fluid size='large'>注册</Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }


}
export default SignupForm
