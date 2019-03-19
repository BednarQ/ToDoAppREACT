import React, { Component } from 'react';
import './App.css';
import ToDosContainer from "./ToDosContainer";
import BackgroundImagePage from "./BackgroundImagePage";
import AddTask from "./AddTask";



class App extends Component {
  render() {
    return (
      <div className="App">
          <ToDosContainer/>

      </div>

    );
  }
}

export default App;
