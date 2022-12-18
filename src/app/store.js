import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice' 
import userReducer from '../features/users/userSlice' 
import courseReducer from '../features/courses/courseSlice' 
import assignmentReducer from '../features/assignments/assignmentSlice' 
import submissionReducer from '../features/submissions/submissionSlice' 


export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    courses: courseReducer,
    assignments: assignmentReducer,
    submissions: submissionReducer,
  },
});
