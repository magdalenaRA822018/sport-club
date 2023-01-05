import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../http-common';
import { NewPlayer } from '../../interfaces';
import { UpdatePlayer } from '../../interfaces';

export interface Player {
    id: number;
    playerName: string;
    image: string;
    salary: number;
    skills: Array<Skill>;
    clubName: string;
    clubId: number;
}
export interface Skill{
    id: number;
    name: string;
    description: string;
}
export interface PlayersState{
    players: Player[],
    loading: boolean,
    error: string | undefined,
    success: boolean,
}

const initialState : PlayersState = {
    players: [] as Player[],
    loading: false,
    error: undefined,
    success: false,
}
export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(loadPlayers.pending, (state) => {state.loading = true; state.error=undefined; state.success=false});
    builder.addCase(loadPlayers.rejected, (state) => {state.loading = false; state.error = 'Error';});
    builder.addCase(loadPlayers.fulfilled, 
        (state, { payload }) => {
       state.players=payload
       state.loading = false
       state.success = true 
    });
    

    builder.addCase(removePlayer.pending, (state) => {state.loading = true});
    builder.addCase(removePlayer.rejected, (state) => {state.loading = false; state.error = 'Error';});
    builder.addCase(removePlayer.fulfilled, 
        (state, { payload }) => {
         const newPlayers = state.players.filter(player=> player.id != payload);
         state.players = newPlayers
         state.loading = false
         state.success = true 
    });

    builder.addCase(addPlayer.pending, (state) => {state.loading = true});
    builder.addCase(addPlayer.rejected, (state) => {state.loading = false; state.error = 'Error';});
    builder.addCase(addPlayer.fulfilled, 
        (state, { payload }) => {
         const newPlayers = [...state.players,payload]
         state.players=newPlayers
         state.loading = false
         state.success = true 
    });


    builder.addCase(updatePlayer.pending, (state) => {state.loading = true});
    builder.addCase(updatePlayer.rejected, (state) => {state.loading = false; state.error = 'Error';});
    builder.addCase(updatePlayer.fulfilled, 
        (state, { payload }) => {
         const newPlayers = state.players.map(player => (player.id === payload.id) ? payload : player)
         state.players = newPlayers
         state.loading = false
         state.success = true 
    });
      
  }
})
export default playerSlice.reducer;

export const loadPlayers = createAsyncThunk<Player[], void, { rejectValue: "" }>('players/loadPlayers', async (_, thunkApi) => {
    try {
        const response = await axios.get('players/all')
        return response?.data
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.response?.data)
    }
})

export const addPlayer = createAsyncThunk<Player, NewPlayer, { rejectValue: "" }>('players/addPlayer', async (player, thunkApi) => {
    try {
        const response = await axios.post('players/new', player)
        return response?.data
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.response?.data)
    }
})

export const updatePlayer = createAsyncThunk<Player, UpdatePlayer, { rejectValue: "" }>('players/updatePlayer', async (player, thunkApi) => {
    try {
        const response = await axios.post('players/update', player)
        return response?.data
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.response?.data)
    }
})

export const removePlayer = createAsyncThunk<number, number, { rejectValue: "" }>('players/removePlayer', async (playerId, thunkApi) => {
    try {
        const response = await axios.post('players/remove', {id: playerId})
        return playerId
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.response?.data)
    }
})

