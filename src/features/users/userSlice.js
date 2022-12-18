import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

const initialState = {
  users: [],
  students: [],
  teachers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new user
export const addUser = createAsyncThunk(
  'users/add',
  async (userData, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token
      return await userService.addUser(userData)
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
export const getStudents = createAsyncThunk(
  'users/getStudents',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await userService.getStudents(token)
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

// Get all teachers
export const getTeachers = createAsyncThunk(
  'users/getTeachers',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await userService.getTeachers(token)
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
// Delete user
export const deleteUser = createAsyncThunk(
  'users/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await userService.deleteUser(id, token)
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

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.users.push(action.payload)
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getStudents.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.students = action.payload
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getTeachers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTeachers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.teachers = action.payload
      })
      .addCase(getTeachers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.users = state.users.filter(
          (user) => user._id !== action.payload.id
        )
        state.students = state.students.filter(
          (student) => student._id !== action.payload.id
        )
        state.teachers = state.teachers.filter(
          (teacher) => teacher._id !== action.payload.id
        )
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = userSlice.actions
export default userSlice.reducer
