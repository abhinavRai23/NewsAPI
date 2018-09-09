import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { logger } from "redux-logger"
import promise from "redux-promise-middleware"
import reducer from "./reducers/reducers"
import { history } from "./history"
import { routerReducer, routerMiddleware } from 'react-router-redux'
const middleware = [logger, thunk, promise(), routerMiddleware(history)]
const reducers = combineReducers({ reducer, router: routerReducer })

export default createStore(reducers, {}, applyMiddleware(...middleware))