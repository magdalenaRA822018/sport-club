import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../http-common';
import { NewPlayer, UpdatePlayer, Player } from '../../interfaces';

    export interface PlayersState{
        players: Player[],
    }

    const initialState : PlayersState = {
        players: [],
    }

    export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    builder.addCase(loadPlayers.fulfilled, 
        (state, { payload }) => {
        state.players=payload
    });
    
    builder.addCase(removePlayer.fulfilled, 
        (state, { payload }) => {
         state.players = state.players.filter(player=> player.id != payload);
    });

    builder.addCase(addPlayer.fulfilled, 
        (state, { payload }) => {
         state.players = [...state.players, payload]
    });

    builder.addCase(updatePlayer.fulfilled, 
        (state, { payload }) => {
         state.players = state.players.map(player => (player.id === payload.id) ? payload : player)
    });
      
  }
})
export default playerSlice.reducer;

export const loadPlayers = createAsyncThunk<Player[], void, { rejectValue: string }>('players/loadPlayers', async (_, thunkApi) => {
    try {
        const response = await axios.get('players/all')
        return response.data
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.response.data)
    }
})

export const addPlayer = createAsyncThunk<Player, NewPlayer, { rejectValue: string }>('players/addPlayer', async (player, thunkApi) => {
    try {
        const response = await axios.post('players/new', player)
        return response.data
    } catch (error: any) {
        return thunkApi.rejectWithValue("Error")
    }
})

export const updatePlayer = createAsyncThunk<Player, UpdatePlayer, { rejectValue: string }>('players/updatePlayer', async (player, thunkApi) => {
    try {
        const response = await axios.post('players/update', player)
        return response.data
    } catch (error: any) {
        return thunkApi.rejectWithValue("Error")
    }
})

export const removePlayer = createAsyncThunk<number, number, { rejectValue: string }>('players/removePlayer', async (playerId, thunkApi) => {
    try {
        const response = await axios.post('players/remove', {id: playerId})
        return playerId
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.response.data)
    }
})

export const removePlayerFromClub = createAsyncThunk<number, number, { rejectValue: string }>('players/removePlayerFromClub', async (playerId, thunkApi) => {
    try {
        const response = await axios.post('players/remove', {id: playerId})
        return playerId
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.response.data)
    }
})

export const addPlayerToClub = createAsyncThunk<number, number, { rejectValue: string }>('players/addPlayerToClub', async (playerId, thunkApi) => {
    try {
        const response = await axios.post('players/remove', {id: playerId})
        return playerId
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.response.data)
    }
})

