import React, { Component } from 'react';

import Dashboard from './Components/Dashboard/Dashboard';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <Dashboard />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
