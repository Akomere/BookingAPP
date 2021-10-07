
import SearchSlots from './Components/SearchSlots';
import Navigate from './Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import RequestSuccess from './Components/RequestSuccess';
import RequestFail from './Components/RequestFail';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router basename="/directory-name">
      <Navigate />
      <Switch>
        <Route path="/" exact component={SearchSlots} />
        <Route path="/RequestFail"  component={RequestFail} />
        <Route path="/RequestSuccess"  component={RequestSuccess} />
      </Switch>
    </Router>
  );
}

export default App;
