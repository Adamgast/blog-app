import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TypeArticle } from '../../../store/action-types';
import { getArticleFull } from '../api/getArticleFull';
import { ArticleFullState } from './action-types';

const initialState: ArticleFullState = {
  article: null,
  isLoading: false,
  isError: null,
};

export const fetchArticleFull = createAsyncThunk<TypeArticle, string, { rejectValue: void }>(
  'articleFull/fetchArticleFull',
  async (slug, { rejectWithValue }) => {
    const response = await getArticleFull(slug);

    if (response.status > 299 || response.status < 200) {
      return rejectWithValue();
    }
    const { article } = await response.data;
    return article;
  }
);

export const articleFullSlice = createSlice({
  name: 'articleFull',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchArticleFull.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(fetchArticleFull.fulfilled, (state, action) => {
        state.isLoading = false;
        state.article = action.payload;
      })
      .addCase(fetchArticleFull.rejected, (state, action) => {
        state.isLoading = false;
        if (action.error.message) state.isError = action.error.message;
      });
  },
});

export default articleFullSlice.reducer;
