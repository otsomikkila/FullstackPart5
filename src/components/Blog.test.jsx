import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'vitest'

test('renders blogs author and title but not url and likes', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'otso',
    likes: 10,
    url: 'moi/moi',
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Component testing is done with react-testing-library otso')

  const { container } =  render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')

  screen.debug(element)

  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  expect(div).toHaveTextContent('otso')

  expect(div).not.toHaveTextContent('moi/moi')

  expect(div).not.toHaveTextContent('likes')  

  expect(element).toBeDefined()

})