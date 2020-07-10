import React, { Component } from 'react';
import {getFox} from '../apiCalls';

class Goats extends Component {

  constructor() {
    super();
    this.state = {
      fox: null
    }
  }

  componentDidMount() {
//    fetch('http://placegoat.com/200')
//      .then(res => console.log(res));
    getFox()
      .then( fox => this.setState({fox: fox.image}))
      .catch(err => console.error(err));
  }
  
  render() {
    return (
      <section>
        <h1>Random Goat!</h1>
        {this.state.fox && <img src={this.state.fox}/>}
      </section>
    )
  }
}

export default Goats;
