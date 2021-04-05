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
        toggleShowModal(state) {
            state.showModal = !state.showModal;
        },

        toggleAccountCardsModal(state) {
            state.accountCardsModal = !state.accountCardsModal;
        }
    },
});

export const { toggleAccountCardsModal, toggleShowModal } = modalsSlice.actions;
export const accountCardsModalStatus = (state) => state.modalsList.accountCardsModal;
export const showModalStatus = (state) => state.modalsList.showModal;
export default modalsSlice.reducer;