import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from '../../http-common';
import { Credentials, User, UserTokenState } from '../../interfaces';

export interface UserInformation{
  user: User,
  userTokenState: UserTokenState
  loading: boolean,
  error: string | null,
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
    loading: false,
    error:  null,
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

      builder
      .addCase(findByUsername.fulfilled, 
        (state, action: PayloadAction<User>) => {
         state.user = action.payload
         state.loading = false
      })
      
      .addCase(updateUser.fulfilled, 
        (state, action: PayloadAction<User>) => {
         state.user = action.payload
         state.loading = false
      })

      .addCase(login.fulfilled, 
        (state, action: PayloadAction<UserTokenState>) => {
         state.userTokenState=action.payload
         localStorage.setItem('token', action.payload.accessToken)
         state.loading=false
      })

      .addMatcher( (action) => action.type.endsWith('/pending'), (state) => {state.loading=true})

      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading=false
          state.error=action.error.message
        }
      ) 
  }
})

export default userSlice.reducer;
export const { logout } = userSlice.actions

export const login = createAsyncThunk<UserTokenState, Credentials, { rejectValue: string }>('user/login', async (credentials, thunkApi) => {
 
     return await 
        axios.post('auth/login', credentials)
        .then((response)=>{
          return response.data 
        })
        .catch((error: any)=>{
          return thunkApi.rejectWithValue(error.response.data)
        })
})

export const findByUsername = createAsyncThunk<User, string, { rejectValue: string }>('user/findByUsername', async (username, thunkApi) => {
 
      return await 
      axios.post('users/username', {username: username})
      .then((response)=>{
        return response.data 
      })
      .catch((error: any)=>{
        return thunkApi.rejectWithValue(error.response.data)
      })
})

export const updateUser = createAsyncThunk<User, User, { rejectValue: string }>('user/updateUser', async (user, thunkApi) => {

      return await 
      axios.post('users/update', user)
      .then((response)=>{
        return response.data 
      })
      .catch((error: any)=>{
        return thunkApi.rejectWithValue(error.response.data)
      })
})