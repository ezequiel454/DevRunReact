import React, { useState, useEffect } from 'react'
import ActionCreators from '../../redux/actionCreators'
import { useSelector, useDispatch } from 'react-redux'

import { Button, Segment, Form } from 'semantic-ui-react'

const ChangePass = () => {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const save = user => {
    dispatch(ActionCreators.updateProfileRequest(user))
  }

  const reset = () => {
    dispatch(ActionCreators.updateProfileReset())
  }

  const [passwd, setPasswd] = useState('')
  const [passwd2, setPasswd2] = useState('')
  const [error, setError] = useState('')
  const [controll, setControll] = useState(false)

  useEffect(() => {
    reset()
  }, [controll])

  const handleSave = () => {
    if (passwd !== passwd2) {
      setError('equal')
    } else if (passwd.length < 6) {
      setError('length')
    } else {
      setError('')
      save({
        passwd,
        id: auth.user.id
      })
      setControll(true)
    }
  }
  return (
    <div>
      <h1>Change Password</h1>
      {
        error === 'equal' && <Segment color='red'>The password must be equals</Segment >
      }
      {
        error === 'length' && <Segment color='red'>The password must have more then 6 characters</Segment >
      }
      {
        auth.saved && <Segment color='green'>Password changed with success!</Segment >
      }
      { !auth.saved &&
      <Form>
        <Form.Field>
          <label>New Password</label>
          <input type='password' value={passwd} onChange={e => setPasswd(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Confirm Password</label>
          <input type='password' value={passwd2} onChange={e => setPasswd2(e.target.value)} />
        </Form.Field>
        <Button onClick={handleSave}>Change Password</Button>
      </Form>
      }
    </div>
  )
}

export default ChangePass
