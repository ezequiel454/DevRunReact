import React, { useEffect, useState } from 'react'
import ActionCreators from '../redux/actionCreators'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Segment, Form } from 'semantic-ui-react'

import timezones from 'moment-timezone/data/meta/latest.json'

const CreateAccount = () => {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const save = (user) => {
    dispatch(ActionCreators.createProfileRequest(user))
  }

  const reset = () => {
    dispatch(ActionCreators.createProfileReset())
  }

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [passwd, setPassws] = useState('')
  const [passwd2, setPassws2] = useState('')
  const [error, setError] = useState('')
  const [unit, setUnit] = useState('')
  const [timezone, setTimezone] = useState('')

  // componentDidMount(){
  //     reset()
  // }
  useEffect(() => {
    reset()
  })

  const handleSave = () => {
    if (passwd !== passwd2) {
      setError('equal')
    } else if (passwd.length < 6) {
      setError('length')
    } else {
      setError('')
      save({
        name,
        email,
        unit,
        timezone,
        passwd
      })
    }
  }
  if (auth.isAuth) {
    if (auth.user.role === 'admin') {
      return <Redirect to='/admin' />
    } else {
      return <Redirect to='/restrito' />
    }
  }
  return (
    <div>
      <h1>Create Account</h1>
      {
        auth.error && <Segment color='red'>{auth.errorMessage}</Segment >
      }
      {
        error === 'equal' && <Segment color='red'>The password must be equals</Segment >
      }
      {
        error === 'length' && <Segment color='red'>The password must have more then 6 characters</Segment >
      }
      {
        auth.saved && <Segment color='green'>Account created!</Segment >
      }
      { !auth.saved &&
      <Form>
        <Form.Field>
          <label>Name</label>
          <input type='text' value={name} onChange={e => setName(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>E-mail</label>
          <input type='email' value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>New Password</label>
          <input type='password' value={passwd} onChange={e => setPassws(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Confirm Password</label>
          <input type='password' value={passwd2} onChange={e => setPassws2(e.target.value)} />
        </Form.Field>
        <select value={unit} onChange={e => setUnit(e.target.value)}>
          <option value='metric'>Métrico (km)</option>
          <option value='imperial'>Imperial (mi)</option>
        </select>
        <select value={timezone} onChange={e => setTimezone(e.target.value)}>
          {
            Object
              .keys(timezones.zones)
              .map(tz => {
                return <option key={tz} value={tz}>{tz}</option>
              })
          }
        </select>
        <Button onClick={handleSave}>Create Account</Button>
      </Form>
      }
    </div>
  )
}

export default CreateAccount
