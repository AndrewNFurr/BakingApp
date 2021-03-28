import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
  } from "react-router-dom";

  import { 
      Users 
    } from '../features/index';
  import {
      Header,
      HomePage
  } from './index';

  const App = () => {
    return (
    <Router>
        <div className='app'>
            <Header />
            <Switch>
                <Route exact path='/'>
                    <HomePage />
                </Route>
                <Route exact path='/users'>
                    <h1>Users</h1>
                    <Users />
                </Route>
            </Switch>
        </div>
    </Router>
    )
};

export default App;
