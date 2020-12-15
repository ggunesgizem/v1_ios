import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-select/dist/react-select.css'
import './config/apiConfiguration'
import { store, history } from './store'
import { Router, Route } from 'react-router'
import './index.css'
import './pages/page.css'
import App from './pages/App'

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
      </Route>
    </Router>
  </Provider>
, document.getElementById('root'))
