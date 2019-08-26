import React, { useState } from 'react'
import ActionCreators from '../redux/actionCreators'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Form, Button } from 'semantic-ui-react'
import Header from '../Header'
/*
const pStyle = {
  fontSize: '100%',
  textAlign: 'center'
};
 */

// preciso do estado interno, transformar em classe
const Login = () => {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [passwd, setPassws] = useState('')

  const login = () => {
    dispatch(ActionCreators.signinRequest(email, passwd))
  }

  if (auth.isAuth) {
    if (auth.user.role === 'admin') {
      return <Redirect to='/admin' />
    } else {
      return <Redirect to='/restrito' />
    }
  }
  return (
    <div >
      <Header />
      <h1>Login</h1>
      { email }
      <Form>
        <Form.Field>
          <label>E-mail</label>
          <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type='password' value={passwd} onChange={e => setPassws(e.target.value)} />
        </Form.Field>
        <Button onClick={login}>Loggin</Button>
        {
          auth.error &&
          <p>Login Failed</p>
        }
      </Form>
    </div>
  )
}

export default Login
