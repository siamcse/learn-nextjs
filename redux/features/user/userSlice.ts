import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        user: null,
        isAuthenticated: false,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;

        }
    }
})

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;