import React, { Component } from 'react'
import ActionCreators from '../redux/actionCreators'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Segment, Form } from 'semantic-ui-react'

import timezones from 'moment-timezone/data/meta/latest.json'

class CreateAccount extends Component{   
    state = {
      name: '',
      email: '',
      passwd: '',
      passwd2: '',
      error: '',
      unit: 'metric',
      timezone: 'America/Sao_Paulo'
    }
    componentDidMount(){
        this.props.reset()
    }
    handleChange = fieldname => event => {
        this.setState({
            [fieldname]: event.target.value
        })
    }
    handleSave = () => {
        if(this.state.passwd !== this.state.passwd2){
            this.setState({
                error: 'equal'
            })
        }else if(this.state.passwd.length < 6){
            this.setState({
                error: 'length'
            })
        }else{
            this.setState({
                error: ''
            })
            this.props.save({
                name: this.state.name,
                email: this.state.email,
                unit: this.state.unit,
                timezone: this.state.timezone,
                passwd: this.state.passwd
            })
        }
    }
    render(){
        if(this.props.auth.isAuth){
            if(this.props.auth.user.role === 'admin'){
                return <Redirect to='/admin' /> 
            }else{
                return <Redirect to='/restrito' />
            }
        }
      return (
          <div>
              <h1>Create Account</h1>
              {
                this.props.auth.error && <Segment color='red'>{this.props.auth.errorMessage}</Segment >
              }
              {
                  this.state.error === 'equal' && <Segment color='red'>The password must be equals</Segment >
              }
              {
                  this.state.error === 'length' && <Segment color='red'>The password must have more then 6 characters</Segment >
              }
              {
                  this.props.auth.saved && <Segment color='green'>Account created!</Segment >
              }
              {   !this.props.auth.saved && 
                  <Form>
                      <Form.Field>
                          <label>Name</label>
                          <input type='text' value={this.state.name} onChange={this.handleChange('name')} />
                      </Form.Field>
                      <Form.Field>
                          <label>E-mail</label>
                          <input type='email' value={this.state.email} onChange={this.handleChange('email')} />
                      </Form.Field>
                      <Form.Field>
                          <label>New Password</label>
                          <input type='password' value={this.state.passwd} onChange={this.handleChange('passwd')} />
                      </Form.Field>
                      <Form.Field>
                          <label>Confirm Password</label>
                          <input type='password' value={this.state.passwd2} onChange={this.handleChange('passwd2')} />
                      </Form.Field>
                      <select value={this.state.unit} onChange={this.handleChange('unit')}>
                          <option value='metric'>Métrico (km)</option>
                          <option value='imperial'>Imperial (mi)</option>
                      </select>
                      <select value={this.state.timezone} onChange={this.handleChange('timezone')}>
                          {
                              Object
                                  .keys(timezones.zones)
                                  .map(tz => {
                                      return <option key={tz} value={tz}>{tz}</option>
                                  })
                          }
                      </select>
                      <Button onClick={this.handleSave}>Create Account</Button>
                  </Form>
              }
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
        save: (user) => dispatch(ActionCreators.createProfileRequest(user)),
        reset: () => dispatch(ActionCreators.createProfileReset())
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount)