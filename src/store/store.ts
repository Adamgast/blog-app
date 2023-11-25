import { configureStore } from '@reduxjs/toolkit';
import { articleFullSlice } from '../modules/ArticleFull';
import { articlesSlice } from '../modules/ArticleList';

export const store = configureStore({
  reducer: {
    articlesData: articlesSlice,
    articleFull: articleFullSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
