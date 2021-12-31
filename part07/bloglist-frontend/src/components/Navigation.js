import React from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { removeUser } from '../reducers/userReducer'

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)


  const handleLogout = () => {
    dispatch(removeUser(user))
  }

  return (
    <Navbar>
      <Container>
        <Nav className='me-auto'>
          <LinkContainer to='/'>
            <Nav.Link>blogs</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/users'>
            <Nav.Link>users</Nav.Link>
          </LinkContainer>
          <span>
            {user.name} logged in <Button variant='danger' onClick={handleLogout}>logout</Button>
          </span>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Navigation
