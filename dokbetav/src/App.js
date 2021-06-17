import './App.css';
import Login from './components/login';
import Home from './components/home';
import Register from './components/register';
import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/' component={Home} />
          </Switch>
      </Router>
    </>
  );
}

export default App;
