import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import AddressForm from '../src/components/addressform/AddressBook'
import Home from '../src/components/homePage/HomePage';
import Update from './components/homePage/Update';

export default class AppRouter extends React.Component {
    render () {
      return (
        <div className="app-main">
          <Router>
            <div className="App">
              <Route path="/AddressForm" component={AddressForm} exact></Route>
              <Route path="/" component={Home} exact></Route>
              <Route path="/Update" component={Update} exact ></Route>
            </div>
          </Router>
        </div>
      );
    }
  }