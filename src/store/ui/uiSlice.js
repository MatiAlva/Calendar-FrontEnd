

import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModelOpen: false
    },
    reducers: {
        onOpenDateModal: (state) => {
            state.isDateModelOpen = true
        },
        onCloseDateModal: (state) => {
            state.isDateModelOpen = false
        },
    }
});


//Action creators are generated for each case reducer function
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;