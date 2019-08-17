import React, { useEffect } from 'react'
import ActionCreators from '../../redux/actionCreators'
import { useSelector, useDispatch } from 'react-redux'

import { Table, Button, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  const load = () => {
    dispatch(ActionCreators.getUsersRequest())
  }

  const remove = (id) => {
    dispatch(ActionCreators.removeUserRequest(id))
  }
  useEffect(() => {
    load()
  }, [users.data.length])

  const renderUser = (user) => {
    return (
      <Table.Row key={user.id}>
        <Table.Cell>
          {user.name}
        </Table.Cell>
        <Table.Cell>
          {user.email}
        </Table.Cell>
        <Table.Cell>
          {user.role}
        </Table.Cell>
        <Table.Cell>
          <Button basic color='blue' as={Link} to={`/admin/users/${user.id}/edit`}>Edit</Button>
          <Button basic color='red' onClick={() => remove(user.id)}>Delete</Button>
        </Table.Cell>
      </Table.Row>
    )
  }

  return (
    <div>
      <h1>Users</h1>
      { users.isLoading && <p>Loading...</p>}
      { !users.isLoading && users.data.length === 0 && <Segment color='blue'>No Data</Segment> }
      { !users.isLoading && users.data.length > 0 &&
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          { users.data.map(renderUser) }
        </Table.Body>
      </Table> }
    </div>
  )
}

export default Users
