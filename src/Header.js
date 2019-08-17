import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Menu, Image } from 'semantic-ui-react'

const Header = () => {
  const auth = useSelector(state => state.auth)

  if (auth.isAuth) {
    if (auth.user.role === 'admin') {
      return <Redirect to='/admin' />
    } else {
      return <Redirect to='/restrito' />
    }
  }
  return (
    <Menu>
      <Menu.Item as={Link} to='/'><Image src={'/logo.png'} size='small' /></Menu.Item>
      <Menu.Item as={Link} to='/'>Home</Menu.Item>
      <Menu.Item as={Link} to='/admin'>Admin</Menu.Item>
      <Menu.Item as={Link} to='/create-account'>Create Account</Menu.Item>
      <Menu.Item as={Link} to='/login'>Login</Menu.Item>
    </Menu>
  )
}

export default Header
