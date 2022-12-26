import axios from 'axios'

const API_URL = 'http://localhost:8084/api/users/'

// Create new user
const addUser = async (UserData) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // }
  try {
    const response = await axios.post(API_URL, UserData)
    return response.data
  } catch (error) {
    console.log(error)
  }
  
}

// Get all Students
const getStudents = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + 'students', config)

  return response.data
}

// Get all Students
const getTeachers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + 'teachers', config)

  return response.data
}

// Delete user
const deleteUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + userId, config)

  return response.data
}

const userService = {
  addUser,
  getStudents,
  getTeachers,
  deleteUser,
}

export default userService
