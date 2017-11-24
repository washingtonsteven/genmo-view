import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Admin from './Admin';
import registerServiceWorker from './registerServiceWorker';
import {
  Route,
  Link,
  HashRouter as Router
} from 'react-router-dom';

class Main extends Component {
  render() {
    return(
      <Router>
        <div>
          <ul className="nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/admin">Admin</Link></li>
          </ul>
          <Route exact path="/" component={App} />
          <Route path="/admin" component={Admin} />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));

registerServiceWorker();
