import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

test('renders content', () => {
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

  window.localStorage.setItem('loggedBlogAppUser', JSON.stringify({ username: 'reon150' }))

  console.log(blog)

  const component = render(
    <Blog blog={blog} />
  )

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent('Component testing')
  expect(div).toHaveTextContent('Ronald Ogando')
  expect(div).not.toHaveTextContent('https')
  expect(div).not.toHaveTextContent('176')
  expect(div).not.toHaveTextContent('Emilio Negron')
  expect(div).not.toHaveTextContent('reon150')
})