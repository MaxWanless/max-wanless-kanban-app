import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] };

export const favouriteSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    setFavouritesList: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setFavouritesList } = favouriteSlice.actions;

export default favouriteSlice.reducer;
