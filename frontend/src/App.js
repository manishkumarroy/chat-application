import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import './App.css';

import Login from './components/Login';
import SignUp from './components/SignUp';
import ChatWindow from './components/ChatWindow/ChatWindow';
import { Provider } from 'react-redux'
import store from './store'



function App() {


  return (

    <Router>
      <Provider store={store}>
        <div className="App">
          <Switch >
            <Route exact path="/" component={Login} />

            <Route exact path="/signup">
              <SignUp />
            </Route>

            <Route exact path="/chat" component={ChatWindow} />

          </Switch>


        </div>
      </Provider>
    </Router>
  );
}

export default App;
