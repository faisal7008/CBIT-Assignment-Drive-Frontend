import axios from 'axios'

// const API_URL = 'http://localhost:8084/api/classes/'

// const API_URL = 'https://wild-teal-springbok-hem.cyclic.app/api/classes/'
const API_URL = 'https://cbit-assignment-drive-backendapi.up.railway.app/api/classes/'

// Create new goal
const addClass = async (ClassData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, ClassData, config)

  return response.data
}

// Get a Class
const getClass = async (classId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + classId, config)

  return response.data
}

// Get all Classs
const getClasses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Update Class
const updateClass = async (ClassId, ClassData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + ClassId, ClassData, config)

  return response.data
}

// Delete Class
const deleteClass = async (ClassId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  // console.log(ClassId);
  const response = await axios.delete(API_URL + ClassId, config)

  return response.data
}

const classService = {
  addClass,
  getClasses,
  getClass,
  updateClass,
  deleteClass,
}

export default classService
