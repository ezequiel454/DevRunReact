import React from 'react'
import { connect } from 'react-redux'
import ActionCreators from '../../../redux/actionCreators'
import { Link } from 'react-router-dom'

import { Menu, Dropdown, Image } from 'semantic-ui-react'

const Header = props => {
  return (
    <Menu>
      <Menu.Item as={Link} to='/'><Image src={'/logo.png'} size='small'/></Menu.Item>
      <Menu.Item as={Link} to='/admin'>Home</Menu.Item>
      <Menu.Item as={Link} to='/admin/users'>Users</Menu.Item>
      <Menu.Item as={Link} to='/admin/runs'>Runs</Menu.Item>
      <Menu.Menu position='right'>
        <Dropdown item text={props.auth.user.name}>
          <Dropdown.Menu>
            { props.auth.user.role === 'admin' && <Dropdown.Item as={Link} to='/restrito'>Restricted</Dropdown.Item> }
            <Dropdown.Item as={Link} to='/restrito/my-account'>My Account</Dropdown.Item>
            <Dropdown.Item as={Link} to='/restrito/change-pass'>Change Password</Dropdown.Item>
            <Dropdown.Item onClick={props.logout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
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
    signin: (email, senha) => dispatch(ActionCreators.signinRequest(email, senha)),
    logout: () => dispatch(ActionCreators.destroyAuthRequest())

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
