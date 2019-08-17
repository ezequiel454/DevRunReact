import React, { useEffect, useState } from 'react'
import ActionCreators from '../../redux/actionCreators'
import { useSelector, useDispatch } from 'react-redux'

import { Button, Segment, Form } from 'semantic-ui-react'

import { Link } from 'react-router-dom'
import Api from '../../service/Api'

const api = new Api()

const EditUser = props => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [controll, setControl] = useState(false)

  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  const save = user => {
    dispatch(ActionCreators.updateUserRequest(user))
  }

  const reset = () => {
    dispatch(ActionCreators.updateUserReset())
  }

  const loadTwo = async (id) => {
    const { data } = await api.getUser(id)
    setName(data.name)
    setEmail(data.email)
    setRole(data.role)
  }

  useEffect(() => {
    reset()
    loadTwo(props.match.params.id)
  }, [controll])

  const handleSave = () => {
    save({
      id: props.match.params.id,
      name,
      email,
      role
    })
    setControl(true)
  }

  if (users.saved) {
    return (
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
      { !users.saved &&
      <Form>
        <Form.Field>
          <label>Name:</label>
          <input type='text' value={name} onChange={e => setName(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>E-mail:</label>
          <input type='email' value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value='admin'>Admin</option>
            <option value='user'>User</option>
          </select>
        </Form.Field>
        <div>
          <Button onClick={handleSave}>Update</Button>
        </div>
      </Form>
      }
    </div>
  )
}

export default EditUser
