const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('Log in')
    const loginform = await page.getByTestId('loginform')
    await expect(locator).toBeVisible()
    await expect(loginform).toBeVisible()
  })
})
