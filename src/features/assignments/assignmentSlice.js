import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import assignmentService from './assignmentService'

const initialState = {
  assignments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new Assignment
export const addAssignment = createAsyncThunk(
  'assignments/add',
  async (AssignmentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await assignmentService.addAssignment(AssignmentData, token)
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
export const getAssignments = createAsyncThunk(
  'assignments/getAssignments',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await assignmentService.getAssignments(token)
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

// Delete Assignment
export const deleteAssignment = createAsyncThunk(
  'assignments/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await assignmentService.deleteAssignment(id, token)
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

export const assignmentSlice = createSlice({
  name: 'assignments',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAssignment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addAssignment.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.assignments.push(action.payload)
      })
      .addCase(addAssignment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAssignments.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAssignments.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.assignments = action.payload
      })
      .addCase(getAssignments.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteAssignment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteAssignment.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.assignments = state.assignments.filter(
          (Assignment) => Assignment._id !== action.payload.id
        )
      })
      .addCase(deleteAssignment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = assignmentSlice.actions
export default assignmentSlice.reducer
