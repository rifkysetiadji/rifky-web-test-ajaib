import {createSlice,createAsyncThunk } from "@reduxjs/toolkit";
export const initialState={
    users:[],
    status:'idle'
}
const BASE_URL = 'https://randomuser.me/api/'
export const fetchUser = createAsyncThunk(
    'user/getUser',
    async (slug)=>{
        const response = fetch(`${BASE_URL}${slug}`)
            .then(response => response.json())
        return response
    }
)
export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
            .addCase(fetchUser.pending, (state,{payload})=>{
                state.status = 'loading'
            })
            .addCase(fetchUser.fulfilled, (state,{payload})=>{
                state.status = 'idle'
                state.users = payload.results
            })
            .addCase(fetchUser.rejected, (state,{payload})=>{
                state.status = 'error'
            })
    }

})

export default userSlice.reducer;