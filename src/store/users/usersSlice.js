import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
  users: [],
  isLoading: false,
  error: undefined,
}

const url = 'https://randomuser.me/api/?results=5'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (thunkAPI) => {
  let resp = []
  try {
    const response = await fetch(url);
    const data = await response.json();

    resp = Object.entries(data);
    return resp;
  
  } catch(err) {
    console.log(err);
    return thunkAPI.rejectWithValue('something went wrong')
  }

})

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload[0][1];
    })
    .addCase(fetchUsers.rejected, (state) => {
      state.isLoading = false;
      state.error = 'ERROR - Rejected'
    })    
  },
})

export default usersSlice.reducer;