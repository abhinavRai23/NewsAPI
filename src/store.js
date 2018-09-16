import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { logger } from "redux-logger"
import promise from "redux-promise-middleware"
import { history } from "./history"
import { routerReducer, routerMiddleware } from 'react-router-redux'
import Filters from "./reducers/filters";

const middleware = [logger, thunk, promise(), routerMiddleware(history)]
const reducers = combineReducers({ Filters, router: routerReducer })

export const store = createStore(reducers, applyMiddleware(...middleware))