import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../http-common';
import { Credentials, User, UserTokenState } from '../../interfaces';

export interface UserInformation{
  user: User,
  userTokenState: UserTokenState
}
const initalUserState:User = {
  id: 0,
  role: '',
  username: '',
  password: '',
  firstname: '',
  lastname: '',
}

const initalUserTokenState:UserTokenState = {
  accessToken: '',
  expiresIn: 0,
  username: '',
  roles: '',
}

const initialState: UserInformation = {
    user: initalUserState,
    userTokenState: initalUserTokenState,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => { 
      state = initialState
      localStorage.removeItem('token')
    }
  },
  extraReducers: (builder) => {

      builder.addCase(findByUsername.fulfilled, 
        (state, { payload }) => {
         state.user=payload
      });
      
      builder.addCase(updateUser.fulfilled, 
        (state, { payload }) => {
         state.user=payload
      });

      builder.addCase(login.fulfilled, 
        (state, { payload }) => {
         state.userTokenState=payload
         localStorage.setItem('token', payload.accessToken)
      });
  }
})

export default userSlice.reducer;
export const { logout } = userSlice.actions

export const login = createAsyncThunk<UserTokenState, Credentials, { rejectValue: string }>('user/login', async (credentials, thunkApi) => {
    try {
        const response = await axios.post('auth/login', credentials)
        return response.data
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.response.data)
    }
    /*
    axios.post('auth/login', credentials)
        .then((response)=>{
          return response
        })
        .catch((error)=>{
          return thunkApi.rejectWithValue(error.response.data)
        })
    */
})

export const findByUsername = createAsyncThunk<User, string, { rejectValue: string }>('user/findByUsername', async (username, thunkApi) => {
  try {
      const response = await axios.post('users/username', {username: username})
      return response.data
  } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data)
  }
})

export const updateUser = createAsyncThunk<User, User, { rejectValue: string }>('user/updateUser', async (user, thunkApi) => {
  try {
      const response = await axios.post('users/update', user)
      return response.data
  } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data)
  }
})