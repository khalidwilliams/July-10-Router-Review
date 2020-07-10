import React, { Component } from 'react';
import './App.css';
import puppies from '../data/puppy-data.js';
import sharks from '../data/shark-data.js';
import Creatures from '../Creatures/Creatures';
import CreatureDetails from '../Creatures/CreatureDetails';
import Home from '../Home/Home';
import Goats from '../Goats/Goats';
import { Route,Switch, NavLink } from  'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <main className="App">
        <nav>
          <NavLink to="/puppies" className="nav">Puppies</NavLink>
          <NavLink to="/sharks" className="nav">Sharks</NavLink>
          <NavLink to="/goats" className="nav">Goats</NavLink>
        </nav>
        <h1>Puppies or Sharks?</h1>
        <Route 
          exact
          path="/puppies" 
          render={(routeProps) => <Creatures {...routeProps} name="Puppies" data={puppies}/>} 
        />
        <Route 
          path="/sharks"
          render={() => <Creatures name="Sharks" data={sharks} />}
        />
        <Route
          path="/goats"
          render={() => <Goats />}
        />
        <Route 
          exact
          path="/puppies/:puppyNumber"
          render={(routeProps) => {
            const { params } = routeProps.match;
            const { puppyNumber } = params;
            const foundPuppy = puppies.find(pup => pup.id === puppyNumber);
            return  <CreatureDetails {...routeProps} {...foundPuppy}/>
          
          }} 
          />
        <Route exact path="/" component={Home}/>
      </main>
    );
  }
}
