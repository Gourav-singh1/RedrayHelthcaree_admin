import { createSlice } from "@reduxjs/toolkit";

const sparepartSlice = createSlice({
  name: "sparepart",
  initialState: { data: [] },
  reducers: {
    setSparepart: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setSparepart } = sparepartSlice.actions;
export default sparepartSlice.reducer;
