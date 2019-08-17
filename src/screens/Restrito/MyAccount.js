import React, { useEffect, useState } from 'react'
import ActionCreators from '../../redux/actionCreators'
import { useSelector, useDispatch } from 'react-redux'

import { Button, Segment, Form } from 'semantic-ui-react'

import timezones from 'moment-timezone/data/meta/latest.json'

const MyAccount = () => {
  const auth = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const save = (user) => {
    dispatch(ActionCreators.updateProfileRequest(user))
  }

  const reset = () => {
    dispatch(ActionCreators.updateProfileReset())
  }

  const [unit, setUnit] = useState('')
  const [timezone, setTimezone] = useState('')
  const [controll, setControll] = useState(false)

  useEffect(() => {
    setUnit(auth.user.unit)
    setTimezone(auth.user.timezone)
    reset()
  }, [controll])

  const handleSave = () => {
    save({
      unit,
      timezone,
      id: auth.user.id
    })
    setControll(true)
  }
  return (
    <div>
      <h1>My Account</h1>
      {
        auth.saved && <Segment color='green'>Changed with success!</Segment >
      }
      { !auth.saved &&
      <Form>
        <select value={unit} onChange={e => setUnit(e.target.value)}>
          <option value='metric'>Metric (km)</option>
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
        <Button onClick={handleSave}>Save</Button>
      </Form>
      }

    </div>
  )
}

export default MyAccount
