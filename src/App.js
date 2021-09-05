import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Registration from './components/registration/Registration';
function App() {
  return (
    <div className="App">
      <Registration/>
    </div>
  );
}

export default App;
