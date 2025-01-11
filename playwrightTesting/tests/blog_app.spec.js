const { test, expect, beforeEach, describe } = require('@playwright/test')
import { request } from 'http'
import { loginWith, createBlog } from './helper'

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Otso Mikkilä',
        username: 'otsoboy',
        password: 'salasana'
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('Log in')
    const loginform = await page.getByTestId('loginform')
    await expect(locator).toBeVisible()
    await expect(loginform).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'otsoboy', 'salasana')

      await expect(page.getByText('Login successful')).toBeVisible()      
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrong')
  
      await expect(page.getByText('wrong credentials')).toBeVisible()
    })
    
    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'otsoboy', 'salasana')
        await page.getByRole('button', { name: 'new note' }).click()
      })
    
      test('a new blog can be created', async ({ page }) => {
        await createBlog(page, 'testi', 'OTSO', 'moi/testi')        
      
        await expect(page.getByText('a new blog testi by OTSO added')).toBeVisible()
        //check if the blog is visible after creating it 
        await expect(page.getByText('testi OTSO')).toBeVisible()
      })

      test.only('a blog can be liked', async ({ page }) => {
        await createBlog(page, 'testi', 'OTSO', 'moi/testi')

        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()

        await expect(page.getByText('likes 1')).toBeVisible()
      })
    })
    
  })
})
