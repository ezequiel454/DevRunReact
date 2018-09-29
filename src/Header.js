import React from 'react'
import { connect } from 'react-redux'
import ActionCreators from './redux/actionCreators'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

import { Menu, Image } from 'semantic-ui-react'

const Header = props => {
  if(props.auth.isAuth){
    if(props.auth.user.role === 'admin'){
      return <Redirect to='/admin' /> 
    }else{
      return <Redirect to='/restrito' />
    }
  }
  return (
    <Menu>
      <Menu.Item as={Link} to='/'><Image src={'/logo.png'} size='small'/></Menu.Item>
      <Menu.Item as={Link} to='/'>Home</Menu.Item>
      <Menu.Item as={Link} to='/admin'>Admin</Menu.Item>
      <Menu.Item as={Link} to='/create-account'>Create Account</Menu.Item>
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
