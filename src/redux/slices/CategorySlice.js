import { createSlice } from "@reduxjs/toolkit";

const CatergorySlice = createSlice({
  name: "catergory",
  initialState: { data: [] },
  reducers: {
    setCategory: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setCategory } = CatergorySlice.actions;
export default CatergorySlice.reducer;
