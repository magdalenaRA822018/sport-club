import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from '../../http-common';
import { Credentials } from '../../interfaces';

export interface User {
    isAuth: boolean,
    accessToken: string;
    expiresIn: number;
    username: string;
    roles: string
}


const initialState: User = {

    isAuth: false,
    accessToken: '',
    expiresIn: 0,
    username: '',
    roles: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login213: (state, action: PayloadAction<{ user: User }>) => {
      //state.value += 1
      console.log("redux login")
     /* if (state.loading === 'pending') {
        state.loading = 'idle'
        state.username = action.payload
      }*/
    },
    logout: (state) => {
      //state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      //state.value += action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
        console.log("pending")
        // At that moment,
        // we change status to `loading` 
        // and clear all the previous errors:
        //state.status = "loading";
        //state.error = null;
      });
  
      // When a server responses with the data,
      // `fetchTodos.fulfilled` is fired:
      builder.addCase(login.fulfilled, 
        (state, { payload }) => {
            console.log("fulfilled")
            console.log(payload)
        // We add all the new todos into the state
        // and change `status` back to `idle`:
        //  state.list.push(...payload);
         // state.status = "idle";
         state.isAuth=true
         state.accessToken=payload.accessToken
         state.roles=payload.roles
         state.username=payload.username
         
      });
  
      // When a server responses with an error:
      builder.addCase(login.rejected, 
        (state, { payload }) => {
        // We show the error message
        // and change `status` back to `idle` again.
        //if (payload) state.error = payload.message;
        //state.status = "idle";
      });
  }
})
export default userSlice.reducer;
export const { login213, logout, incrementByAmount } = userSlice.actions


export const login = createAsyncThunk<User, Credentials, { rejectValue: "" }>('user/login', async (credentials, thunkApi) => {
    try {
        console.log("async"+credentials.username)
        const response = await axios.post('auth/login', credentials)
        return response?.data
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.response?.data)
    }
})