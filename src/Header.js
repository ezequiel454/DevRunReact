import React from 'react'
import { connect } from 'react-redux'
import ActionCreators from './redux/actionCreators'
import { Link } from 'react-router-dom'

import { Menu, Image } from 'semantic-ui-react'

const Header = props => {
  return (
    <Menu>
      <Menu.Item as={Link} to='/'><Image src={'/logo.png'} size='small'/></Menu.Item>
      <Menu.Item as={Link} to='/'>Home</Menu.Item>
      <Menu.Item as={Link} to='/admin'>Admin</Menu.Item>
      <Menu.Item as={Link} to='/create-account'>Criar uma conta</Menu.Item>
      <Menu.Item as={Link} to='/login'>Login</Menu.Item>
    </Menu>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signin: (email, senha) => ActionCreators.signinRequest(email, senha)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
