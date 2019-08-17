import React from 'react'
import ActionCreators from '../../../redux/actionCreators'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Menu, Dropdown, Image } from 'semantic-ui-react'

const Header = props => {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(ActionCreators.destroyAuthRequest())
  }

  return (
    <Menu>
      <Menu.Item as={Link} to='/'><Image src={'/logo.png'} size='small' /></Menu.Item>
      <Menu.Item as={Link} to='/admin'>Home</Menu.Item>
      <Menu.Item as={Link} to='/admin/users'>Users</Menu.Item>
      <Menu.Item as={Link} to='/admin/runs'>Runs</Menu.Item>
      <Menu.Menu position='right'>
        <Dropdown item text={auth.user.name}>
          <Dropdown.Menu>
            { auth.user.role === 'admin' && <Dropdown.Item as={Link} to='/restrito'>Restricted</Dropdown.Item> }
            <Dropdown.Item as={Link} to='/restrito/my-account'>My Account</Dropdown.Item>
            <Dropdown.Item as={Link} to='/restrito/change-pass'>Change Password</Dropdown.Item>
            <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  )
}

export default Header
