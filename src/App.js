import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Login from './pages/Login';
import Registration from './components/registration/Registration';
import RegistrationSuccess from './components/registration/RegistrationSuccess';
import axios from 'axios';
function App() {
  axios.defaults.adapter = require('axios/lib/adapters/http');
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Registration} />
            <Route exact path="/registration_success" component={RegistrationSuccess} />
            <Route exact path="/" component={Navbar} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
