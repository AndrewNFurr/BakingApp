import React from "react";
import ReactDOM from "react-dom";
import App  from "./components/App";
import { Provider } from 'react-redux'
import store  from './store'
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import {
    persistStore,
  } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

let persistor = persistStore(store)

ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
    document.getElementById("root")
);
