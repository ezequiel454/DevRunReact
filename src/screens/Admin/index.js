import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Header from './elements/Headers'
import Runs from './Runs.js'
import Users from './Users'
import EditUser from './EditUser'

const Home = () => <h1>Home admin</h1>

const Admin = props => {
  const auth = useSelector(state => state.auth)

  if (!auth.isAuth) {
    return <Redirect to='/login' />
  }
  if (auth.user.role !== 'admin') {
    return <Redirect to='/restrito' />
  }
  return (
    <div>
      <Header />
      <Route exact path={`${props.match.path}`} component={Home} />
      <Route exact path={`${props.match.path}/users/:id/edit`} component={EditUser} />
      <Route exact path={`${props.match.path}/users`} component={Users} />
      <Route path={`${props.match.path}/runs`} component={Runs} />
    </div>
  )
}

export default Admin
