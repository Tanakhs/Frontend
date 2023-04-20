// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Define the slice
const userSlice = createSlice({
  name: "user",
  initialState: () => {
    // Load initial state from localStorage if available
    const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    return storedUserDetails
      ? { ...storedUserDetails }
      : { jwt: null, user: {} };
  },
  reducers: {
    login: (state, action) => {
      // Update the state with the payload data
      localStorage.setItem("userDetails", JSON.stringify(action.payload));
      return { ...action.payload };
    },
    logout: (state, action) => {
      localStorage.removeItem("userDetails");
      // Clear the state
      return {};
    },
  },
});

// Export the actions and reducer
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
