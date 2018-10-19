import React, { Component } from 'react';
import ClickItem from '../src/components/ClickItem/ClickItem';

class App extends Component {
  //es6 - new type of class
  //component from line 1
  render() { //part of Component
    return (
      <div className="App"> 
      {/* //new name for a class */}
        <ClickItem />
      </div>
    );
  }
}

export default App;
