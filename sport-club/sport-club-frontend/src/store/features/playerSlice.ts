import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from '../../http-common';
import { PlayerClub } from '../../interfaces';
import { isRejectedWithValue } from '@reduxjs/toolkit';
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
        state.loading=false
        state.players=action.payload
    })
    
    .addCase(removePlayer.fulfilled, 
        (state, action: PayloadAction<number>) => {
         state.loading=false
         state.players = state.players.filter(player=> player.id != action.payload);
    })

    .addCase(addPlayer.fulfilled, 
        (state, action: PayloadAction<Player>) => {
         state.loading=false   
         state.players = [...state.players, action.payload]
    })

    .addCase(addPlayer.rejected, 
        (state, action) => {
            state.loading = false
            if(action.payload) state.error = action.payload
            else state.error= "Error"
    })

    .addCase(updatePlayer.fulfilled, 
        (state, action: PayloadAction<Player>) => {
         state.loading=false
         state.players = state.players.map( player => (player.id === action.payload.id) ? action.payload : player)
    })

    .addCase(removePlayerFromClub.fulfilled, 
        (state, action: PayloadAction<number>) => {
         state.loading=false
         state.players = state.players.map( player => (player.id === action.payload) ? {...player, clubId:0, clubName: ''} : player)

    })

    .addCase(addPlayerToClub.fulfilled, 
        (state, action: PayloadAction<Player>) => {
         state.loading=false
         state.players = state.players.map( player => (player.id === action.payload.id) ? action.payload : player)
    })

    .addMatcher((action) => action.type.endsWith('/pending'),
         (state) => {
          state.loading=true
          state.error=null
    })

    .addMatcher(
        (action) => (action.type.endsWith('/rejected')),
        (state, action) => {
          state.loading=false
          state.error=action.error.message
    }) 
  }
})
export default playerSlice.reducer;
export const loadPlayers = createAsyncThunk<Player[], void, { rejectValue: string }>('players/loadPlayers',  (_, thunkApi) => {
    
    return axios.get('players/all')
    .then((response)=>{
        return response.data 
    })
    .catch((error: any)=>{
        return thunkApi.rejectWithValue(error.response.data)
    })
})

export const addPlayer = createAsyncThunk<Player, NewPlayer, { rejectValue: string }>('players/addPlayer', (player, thunkApi) => {
    return axios.post('players/new', player)
    .then((response)=>{
        return response.data 
    })
    .catch((error: AddPlayerError)=>{
       return thunkApi.rejectWithValue(error.message)
    })
})

export const updatePlayer = createAsyncThunk<Player, UpdatePlayer, { rejectValue: string }>('players/updatePlayer', (player, thunkApi) => {
    return axios.post('players/update', player)
    .then((response)=>{
        return response.data 
    })
    .catch((error: any)=>{
        return thunkApi.rejectWithValue(error.response.data)
    })
})

export const removePlayer = createAsyncThunk<number, number, { rejectValue: string }>('players/removePlayer', (playerId, thunkApi) => {
    return axios.post('players/remove', {id: playerId})
    .then(()=>{
        return playerId
    })
    .catch((error: any)=>{
        return thunkApi.rejectWithValue(error.response.data)
    })
})

export const removePlayerFromClub = createAsyncThunk<number, number, { rejectValue: string }>('players/removePlayerFromClub', (playerId, thunkApi) => {
    return axios.post('players/removeFromClub', {playerId: playerId})
    .then(()=>{
        return playerId
    })
    .catch((error: any)=>{
        return thunkApi.rejectWithValue(error.response.data)
    })
})

export const addPlayerToClub = createAsyncThunk<Player, PlayerClub, { rejectValue: string }>('players/addPlayerToClub', (playerClub, thunkApi) => {
    return axios.post('players/addToClub', {clubId: playerClub.clubId, playerId: playerClub.playerId})
    .then((response)=>{
        return response.data
    })
    .catch((error: any)=>{
        return thunkApi.rejectWithValue(error)
    })
})

