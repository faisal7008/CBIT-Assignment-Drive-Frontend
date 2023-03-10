import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import submissionService from './submissionService'

const initialState = {
  submissions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new submission
export const addSubmission = createAsyncThunk(
  'submissions/add',
  async (submissionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await submissionService.addSubmission(submissionData, token)
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
export const getSubmissions = createAsyncThunk(
  'submissions/getSubmissions',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await submissionService.getSubmissions(token)
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

// Update submission
export const updateSubmission = createAsyncThunk(
  'submissions/update',
  async ({submissionId, submissionData}, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      
      return await submissionService.updateSubmission(submissionId, submissionData, token)
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

// Delete submission
export const deleteSubmission = createAsyncThunk(
  'submissions/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await submissionService.deleteSubmission(id, token)
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

export const submissionSlice = createSlice({
  name: 'submissions',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addSubmission.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addSubmission.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.submissions.filter(assignment => assignment._id === action.payload.assignment_id).map(assignment => assignment.submissions.push(action.payload))
      })
      .addCase(addSubmission.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getSubmissions.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSubmissions.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.submissions = action.payload
      })
      .addCase(getSubmissions.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateSubmission.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateSubmission.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // state.submissions = state.submissions.submissions.filter((submission) => submission._id !== action.payload.id)
        // state.submissions.submissions.push(action.payload)
      })
      .addCase(updateSubmission.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteSubmission.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteSubmission.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.submissions = state.submissions.submissions.filter(
          (submission) => submission._id !== action.payload.id
        )
      })
      .addCase(deleteSubmission.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = submissionSlice.actions
export default submissionSlice.reducer
