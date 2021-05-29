import './App.css';
import Login from './components/login';
import Home from './components/home';
import Register from './components/register';
import {BrowserRouter as Router, Switch, Route, BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/' component={Home} />
          </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
