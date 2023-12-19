import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { AnyAction } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { TypeArticle } from '../../../store/action-types';
import { getArticleFull } from '../api/getArticleFull';
import { postNewArticle } from '../api/postNewArticle';
import { putArticle } from '../api/putArticle';
import { deleteArticle } from '../api/deleteArticle';
import { IArticle } from '../models/IArticle';
import { ArticleState } from './action-types';

const initialState: ArticleState = {
  article: null,
  isLoading: false,
  isError: null,
};

export const fetchArticleFull = createAsyncThunk<TypeArticle, string, { rejectValue: string }>(
  'article/fetchArticleFull',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await getArticleFull(slug);
      return response.data.article;
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

export const createNewArticle = createAsyncThunk<TypeArticle, IArticle, { rejectValue: string }>(
  'article/createNewArticle',
  async (article, { rejectWithValue }) => {
    try {
      const response = await postNewArticle(article);
      return response.data.article;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        if (typeof error.response.data.errors === 'object') {
          return rejectWithValue(`Status code1: ${error.response.status}. ${error.response.data.errors.message}`);
        }
        return rejectWithValue(`Status code: ${error.response.status}. ${error.response.data}`);
      }
      return rejectWithValue('Server Error!');
    }
  }
);

export const editArticle = createAsyncThunk<TypeArticle, { slug: string; article: IArticle }, { rejectValue: string }>(
  'article/editArticle',
  async ({ slug, article }, { rejectWithValue }) => {
    try {
      const response = await putArticle(slug, article);
      return response.data.article;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        if (typeof error.response.data.errors === 'object') {
          return rejectWithValue(`Status code1: ${error.response.status}. ${error.response.data.errors.message}`);
        }
        return rejectWithValue(`Status code: ${error.response.status}. ${error.response.data}`);
      }
      return rejectWithValue('Server Error!');
    }
  }
);

export const removeArticle = createAsyncThunk<void, string, { rejectValue: string }>(
  'article/removeArticle',
  async (slug, { rejectWithValue }) => {
    try {
      await deleteArticle(slug);
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

const funcValid = (value: string, action: AnyAction) => {
  return (
    action.type.endsWith(`fetchArticleFull/${value}`) ||
    action.type.endsWith(`createNewArticle/${value}`) ||
    action.type.endsWith(`editArticle/${value}`) ||
    action.type.endsWith(`removeArticle/${value}`)
  );
};

const isPending = (action: AnyAction) => funcValid('pending', action);
const isFulfilled = (action: AnyAction) => funcValid('fulfilled', action);
const isRejected = (action: AnyAction) => funcValid('rejected', action);

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchArticleFull.fulfilled, (state, action) => {
        state.isLoading = false;
        state.article = action.payload;
      })

      .addMatcher(isPending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addMatcher(isFulfilled, (state) => {
        state.isLoading = false;
      })
      .addMatcher(isRejected, (state, action) => {
        if (action.payload) state.isError = action.payload;
        state.isLoading = false;
      });
  },
});

export default articleSlice.reducer;
