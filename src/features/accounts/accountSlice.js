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


export const accountsSlice = createSlice({
    name: 'accountsList',
    initialState: {
        isLoading: false,
        hasError: false,
        createUserIsPending: false,
        failedToCreateUser: false,
        accounts: [],
        currentAccount: {}
      },
    reducers: {
        clearAccount(state) {
            console.log(state.accounts)
            state.accounts = [];
        },
        setCurrentAccount(state, account={}) {
            state.currentAccount = account.payload;
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
        });
    }
});

export const { setAccountCards, setCurrentAccount } = accountsSlice.actions
export const selectAccounts = (state) => state.accountsList.accounts;

export default accountsSlice.reducer