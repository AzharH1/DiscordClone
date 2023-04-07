import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  serverId: null
} 

const userSlice = createSlice({
  name: "server",
  initialState,
  reducers: {
    setServerId: (state, action) => {
        state.serverId = action.payload.serverId
    }
  }
});

export const {setServerId} = userSlice.actions

export default userSlice.reducer