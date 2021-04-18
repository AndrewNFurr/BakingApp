import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import usersReducer from './features/users/usersSlice';
import cardsReducer from './features/cards/cardsSlice';
import accountsReducer from './features/accounts/accountSlice';
import modalsReducer from './features/modals/modalsSlice';
import billsReducer from './features/bills/billsSlice';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const rootReducer = combineReducers({
    usersList: usersReducer,
    cardsList: cardsReducer,
    accountsList: accountsReducer,
    modalsList: modalsReducer,
    billsList: billsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      })
});