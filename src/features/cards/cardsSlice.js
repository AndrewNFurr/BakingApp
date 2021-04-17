import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const loadCards = createAsyncThunk(
    'cardsList/loadCards',
    async () => {
            const { data } = await axios.get('/api/cards');
            return data;
    }
);

export const loadAccountCards = createAsyncThunk(
    'cardsList/loadAccountCards',
    async () => {
            const { data } = await axios.get('/api/account_cards');
            return data;
    }
);

export const getCurrentCard = createAsyncThunk(
    'cardsList/getCurrentCard',
    async ({id}) => {
        const { data } = await axios.get(
            `/api/cards/${card}`,
            { cardId: id }
        );
        return data;
    }
)

export const addCardToAccount = createAsyncThunk(
    'accountsList/addCardToAccount',
    async (card) => {
        try {
            const {
                cardId,
                accountId,
                type,
                availableCredit,
                active
            } = card;
            const { data } = await axios.post(
                `/api/accounts/${card.accountId}/cards`,
                {   cardId,
                    accountId,
                    type,
                    availableCredit,
                    active 
                },
            );
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
            state.cards = [];
        },
        setCurrentCard(state, card={}) {
            state.currentCard = card.payload;
        },
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
        .addCase(loadAccountCards.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(loadAccountCards.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.byAccountId[action.payload.accountId] = action.payload;
        })
        .addCase(loadAccountCards.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
            state.byAccountId = {};
        })
        .addCase(addCardToAccount.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(addCardToAccount.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.byAccountId[action.payload.accountId].push(action.payload.cards);
        })
        .addCase(addCardToAccount.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        });
    }
});

export const { setCurrentCard, setAccountCards } = cardsSlice.actions
export const selectCards = (state) => state.cardsList.cards;
export const selectCurrentCard = (state) => state.cardsList.currentCard;
export const selectAccountCards = (state) => state.cardsList.byAccountId;

export default cardsSlice.reducer

