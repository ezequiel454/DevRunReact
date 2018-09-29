import React, { Component } from 'react'
import ActionCreator from '../redux/actionCreators'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Form, Button } from 'semantic-ui-react'
import Header from '../Header'
/*
const pStyle = {
  fontSize: '100%',
  textAlign: 'center'
};
 */

//preciso do estado interno, transformar em classe
class Login extends Component {
  state = {
    form: {
      email: '',
      passwd: ''
    }
  }
  handleChange = fieldname => event => {
    const form = {
      ...this.state.form
    }                   
    form[fieldname] = event.target.value
    this.setState({ form })
    //console.log(fieldname, event.target.value)
  }
  login = () => {
    const { email, passwd } = this.state.form
    this.props.login(email, passwd)
  }
  render(){
    if(this.props.auth.isAuth){
      if(this.props.auth.user.role === 'admin'){
        return <Redirect to='/admin' /> 
      }else{
        return <Redirect to='/restrito' />
      }
    }
    return(
      <div >
        <Header />
        <h1>Login</h1>
        <Form>
          <Form.Field>
            <label>E-mail</label>
            <input type='text' value={this.state.form.email} onChange={this.handleChange('email')} />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input type='password' value={this.state.form.passwd} onChange={this.handleChange('passwd')} /> 
          </Form.Field>
          <Button onClick={this.login}>Loggin</Button>
          {
            this.props.auth.error && 
              <p>Login Failed</p>
          }
        </Form>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}
const mapDispatchToProps = dispatch => {
  return {
    login: (email, passwd) => dispatch(ActionCreator.signinRequest(email, passwd))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
