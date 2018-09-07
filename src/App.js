import React, { Component } from "react";

import Bar from "./components/Bar";
import Form from "./components/Form";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Bar />
        <Form />
      </div>
    );
  }
}

export default App;
