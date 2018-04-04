import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { Route, Router } from 'react-router';

import toggleReducer from './Components/SharkCatToggle/reducers';
import dashboardReducer from './Components/Dashboard/reducers';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  dashboardReducer,
  toggleReducer,
  router: routerReducer
});

const history = createHistory();

const reactRouterMiddleware = routerMiddleware(history);
const store = createStore(rootReducer, applyMiddleware(reactRouterMiddleware, thunk));

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={history}>
        <div>
          <Route exact path='/' component={App} />
        </div>
      </Router>
    </Provider>
  </MuiThemeProvider>, 
  document.getElementById('root')
);
registerServiceWorker();
