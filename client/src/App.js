import React from 'react';

import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className='app'>
      <Router>
        <div>
          <Switch>
            <Route path='/about'></Route>
            <Route path='/users'></Route>
            <Route path='/'></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
