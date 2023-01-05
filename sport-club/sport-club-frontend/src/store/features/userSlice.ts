import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from '../../http-common';

export interface User{
  id: number;
  role: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
}

export interface UserTokenState {
  accessToken: string;
  expiresIn: number;
  username: string;
  roles: string
}

export interface UserInformation{
  user: User,
  userTokenState: UserTokenState
  loading: boolean,
  error: any,
  success: boolean,
}
 const initalUserState:User = {
  id: 0,
  role: '',
  username: '',
  password: '',
  firstname: '',
  lastname: '',
}

const initialState: UserInformation = {
    user: initalUserState,
    userTokenState: {} as UserTokenState,
    loading: false,
    error: null,
    success: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserTokenState>) => {
        state.userTokenState=action.payload
    },
    logout: (state) => { 
      state = initialState
      localStorage.removeItem('token')
    }
  },
  extraReducers: (builder) => {
       builder.addCase(findByUsername.pending, (state) => {
          state.loading = true
          state.error = null
       });
  
      builder.addCase(findByUsername.fulfilled, 
        (state, { payload }) => {
         state.user=payload
         state.loading = false
         state.success = true 
      });
  
      builder.addCase(findByUsername.rejected, 
        (state, { payload }) => {
         state.loading = false
         state.error = payload
      });

      builder.addCase(updateUser.fulfilled, 
        (state, { payload }) => {
         state.user=payload
         state.loading = false
         state.success = true 
      });

      builder.addCase(updateUser.rejected, 
        (state, { payload , error}) => {
         state.error=payload
         if (payload) {
          state.error = payload
        } else {
          state.error = error
        }
      });
      
  }
})
export default userSlice.reducer;
export const { login, logout } = userSlice.actions


/*
export const login2 = createAsyncThunk<UserTokenState, Credentials, { rejectValue: "" }>('user/login', async (credentials, thunkApi) => {
    try {
      console.log("login")
        const response = await axios.post('auth/login', credentials)
        return response?.data
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.response?.data)
    }
})
*/

export const findByUsername = createAsyncThunk<User, string, { rejectValue: "" }>('user/findByUsername', async (username, thunkApi) => {
  try {
      const response = await axios.post('users/username', {username: username})
      return response?.data
  } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data)
  }
})

export const updateUser = createAsyncThunk<User, User, { rejectValue: "" }>('user/updateUser', async (user, thunkApi) => {
  try {
      const response = await axios.post('users/update', user)
      return user
  } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data)
  }
})