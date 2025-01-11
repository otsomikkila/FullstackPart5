const { test, expect, beforeEach, describe } = require('@playwright/test')
import { request } from 'http'
import { loginWith, createBlog, likeBlog } from './helper'

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
    await request.post('/api/users', {
      data: {
        name: 'Sisu',
        username: 'sisuboy',
        password: 'salasana2'
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

      test('a blog can be liked', async ({ page }) => {
        await createBlog(page, 'testi', 'OTSO', 'moi/testi')
        await page.getByTestId('view testi').click()

        await likeBlog(page, 'testi', 2)
        await expect(page.getByText('likes 2')).toBeVisible()
      })
      test('user can delete own blog post', async ({ page }) => {
        page.on('dialog', async (dialog) => {
          expect(dialog.type()).toBe('confirm'); // Ensure it's a confirm dialog
          expect(dialog.message()).toBe('Remove blog testi by OTSO'); // Check dialog message
          await dialog.accept(); // Accept the confirmation
        })
        await createBlog(page, 'testi', 'OTSO', 'moi/testi')
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'remove' }).click()
        await expect(page.getByText('testi OTSO')).not.toBeVisible()
      })
      test.only('user sees the list of blogs in the order of likes', async ({ page }) =>{
        await createBlog(page, 'testi1', 'OTSO', 'moi/testi')
        await createBlog(page, 'testi2', 'OTSO', 'moi/testi')
        await createBlog(page, 'testi3', 'OTSO', 'moi/testi')

        await page.getByTestId('view testi1').click()
        await page.getByTestId('view testi2').click()
        await page.getByTestId('view testi3').click()

        await likeBlog(page, 'testi1', 1)
        await likeBlog(page, 'testi2', 4)
        await likeBlog(page, 'testi3', 2)

        const blogs = await page.getByTestId('blog').all()
        expect(blogs[0].getByText('testi2')).toBeVisible
        expect(blogs[1].getByText('testi3')).toBeVisible
        expect(blogs[2].getByText('testi1')).toBeVisible

        expect(blogs[0].getByText('testi1')).not.toBeVisible
        expect(blogs[1].getByText('testi2')).not.toBeVisible
        expect(blogs[2].getByText('testi2')).not.toBeVisible

        expect(blogs[0].getByText('testi3')).not.toBeVisible
        expect(blogs[1].getByText('testi1')).not.toBeVisible
        expect(blogs[2].getByText('testi3')).not.toBeVisible
      })
      test('user can only see remove button on own blogs', async ({ page }) =>{
        await createBlog(page, 'testi', 'OTSO', 'moi/testi')
        await page.getByRole('button', { name: 'logout' }).click()
        
        await loginWith(page, 'sisuboy', 'salasana2')
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByText('remove')).not.toBeVisible()
      })
    })
  })
})
