import { createSlice } from '@reduxjs/toolkit';

const serviceSlice = createSlice({
    name: 'service',
    initialState: {
        openAddPostModal: false,
        openEditProfileModal: false,
        anchorE1: null,
        anchorE2: null,
        darkMode: false,

    },
    reducers: {

        setOpenAddPostModal: (state, action) => {
            state.openAddPostModal = action.payload;
        },

        setOpenEditProfileModal: (state, action) => {
            state.openEditProfileModal = action.payload;
        },

        toggleMainMenu: (state, action) => {
            state.anchorE1 = action.payload;
        },

        toggleMyMenu: (state, action) => {
            state.anchorE2 = action.payload;
        },

        toggleColorMode : (state) =>{
            state.darkMode = !state.darkMode;
        }

    }
    });

export const { 
    setOpenAddPostModal, 
    setOpenEditProfileModal, 
    toggleMainMenu , 
    toggleMyMenu,
    toggleColorMode,
} = serviceSlice.actions;

export default serviceSlice.reducer;