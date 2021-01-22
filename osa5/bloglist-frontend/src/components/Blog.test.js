import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
test('initially author & title shown, extended view not shown', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    user: {
      name: 'name',
      username: 'username'
    },
    likes: 0
  }

  const currentUser = {
    name: 'name',
    username: 'username'
  }

  const component = render(<Blog blog={blog} currentUser={currentUser} />)

  const extendedView = component.container.querySelector('.toggledContent')

  expect(component.container).toHaveTextContent('title')
  expect(component.container).toHaveTextContent('author')
  expect(extendedView).toHaveStyle('display: none')
})

test('Extended view shown when button is pressed', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    user: {
      name: 'name',
      username: 'username'
    },
    likes: 0
  }

  const currentUser = {
    name: 'name',
    username: 'username'
  }

  const component = render(<Blog blog={blog} currentUser={currentUser} />)

  const extendedView = component.container.querySelector('.toggledContent')

  const button = component.container.querySelector('.toggleButton')
  fireEvent.click(button)

  expect(extendedView).toHaveStyle('display: block')
})

test('When liked twice, like twice', () => {
  const likeBlog = jest.fn()

  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    user: {
      name: 'name',
      username: 'username'
    },
    likes: 0
  }

  const currentUser = {
    name: 'name',
    username: 'username'
  }

  const component = render(<Blog blog={blog} currentUser={currentUser} likeBlog={likeBlog} />)

  const button = component.container.querySelector('.likeButton')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(likeBlog.mock.calls).toHaveLength(2)
})
