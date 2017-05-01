import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import logo from './q-baller.png';
import './App.css';
import Nav from './components/Nav';
import EventsList from './components/EventsList';
import FilterBox from './components/FilterBox';

injectTapEventPlugin();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      locations: [],
      currentLocation: null,
      sort: false
    }
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/events')
      .then(res =>  res.json())
      .then(json => {this.setState ({
        events: json,
        locations: json.map(event => event.city + ', ' + event.state)
      })
    });
  }

  setLocation(loc) {
    this.setState({
      currentLocation: loc,
    });
  }

  toggleSort() {
    this.setState({
      sort: !this.state.sort,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Nav />
          <h2>Welcome to Q</h2>
        </div>
        <p className="App-intro">
          Sign-up, stand in line, make money.
          <br />
          <br />
        </p>
        <FilterBox locations={this.state.locations} setLocation={this.setLocation.bind(this)} toggleSort={this.toggleSort.bind(this)} />
        <EventsList events={this.state.events} currentLocation={this.state.currentLocation} sort={this.state.sort}/>
      </div>
    );
  }
}

export default App;
