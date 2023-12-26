import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    user: null | {}
    isAuthenticated: boolean;
}

const initialState: UserState = {
    user: null,
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
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