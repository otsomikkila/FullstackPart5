import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { beforeEach, describe, expect, test } from 'vitest'

describe('<Blog />', () => {
  let container 

  const testUser = {
    username: 'otsoboy'
  }

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'otso',
    likes: 10,
    url: 'moi/moi',
    user: testUser
  }

  beforeEach(() => {
    container = render(<Blog blog={blog} user={testUser} />).container
  })

  test('renders blogs author and title but not url and likes', () => {

    const element = screen.getByText('Component testing is done with react-testing-library otso')
  
    const div = container.querySelector('.blog')
  
    expect(div).toHaveTextContent('Component testing is done with react-testing-library')
    expect(div).toHaveTextContent('otso')
    expect(div).not.toHaveTextContent('moi/moi')
    expect(div).not.toHaveTextContent('likes')  
    expect(element).toBeDefined()
  })
  
  test('url and likes are shown after view button is clicked', async () => {  
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent('moi/moi')
    expect(div).toHaveTextContent('likes')
  })
})