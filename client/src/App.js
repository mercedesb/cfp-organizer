import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    data: ''
  };
   componentDidMount() {
    this.callApi()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
   callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
     if (response.status !== 200) throw Error(body.message);
     return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.state.data}
        </p>
      </div>
    );
  }
}

export default App;
