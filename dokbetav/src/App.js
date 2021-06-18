import './App.css';
import Login from './components/login';
import Home from './components/home';
import Register from './components/register';
import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  const [redirect, setRedirect] = useState(0);
  console.log(redirect);
  return (
    <>
      <Router>
          <Switch>
            <Route exact path='/login'><Login redirect={redirect} setRedirect={(e) => setRedirect(e)}/></Route>
            <Route exact path='/register'><Register redirect={redirect} setRedirect={(e) => setRedirect(e)}/></Route>
            <Route exact path='/'><Home redirect={redirect} setRedirect={(e) => setRedirect(e)} /></Route>
          </Switch>
      </Router>
    </>
  );
}

export default App;
