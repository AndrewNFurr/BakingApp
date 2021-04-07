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

export const getCurrentCard = createAsyncThunk(
    'cardsList/getCurrentCard',
    async (id) => {
        console.log(id)
        const { data } = await axios.get(
            `/api/cards/${id}`,  
            { headers: buildHeaders() }
        );
        console.log(data);
        return data;
    }
)

export const addCardToAccount = createAsyncThunk(
    'accountsList/addCardToAccount',
    async (card) => {
        try {
            const { data } = await axios.post(
                `/api/accounts/${card.accountId}/cards`,
                { headers: buildHeaders() }
            );
            console.log(data);
            return data;
        } catch(error) {
            throw error;
        }
    }
);

export const cardsSlice = createSlice({
    name: 'cardsList',
    initialState: {
        isLoading: false,
        hasError: false,
        addcardIsPending: false,
        failedToAddCard: false,
        cards: [],
        currentCard: {},
        byAccountId: {}
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
        })
        .addCase(getCurrentCard.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(getCurrentCard.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.currentCard = action.payload;
        })
        .addCase(getCurrentCard.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
            state.currentCard = {};
        })
        .addCase(addCardToAccount.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(addCardToAccount.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.byAccountId[action.payload.accountId].push(action.payload);
        })
        .addCase(addCardToAccount.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        });
    }
});

export const selectCards = (state) => state.cardsList.cards;
export const selectCurrentCard = (state) => state.cardsList.currentCard;
export const selectAccountCards = (state) => state.cardsList.byAccountId;

export default cardsSlice.reducer

