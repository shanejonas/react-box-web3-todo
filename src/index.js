import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './App'
import { Provider } from 'react-redux'
import reducers from './reducers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

let store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>
  ,
  document.getElementById('root')
);
