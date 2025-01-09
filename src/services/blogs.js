import axios, { AxiosError } from 'axios'
//import jwt from 'jsonwebtoken'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
  //console.log(token)
}

//console.log(jwt.decode(token))
const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const createBlog = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data

}

const addLike = async (blogObject, newLikes) => {
  //console.log(blogObject.user)
  const newBlog = {
    ...blogObject,
    user: blogObject.user.id,
    likes: newLikes
  }
  await axios.put(`${baseUrl}/${blogObject.id}`, newBlog)
}

const deleteBlog = async blogObject => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${blogObject.id}`, config)
}

export default { getAll, createBlog, setToken, addLike, deleteBlog }