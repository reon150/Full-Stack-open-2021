import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

const blog = {
  title: 'Component testing',
  author: 'Ronald Ogando',
  url: 'https',
  likes: 176,
  user: {
    username: 'reon150',
    name: 'Emilio Negron'
  }
}

test('only renders blog\'s title and author by default', () => {
  window.localStorage.setItem('loggedBlogAppUser', JSON.stringify({ username: 'reon150' }))

  const component = render(<Blog blog={blog} />)

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent('Component testing')
  expect(div).toHaveTextContent('Ronald Ogando')
  expect(div).not.toHaveTextContent('https')
  expect(div).not.toHaveTextContent('176')
  expect(div).not.toHaveTextContent('Emilio Negron')
  expect(div).not.toHaveTextContent('reon150')
})

test('the blog\'s url and number of likes are shown when the button controlling the shown details has been clicked', () => {
  const component = render(<Blog blog={blog} />)

  const button = component.getByText('view')
  console.log(prettyDOM(button)) //debug
  fireEvent.click(button)

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent('Component testing')
  expect(div).toHaveTextContent('Ronald Ogando')
  expect(div).toHaveTextContent('https')
  expect(div).toHaveTextContent('176')
})

test('if the like button is clicked twice, the event handler the component received as props is called twice', () => {
  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} increaseLike={mockHandler} />
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
})