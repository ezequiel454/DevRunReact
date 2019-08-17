import React, { useEffect } from 'react'
import ActionCreators from '../../redux/actionCreators'
import { Table, Button, Segment, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import Duration from '../elements/Duration'
import Distance from '../elements/Distance'
import DateStr from '../elements/DateStr'

import { useSelector, useDispatch } from 'react-redux'

const Runs = () => {
  const runs = useSelector(state => state.runs)
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const load = () => {
    dispatch(ActionCreators.getRunsRequest(true))
  }

  const remove = (id) => {
    dispatch(ActionCreators.removeRunRequest(id))
  }

  useEffect(() => {
    load()
  }, [runs.data.length])

  const renderRun = (run) => {
    return (
      <Table.Row key={run.id}>
        <Table.Cell>
          {run.friendly_name}<br />
          <Label>{run.name}</Label>
        </Table.Cell>
        <Table.Cell>
          <Duration duration={run.duration} />
        </Table.Cell>
        <Table.Cell>
          <Distance distance={run.distance} metric={auth.user.unit} />
        </Table.Cell>
        <Table.Cell>
          <DateStr date={run.created} timezone={auth.user.timezone} />
        </Table.Cell>
        <Table.Cell>
          <Button basic color='red' onClick={() => remove(run.id)}>Delete</Button>
        </Table.Cell>
      </Table.Row>
    )
  }

  return (
    <div>
      <h1>Runs</h1>
      <Button as={Link} to='/restrito/create-run'>New run</Button>
      { runs.isLoading && <p>Loading...</p>}
      { !runs.isLoading && runs.data.length === 0 && <Segment color='blue'>No Data</Segment> }
      { !runs.isLoading && runs.data.length > 0 &&
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Duration</Table.HeaderCell>
            <Table.HeaderCell>Distance</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          { runs.data.map(renderRun) }
        </Table.Body>
      </Table> }
    </div>
  )
}

export default Runs
