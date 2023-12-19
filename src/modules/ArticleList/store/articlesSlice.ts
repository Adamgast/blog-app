import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { getAllArticles } from '../api/getAllArticles';
import { ArticlesState, IArticlesData } from './action-types';

const initialState: ArticlesState = {
  articles: [],
  articlesCount: 0,
  isLoading: false,
  isError: null,
};

export const fetchArticles = createAsyncThunk<IArticlesData, number, { rejectValue: string }>(
  'articles/fetchArticles',
  async (page, { rejectWithValue }) => {
    try {
      const response = await getAllArticles(page);
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        if (typeof error.response.data.errors === 'object') {
          return rejectWithValue(`Status code: ${error.response.status}. ${error.response.data.errors.message}`);
        }
        return rejectWithValue(`Status code: ${error.response.status}. ${error.response.data}`);
      }
      return rejectWithValue('Server Error!');
    }
  }
);

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = action.payload.articles;
        state.articlesCount = action.payload.articlesCount;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) state.isError = action.payload;
      });
  },
});

export default articlesSlice.reducer;
