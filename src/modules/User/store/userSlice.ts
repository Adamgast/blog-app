import { isAxiosError } from 'axios';
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
  isLoading: false,
};

export const registrationUser = createAsyncThunk<UserResponse, IRegist, { rejectValue: TypeServerErrors }>(
  'user/registrationUser',
  async (user, { rejectWithValue }) => {
    try {
      const response = await registration(user);
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.errors);
      }
      return rejectWithValue({ errortext: 'Server Error!' });
    }
  }
);

export const loginUser = createAsyncThunk<UserResponse, ILogin, { rejectValue: TypeServerErrors }>(
  'user/loginUser',
  async (user, { rejectWithValue }) => {
    try {
      const response = await login(user);
      localStorage.setItem('token', response.data.user.token);
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.errors);
      }
      return rejectWithValue({ errortext: 'Server Error!' });
    }
  }
);

export const uploadUser = createAsyncThunk<UserResponse, IProfile, { rejectValue: TypeServerErrors }>(
  'user/uploadUser',
  async (user, { rejectWithValue }) => {
    try {
      const response = await editUser(user);
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.errors);
      }
      return rejectWithValue({ errortext: 'Server Error!' });
    }
  }
);

export const checkAuth = createAsyncThunk<UserResponse, void, { rejectValue: string }>(
  'user/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUser();
      return response.data;
    } catch (error) {
      return rejectWithValue('Server Error!');
    }
  }
);

const funcValid = (value: string, action: AnyAction) => {
  return (
    action.type.endsWith(`registrationUser/${value}`) ||
    action.type.endsWith(`loginUser/${value}`) ||
    action.type.endsWith(`uploadUser/${value}`) ||
    action.type.endsWith(`checkAuth/${value}`)
  );
};

const isPending = (action: AnyAction) => funcValid('pending', action);
const isFulfilled = (action: AnyAction) => funcValid('fulfilled', action);
const isRejected = (action: AnyAction) => funcValid('rejected', action);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearServerErrors(state) {
      state.serverErrors = null;
    },
    logout(state) {
      state.currentUser = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registrationUser.fulfilled, (state) => {
      state.isLoading = false;
    });

    builder.addMatcher(isPending, (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(isFulfilled, (state, action) => {
      const userData = {
        username: action.payload.user.username,
        email: action.payload.user.email,
        image: action.payload.user.image,
      };
      state.isLoading = false;
      state.currentUser = userData;
    });
    builder.addMatcher(isRejected, (state, action) => {
      state.isLoading = false;
      state.serverErrors = action.payload;
    });
  },
});

export const { clearServerErrors, logout } = userSlice.actions;
export default userSlice.reducer;
