import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loginModal: false,
    accountCardsModal: false,
    showModal: false
}

export const modalsSlice = createSlice({
    name: 'modalsList',
    initialState,
    reducers: {
        toggleAccountCardsModal(state) {
            state.accountCardsModal = !accountCardsModal;
        }
    },
});

export const { toggleAccountCardsModal } = modalsSlice.actions;
export const accountCardsModalStatus = (state) => state.modalsList.accountCardsModal;
export const showModalStatus = (state) => state.modalsList.showModal;
export default modalsSlice.reducer;