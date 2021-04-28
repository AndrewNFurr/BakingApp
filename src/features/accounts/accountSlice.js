import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { buildHeaders, setToken } from '../../api/index';
import { selectAccountCards } from '../cards/cardsSlice'


export const loadAccounts = createAsyncThunk(
    'accountsList/loadAccounts',
    async (id) => {
            const { data } = await axios.get(
                '/api/accounts', 
                { params: { id } }, 
                { headers: buildHeaders() }
            );
            console.log(data);
            return data;
    }
);

export const chargeAccount = createAsyncThunk(
    'accountsList/chargeAccount',
    async ({newBalance, account}) => {
        try {
            console.log(newBalance, account);
            const { data } = await axios.patch(
                `/api/accounts/${account.id}/bills`,
                { newBalance },
            );

            console.log(data);
            return data;
        } catch(error) {
            throw error;
        }
    }
)


export const accountsSlice = createSlice({
    name: 'accountsList',
    initialState: {
        isLoading: false,
        hasError: false,
        createUserIsPending: false,
        failedToCreateUser: false,
        accounts: [],
        currentAccount: {},
        overDraft: false
      },
    reducers: {
        clearAccount(state) {
            console.log(state.accounts)
            state.accounts = [];
        },
        setCurrentAccount(state, account={}) {
            state.currentAccount = account.payload;
        },
        setOverDraft(state) {
            state.overDraft = !state.overDraft;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadAccounts.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(loadAccounts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.accounts = action.payload;
        })
        .addCase(loadAccounts.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
            state.accounts = [];
        })
        .addCase(chargeAccount.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(chargeAccount.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.currentAccount.balance = action.payload.balance;
        })
        .addCase(chargeAccount.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        });
    }
});

export const { setAccountCards, setCurrentAccount, setOverDraft } = accountsSlice.actions;
export const selectAccounts = (state) => state.accountsList.accounts;
export const selectCurrentAccount = (state) => state.accountsList.currentAccount;
export const isOverDraft = (state) => state.accountsList.overDraft;

export default accountsSlice.reducer