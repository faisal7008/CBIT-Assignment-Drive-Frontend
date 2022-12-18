import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import courseService from './courseService'

const initialState = {
  courses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new Course
export const addCourse = createAsyncThunk(
  'courses/add',
  async (CourseData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await courseService.addCourse(CourseData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get all students
export const getCourses = createAsyncThunk(
  'courses/getCourses',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await courseService.getCourses(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete Course
export const deleteCourse = createAsyncThunk(
  'courses/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await courseService.deleteCourse(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCourse.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.courses.push(action.payload)
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getCourses.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.courses = action.payload
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteCourse.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.courses = state.courses.filter(
          (Course) => Course._id !== action.payload.id
        )
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = courseSlice.actions
export default courseSlice.reducer
