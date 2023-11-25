import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllArticles } from '../api/getAllArticles';
import { ArticlesState, IArticlesData } from './action-types';

const initialState: ArticlesState = {
  articles: [],
  articlesCount: 0,
  isLoading: false,
  isError: null,
};

export const fetchArticles = createAsyncThunk<IArticlesData, number, { rejectValue: void }>(
  'articles/fetchArticles',
  async (page, { rejectWithValue }) => {
    const response = await getAllArticles(page);
    if (response.status < 200 || response.status > 299) {
      return rejectWithValue();
    }
    const result: IArticlesData = response.data;
    return result;
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
        if (action.error.message) state.isError = action.error.message;
      });
  },
});

export default articlesSlice.reducer;
