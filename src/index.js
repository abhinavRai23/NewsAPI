import React from "react"
import ReactDOM from "react-dom"
import App from "./routes.js"
import style from "./sass/style.scss"
import { Provider } from "react-redux"
import store from './store'
import { history } from './history'
import { ConnectedRouter as Router } from 'react-router-redux'

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
), document.getElementById('main'));