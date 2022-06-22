import { createSlice } from "@reduxjs/toolkit";
export const theme = createSlice({
  name: "theme",
  initialState: {
    theme: "light",
  },
  reducers: {
    update: (state, action) => {
      state.theme = action.payload.theme;
    },
  },
});
export const { update } = theme.actions;
export default theme.reducer;
