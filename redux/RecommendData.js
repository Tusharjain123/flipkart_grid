import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRecommendData = createAsyncThunk(
  'recommendData/fetchData',
  async () => {
    try {
      const response = await fetch("http://localhost:5000/recommend", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await response.json();
      return resData;
    } catch (error) {
      // Handle error here
      console.log(error);
      throw error;
    }
  }
);

export const recommendData = createSlice({
  name: 'recommendData',
  initialState: {
    data: [],
    currentItem: {},
    status: 'idle',
    error: null,
  },
  reducers: {
    click: (state, action) => {
        state.currentItem = action.payload 
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecommendData.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(fetchRecommendData.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message; // Store the error message in the state
      });
  },
});

export default recommendData.reducer;

export const selectData = state => state.recommendData;