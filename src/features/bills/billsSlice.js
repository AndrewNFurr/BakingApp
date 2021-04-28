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

export const createBill = createAsyncThunk(
    'billsList/createBill',
    async (newBill) => {
        try {
            console.log(newBill)
            const { data } = await axios.post(
                '/api/bills/purchase',
                { newBill });
            console.log(data);
            
            return data;
        } catch(error) {
            throw error;
        }
    }
)

export const payBill = createAsyncThunk(
    'billsList/payBill',
    async (id) => {
        try {
            const { data } = await axios.delete(
                `/api/bills/${id}`
            );

            console.log(data);
            return data;
        } catch(error) {
            throw error;
        }
    }
)

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
        .addCase(createBill.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(createBill.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.bills.push(action.payload);
        })
        .addCase(createBill.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        })
        .addCase(payBill.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(payBill.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            const paid = state.bills.find((bill) => {
                bill.id === action.payload;
            });
            const idx = state.bills.indexOf(paid);
            state.bills.splice(idx, 1);
        })
        .addCase(payBill.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        })
    }
});

export const selectBills = (state) => state.billsList.bills;
export const selectCurrentBill = (state) => state.billsList.currentBill;

export default billsSlice.reducer;