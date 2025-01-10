import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Blog, TitleAndButton } from './Blog'
import CreateBlog from './CreateBlog'
import { beforeEach, describe, expect, test, vi } from 'vitest'

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

    render(
      <TitleAndButton blog={blog} toggleVisibility={mockHandler} buttonText={'test'}/>
    )
    const user = userEvent.setup()
    const button = screen.getByText('test')
    await user.click(button)
    await user.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test('form calls event handler with right details', async () => {
    const mockHandler = vi.fn()
    const user = userEvent.setup()

    render(<CreateBlog 
            createBlog={mockHandler}
            setMessage={() => 0}
            setMessageStyle={() => 0}
            />)

    const inputs = screen.getAllByRole('textbox')
    const sendButton = screen.getByText('add')

    await user.type(inputs[0], 'testing a form...')
    await user.type(inputs[1], 'testguy')
    await user.type(inputs[2], '123/456')
    await user.click(sendButton)

    console.log('tääääää', mockHandler.mock.calls)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('testing a form...')
  })
})