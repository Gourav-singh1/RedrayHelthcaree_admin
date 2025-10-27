import { createSlice } from "@reduxjs/toolkit";

const statsSlice = createSlice({
  name: "stats",
  initialState: { data: [] },
  reducers: {
    setStats: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setStats } = statsSlice.actions;
export default statsSlice.reducer;
