import { configureStore } from '@reduxjs/toolkit';
import { articleSlice } from '../modules/Article';
import { articlesSlice } from '../modules/ArticleList';
import { userSlice } from '../modules/User';

export const store = configureStore({
  reducer: {
    articlesData: articlesSlice,
    articleFull: articleSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
