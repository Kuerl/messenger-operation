import './App.css';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './components/MainPage.js';
import Chatting from './components/Chatting.js'
import './stylesheets/global.css';

function App() {
  return (
    <>
      <Switch>
          <Route path="/" component={LoginPage} exact />
          <Route path="/c" component={Chatting} />
    		  <Route path="/cw" component={CallWin} />
      </Switch>
    </>
  );
}

export default App;
