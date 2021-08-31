import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
function App() {
  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

export default App;
