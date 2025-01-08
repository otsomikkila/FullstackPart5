import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
  //console.log(token)
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const createBlog = async newObject => {
  //console.log(token)
  const config = {
    headers: { Authorization: token },
  } 
  const response = await axios.post(baseUrl, newObject, config)
  return response.data

} 

export default { getAll, createBlog, setToken }