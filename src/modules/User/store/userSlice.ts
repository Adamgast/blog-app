import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { AnyAction } from '@reduxjs/toolkit';
import { registration } from '../api/registration';
import { login } from '../api/login';
import { getUser } from '../api/getUser';
import { editUser } from '../api/editUser';
import { IRegist } from '../models/IRegist';
import { ILogin } from '../models/ILogin';
import { IProfile } from '../models/IProfile';
import { UserState, TypeServerErrors } from './action-types';
import { UserResponse } from '../models/response/UserResponse';

const initialState: UserState = {
  currentUser: null,
  serverErrors: null,
  isAuth: false,
  isLoading: false,
};

export const registrationUser = createAsyncThunk<UserResponse, IRegist, { rejectValue: TypeServerErrors }>(
  'user/registrationUser',
  async (user, thunkAPI) => {
    try {
      const response = await registration(user);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  }
);

export const loginUser = createAsyncThunk<UserResponse, ILogin, { rejectValue: TypeServerErrors }>(
  'user/loginUser',
  async (user, thunkAPI) => {
    try {
      const response = await login(user);
      localStorage.setItem('token', response.data.user.token);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  }
);

export const uploadUser = createAsyncThunk<UserResponse, IProfile, { rejectValue: TypeServerErrors }>(
  'user/editUser',
  async (user, thunkAPI) => {
    try {
      const response = await editUser(user);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  }
);

export const checkAuth = createAsyncThunk<UserResponse, void, { rejectValue: TypeServerErrors }>(
  'user/checkAuth',
  async (_, thunkAPI) => {
    try {
      const response = await getUser();
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  }
);

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearServerErrors(state) {
      state.serverErrors = null;
    },
    logout(state) {
      state.currentUser = null;
      state.isAuth = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registrationUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(uploadUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const userData = {
        username: action.payload.user.username,
        email: action.payload.user.email,
        image: action.payload.user.image,
      };
      state.isAuth = true;
      state.isLoading = false;
      state.currentUser = userData;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      const userData = {
        username: action.payload.user.username,
        email: action.payload.user.email,
        image: action.payload.user.image,
      };
      state.isAuth = true;
      state.currentUser = userData;
    });
    builder.addCase(uploadUser.fulfilled, (state, action) => {
      const userData = {
        username: action.payload.user.username,
        email: action.payload.user.email,
        image: action.payload.user.image,
      };
      state.isLoading = false;
      state.currentUser = userData;
    });
    builder.addMatcher(isError, (state, action) => {
      state.isLoading = false;
      state.serverErrors = action.payload;
    });
  },
});

export const { clearServerErrors, logout } = userSlice.actions;
export default userSlice.reducer;
