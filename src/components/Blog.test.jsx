import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Blog, TitleAndButton } from './Blog'
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
    screen.debug()
    const element = screen.getByText('Component testing is done with react-testing-library otso')
  
    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  
    expect(element).toHaveTextContent('Component testing is done with react-testing-library')
    expect(element).toHaveTextContent('otso')
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

  test('if like button is clicked twice, the event handler is called twice', async () => {
    const mockHandler = vi.fn()
    container = null

    render(
      <TitleAndButton blog={blog} toggleVisibility={mockHandler} buttonText={'test'}/>
    )
    const user = userEvent.setup()
    const button = screen.getByText('test')
    await user.click(button)
    await user.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})