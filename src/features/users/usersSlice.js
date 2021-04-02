import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { buildHeaders, setToken } from '../../api/index';

export const loadUsers = createAsyncThunk(
    'usersList/loadUsers',
    async () => {
            const { data } = await axios.get('/api/users');
            return data;    
    }
);

export const loginUser = createAsyncThunk(
    'usersList/loginUser',
    async ({username, password}) => {
            try {
              const { data } = await axios.post(
                "/api/users/login",
                {
                  username: username,
                  password: password,
                },
                { headers: buildHeaders() }
              );
          
              if (data.token) {
                setToken(data.token);
              }
              console.log(data);
              return data;
            } catch (error) {
              throw error;
            }
    }
);

export const registerUser = createAsyncThunk(
    'usersList/registerUser',
    async (
        firstName,
        lastName,
        username,
        password,
        email,
        creditScore,
        isAdmin
    ) => {
        if (password.length < 8) {
            return {
              name: "password error",
              message: "password must be at least 8 characters long",
            };
          }

        try {
            const { data } = await axios.get(
                'api/users/register',
                {
                  firstName,
                  lastName,
                  username,
                  password,
                  email,
                  creditScore,
                  isAdmin
                },
                {headers: buildHeaders()});

            if (data.token) {
                setToken(data.token);
            }
            
          return data;
        } catch(error) {
            throw error;
        }
    }
);

export const usersSlice = createSlice({
    name: 'usersList',
    initialState: {
        isLoading: false,
        hasError: false,
        createUserIsPending: false,
        failedToCreateUser: false,
        users: [],
        currentUser: {}
      },
      reducers: {
          clearUser(state) {
              console.log(state.currentUser)
              state.currentUser = {};
              console.log('Logged out');
          }
      },
      extraReducers: (builder) => {
        builder
        .addCase(loadUsers.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(loadUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.users = action.payload;
        })
        .addCase(loadUsers.rejected, (state, action) => {
            console.log(state, 'error');
            state.isLoading = false;
            state.hasError = true;
            state.users = [];
        })
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.currentUser = action.payload;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
            state.currentUser = {};
        })
        .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.users.push(action.payload);
            state.currentUser = action.payload;
        })
        .addCase(registerUser.rejected, (state, action) => {
            console.log(state, 'error');
            state.isLoading = false;
            state.hasError = true;
            state.currentUser = {};
        })
    }
});

export const { clearUser } = usersSlice.actions;
export const selectUsers = (state) => state.usersList.users;
export const isLoadingUsers = (state) => state.usersList.isLoading;
export const selectCurrentUser = (state) => state.usersList.currentUser;


export default usersSlice.reducer