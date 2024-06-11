import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
    
}

const UserSlice = createSlice({
    name:'User',
    initialState,
    reducers: {
        registerUserPending:(state) =>{
            state.loading = true;
          },
          registerUserSuccess :(state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = false;
          },
          registerUserFailure:(state, action) =>{
            state.loading = false;
            state.error = action.payload;
          },
        signInStart : (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload; //data from fetch method
            state.loading = false;
            state.error = false;
        },
        signInFailure : (state, action) => {
            state.loading = false;
            state.error = action.payload; //error message
        }, 
        signOutUser:(state) =>{
            state.currentUser = null;
            state.loading = false;
            state.error = false;
            
        }
    }
})

export const { signInStart, signInSuccess, signInFailure, signOutUser,registerUserPending, registerUserSuccess,registerUserFailure } = UserSlice.actions;
export default UserSlice.reducer;