const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Otso Mikkilä',
        username: 'otsoboy',
        password: 'salasana'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('Log in')
    const loginform = await page.getByTestId('loginform')
    await expect(locator).toBeVisible()
    await expect(loginform).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('otsoboy')
      await page.getByTestId('password').fill('salasana')
      await page.getByRole('button', { name: 'login' }).click()
  
      await expect(page.getByText('Login successful')).toBeVisible()      
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()
  
      await expect(page.getByText('wrong credentials')).toBeVisible()
    })  
  })
})
