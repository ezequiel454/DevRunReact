import React, { useState, useEffect } from 'react'
import ActionCreators from '../../redux/actionCreators'
import { useSelector, useDispatch } from 'react-redux'

import { Button, Segment, Form } from 'semantic-ui-react'

import InputMoment from 'input-moment'
import 'input-moment/dist/input-moment.css'
import moment from 'moment'
// import { Redirect } from 'react-router-dom';
// import momentTz from 'moment-timezone'
import { Link } from 'react-router-dom'

const CreateRun = () => {
  const auth = useSelector(state => state.auth)
  const runs = useSelector(state => state.runs)

  const dispatch = useDispatch()

  const create = run => {
    dispatch(ActionCreators.createRunRequest(run))
  }

  const reset = () => {
    dispatch(ActionCreators.createRunReset())
  }

  const [friendlyName, setFriendlyName] = useState('')
  const [duration, setDuration] = useState(0)
  const [distance, setDistancia] = useState(0)
  const [created, setCreated] = useState(moment())

  useEffect(() => {
    reset()
  }, [runs.data.length])

  const handleCreateAnother = () => {
    setFriendlyName('')
    setDuration(0)
    setDistancia(0)
    setCreated(moment())
    reset()
  }
  const handleSave = () => {
    const d = moment.tz(created, auth.user.timezone)
    const d2 = d.clone().utc().format('YYYY-MM-DD H:mm:ss')
    create({
      friendly_name: friendlyName,
      duration,
      distance: auth.user.unit === 'metric' ? distance : distance * 1.634,
      created: d2
    })
  }
  if (runs.saved) {
    return (
      <div>
        <div>
          <Segment color='green'>Created run with success!</Segment>
        </div>
        <div>
          <Button onClick={handleCreateAnother} >Create Other</Button>
          <Button as={Link} to='/restrito/runs'>Back</Button>
        </div>
      </div>
    )
  }
  return (
    <div>
      <h1>Create Run</h1>
      { !runs.saved &&
      <Form>
        <Form.Field>
          <label>Name:</label>
          <input type='text' value={friendlyName} onChange={e => setFriendlyName(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Duration in Seconds:</label>
          <input type='number' value={duration} onChange={e => setDuration(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Distance ({auth.user.unit === 'metric' ? 'Km' : 'mi'}):</label>
          <input type='number' value={distance} onChange={e => setDistancia(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Creation Date:</label>
          <input type='text' value={created.format('DD/MM/YYYY  H:mm:ss')} onChange={e => setCreated(e.target.value)} />
        </Form.Field>
        <InputMoment
          moment={created}
          onChange={val => setCreated(val)}
        />
        <div>
          <Button onClick={handleSave}>Create</Button>
        </div>
      </Form>
      }
    </div>
  )
}

export default CreateRun
