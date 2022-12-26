import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice' 
import userReducer from '../features/users/userSlice' 
import courseReducer from '../features/courses/courseSlice' 
import classReducer from '../features/classes/classSlice' 
import assignmentReducer from '../features/assignments/assignmentSlice' 
import submissionReducer from '../features/submissions/submissionSlice' 


export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    classes: classReducer,
    courses: courseReducer,
    assignments: assignmentReducer,
    submissions: submissionReducer,
  },
});
