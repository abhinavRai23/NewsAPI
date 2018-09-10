import React from "react"
import ReactDOM from "react-dom"
import App from "./routes.js"
import style from "./sass/style.scss"
import { Provider } from "react-redux"
import { store, persistor } from './store'
import { history } from './history'
import { ConnectedRouter as Router } from 'react-router-redux'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render((
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <App />
      </Router>
    </PersistGate>
  </Provider>
), document.getElementById('main'));