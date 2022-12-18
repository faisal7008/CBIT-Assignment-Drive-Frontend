import axios from 'axios'

// const API_URL = 'http://localhost:8084/api/courses/'

const API_URL = 'https://wild-teal-springbok-hem.cyclic.app/api/courses/'

// Create new goal
const addCourse = async (CourseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, CourseData, config)

  return response.data
}

// Get all Courses
const getCourses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete Course
const deleteCourse = async (CourseId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + CourseId, config)

  return response.data
}

const courseService = {
  addCourse,
  getCourses,
  deleteCourse,
}

export default courseService
