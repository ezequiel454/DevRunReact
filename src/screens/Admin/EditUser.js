import React, { Component } from 'react'
import ActionCreators from '../../redux/actionCreators'
import { connect } from 'react-redux'

import { Button, Segment, Form } from 'semantic-ui-react'

import { Link } from 'react-router-dom'

class EditUser extends Component{   
    state = {
      name: '',
      email: '',
      role: '',
      error: '',
      prevPropsID: 0,
    }
    static getDerivedStateFromProps(newProps, prevState){
      if(newProps.users && newProps.users.user && newProps.users.user.name){
        const user = {}
        const u = newProps.users.user
        if(u.id !== prevState.id){
          if(u.name !== prevState.name){
            user.name = u.name
          }
          if(u.email !== prevState.email){
            user.email = u.email
          }
          if(u.role !== prevState.role){
            user.role = u.role
          }
          if(u.id !== prevState.id){
            user.id = u.id
          }
          return user
        }
      }
      return null
    }
    componentDidMount(){
      this.props.reset()
      this.props.load(this.props.match.params.id)
    }
    handleChange = fieldname => event => {
      this.setState({
        [fieldname]: event.target.value
      })
    }
    handleSave = () => {
      this.props.save({
        id: this.props.match.params.id,
        name: this.state.name,
        email: this.state.email,
        role: this.state.role
      })
    }
    render(){
      if(this.props.users.saved){
          return(
              <div>
                  <div>
                      <Segment color='green'>Created run with success!</Segment>
                  </div>
                  <div>
                      <Button as={Link} to='/admin/users'>Back</Button>
                  </div>
              </div>
          ) 
      }
      return (
          <div>
              <h1>Edit User</h1>
              { !this.props.users.saved && 
                  <Form>
                      <Form.Field>
                          <label>Name:</label>
                          <input type='text' value={this.state.name} onChange={this.handleChange('name')}/>
                      </Form.Field>
                      <Form.Field>
                          <label>E-mail:</label>
                          <input type='email' value={this.state.email} onChange={this.handleChange('email')}/>
                      </Form.Field>
                      <Form.Field>
                        <select value={this.state.role} onChange={this.handleChange('role')}>
                          <option value='admin'>Admin</option>
                          <option value='user'>User</option>
                        </select>
                      </Form.Field>
                      <div>
                          <Button onClick={this.handleSave}>Update</Button>
                      </div>
                  </Form>
              }
          </div>    
      )
    }                           
}       

const mapStateToProps = state => {
    return {
        users: state.users
    }
}    

const mapDispatchToProps = dispatch => {
    return {
        save: user => dispatch(ActionCreators.updateUserRequest(user)),
        reset: () => dispatch(ActionCreators.updateUserReset()),
        load: id => dispatch(ActionCreators.getUserRequest(id))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(EditUser)