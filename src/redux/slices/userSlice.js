import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
    name: "user",
    initialState: {
        Access: false,
    },
    reducers: {
        setAccess(state, action) {
            state.Access = action.payload;
        }
    },
});

export const { setAccess } = user.actions;

export default user.reducer;
