// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Define the slice
const userSlice = createSlice({
  name: "user",
  initialState: () => {
    // Load initial state from localStorage if available
    return JSON.parse(sessionStorage.getItem("user"));
  },
  reducers: {
    login: (state, action) => {
      // Update the state with the payload data
      sessionStorage.setItem("user", JSON.stringify(action.payload));
      return { ...action.payload };
    },
    logout: (state, action) => {
      sessionStorage.removeItem("user");
      // Clear the state
      return null;
    },
  },
});

// Export the actions and reducer
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
