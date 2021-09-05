import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Navbar} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
