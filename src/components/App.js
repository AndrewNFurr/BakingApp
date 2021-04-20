import React, { useState, useEffect } from 'react';

import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
  } from "react-router-dom";

  import { 
      Users,
      HomePageContainer,
      Cards,
      AccountsContainer,
      BillsContainer
    } from '../features/index';
  import {
      Header,
      Modals,
      PurchaseForm
  } from './index';


  const App = () => {
    return (
    <Router>
        <div className='app'>
            <Header />
            <Switch>
                <Route exact path='/'>
                    <HomePageContainer />
                </Route>
                <Route exact path='/users'>
                    <h1>Users</h1>
                    <Users />
                </Route>
                <Route exact path='/cards'>
                    <Cards />
                    <Modals />
                </Route>
                <Route exact path='/accounts'>
                    <h1>Accounts</h1>
                    <AccountsContainer />
                </Route>
                <Route exact path='/bills'>
                    <BillsContainer />
                </Route>
                <Route exact path='/bills/purchase'>
                    <PurchaseForm />
                </Route>
            </Switch>
        </div>
    </Router>
    )
};

export default App;
