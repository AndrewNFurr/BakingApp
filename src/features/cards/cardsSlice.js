import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const loadCards = createAsyncThunk(
    'cardsList/loadCards',
    async () => {
            const { data } = await axios.get('/api/cards');
            console.log(data);
            return data;
    }
);

export const cardsSlice = createSlice({
    name: 'cardsList',
    initialState: {
        isLoading: false,
        hasError: false,
        createUserIsPending: false,
        failedToCreateUser: false,
        cards: [],
        currentCard: {}
      },
    reducers: {
        clearCards(state) {
            console.log(state.cards)
            state.cards = [];
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadCards.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(loadCards.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.cards = action.payload;
        })
        .addCase(loadCards.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
            state.cards = [];
        });
    }
});

export const selectCards = (state) => state.cardsList.cards;

export default cardsSlice.reducer

