import { configureStore } from '@reduxjs/toolkit';
import { articleFullSlice } from '../modules/ArticleFull';
import { articlesSlice } from '../modules/ArticleList';
import { userSlice } from '../modules/User';

export const store = configureStore({
  reducer: {
    articlesData: articlesSlice,
    articleFull: articleFullSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
