const loginWith = async (page, username, password)  => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByTestId('title').fill(title)
  await page.getByTestId('author').fill(author)
  await page.getByTestId('url').fill(url)
  await page.getByRole('button', { name: 'add' }).click()
  //await page.getByText(`${title} ${author}`).waitFor()
}

const likeBlog = async (page, title, likes) => {
  for (let i = 0; i < likes; i++){
    //console.log(`like ${title}`)
    await page.getByTestId(`like ${title}`).click()
  }
}

export { loginWith, createBlog, likeBlog }