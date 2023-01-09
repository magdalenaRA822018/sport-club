import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from '../../http-common';
import { NewPlayer, UpdatePlayer, Player } from '../../interfaces';
    interface AddPlayerError {
        message: string
    }

    export interface PlayersState{
        players: Player[],
        loading: boolean,
        error: string | null,
    }

    const initialState : PlayersState = {
        players: [],
        loading: false,
        error: null,
    }

    export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder
    .addCase(loadPlayers.fulfilled, 
        (state, action : PayloadAction<Player[]>) => {
        state.players=action.payload
    })
    
    .addCase(removePlayer.fulfilled, 
        (state, action: PayloadAction<number>) => {
         state.players = state.players.filter(player=> player.id != action.payload);
    })

    .addCase(addPlayer.fulfilled, 
        (state, action: PayloadAction<Player>) => {
         state.players = [...state.players, action.payload]
    })

    .addCase(addPlayer.rejected, 
        (state, action) => {
            if(action.payload) state.error = action.payload
            else state.error= "Error"
    })

    .addCase(updatePlayer.fulfilled, 
        (state, action: PayloadAction<Player>) => {
         state.players = state.players.map(player => (player.id === action.payload.id) ? action.payload : player)
    })

    .addMatcher((action) => action.type.endsWith('/pending'),
         (state) => {
            state.loading=true
            state.error=null
        
    })

    .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading=false
          state.error=action.error.message
        }
    ) 
      
  }
})
export default playerSlice.reducer;

export const loadPlayers = createAsyncThunk<Player[], void, { rejectValue: string }>('players/loadPlayers', async (_, thunkApi) => {
    
    return await 
    axios.get('players/all')
    .then((response)=>{
        return response.data 
    })
    .catch((error: any)=>{
        return thunkApi.rejectWithValue(error.response.data)
    })
})

export const addPlayer = createAsyncThunk<Player, NewPlayer, { rejectValue: string }>('players/addPlayer', async (player, thunkApi) => {
    return await 
    axios.post('players/new', player)
    .then((response)=>{
        return response.data 
    })
    .catch((error: AddPlayerError)=>{
       return thunkApi.rejectWithValue(error.message)
    })
})

export const updatePlayer = createAsyncThunk<Player, UpdatePlayer, { rejectValue: string }>('players/updatePlayer', async (player, thunkApi) => {
    return await 
    axios.post('players/update', player)
    .then((response)=>{
        return response.data 
    })
    .catch((error: any)=>{
        return thunkApi.rejectWithValue(error.response.data)
    })
})

export const removePlayer = createAsyncThunk<number, number, { rejectValue: string }>('players/removePlayer', async (playerId, thunkApi) => {
    return await axios.post('players/remove', {id: playerId})
    .then((response)=>{
        return playerId
    })
    .catch((error: any)=>{
        return thunkApi.rejectWithValue(error.response.data)
    })
})

export const removePlayerFromClub = createAsyncThunk<number, number, { rejectValue: string }>('players/removePlayerFromClub', async (playerId, thunkApi) => {
    return await 
    axios.post('players/addToClub', {id: playerId})
    .then((response)=>{
        return playerId
    })
    .catch((error: any)=>{
        return thunkApi.rejectWithValue(error.response.data)
    })
})

export const addPlayerToClub = createAsyncThunk<number, number, { rejectValue: string }>('players/addPlayerToClub', async (playerId, thunkApi) => {
    return await 
    axios.post('players/removeFromClub', {id: playerId})
    .then((response)=>{
        return playerId
    })
    .catch((error: any)=>{
        return thunkApi.rejectWithValue(error)
    })
})

