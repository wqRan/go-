import PropTypes from 'prop-types'
import React, { Component } from 'react';
import {Link,NavLink} from 'react-router-dom';
import {
  Button,
  Container,
  Header,
  Icon,
} from 'semantic-ui-react'

const Welcome = ({ mobile }) => (
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
    <Button primary size='huge'>
      进入后台
      <Icon name='right arrow' />
    </Button>
  </Container>
)


class DesktopContainer extends Component {

  render() {
    return (      
              <Welcome></Welcome>         
    )
  }
}

export default Welcome
