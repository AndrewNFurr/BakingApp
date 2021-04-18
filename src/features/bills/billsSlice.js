import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const loadBills = createAsyncThunk(
    'billsList/loadBills',
    async () => {
            const { data } = await axios.get('/api/bills');
            console.log(data);
            return data;
    }
);

export const billsSlice = createSlice({
    name: 'billsList',
    initialState: {
        bills: [],
        currentBill: {},
        isLoading: false,
        hasError: false,
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadBills.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(loadBills.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.bills = action.payload;
        })
        .addCase(loadBills.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
            state.bills = [];
        })
    }
});

export const selectBills = (state) => state.billsList.bills;
export const selectCurrentBill = (state) => state.billsList.currentBill;

export default billsSlice.reducer;