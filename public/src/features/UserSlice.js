import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: 0
  },
  reducers: {
    addUserId: (state, action) => {
      state.value = (action.payload);
    },
   
  },
});

// Action creators are generated for each case reducer function
export const { addUserId } = userSlice.actions;
export const selectUser = (state) => state.user.value;
export default userSlice.reducer;