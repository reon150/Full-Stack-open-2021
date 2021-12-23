import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

const blog = {
  title: 'Component testing',
  author: 'Ronald Ogando',
  url: 'https',
}

test('the form calls the event handler it received as props with the right details when a new blog is created', () => {
  const createNewBlogMock = jest.fn()

  const component = render(<BlogForm createNewBlog={createNewBlogMock} />)

  const form = component.container.querySelector('form')
  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')

  fireEvent.change(titleInput, { target: { value: blog.title } })
  fireEvent.change(authorInput, { target: { value: blog.author } })
  fireEvent.change(urlInput, { target: { value: blog.url } })
  fireEvent.submit(form)

  expect(createNewBlogMock.mock.calls).toHaveLength(1)
  expect(createNewBlogMock.mock.calls[0][0].title).toBe(blog.title)
  expect(createNewBlogMock.mock.calls[0][0].author).toBe(blog.author)
  expect(createNewBlogMock.mock.calls[0][0].url).toBe(blog.url)
})