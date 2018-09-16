import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { logger } from "redux-logger"
import promise from "redux-promise-middleware"
import { history } from "./history"
import { routerReducer, routerMiddleware } from 'react-router-redux'
import Filters from "./reducers/filters";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
}

const middleware = [logger, thunk, promise(), routerMiddleware(history)]
const reducers = combineReducers({ Filters, router: routerReducer })
const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(persistedReducer, applyMiddleware(...middleware))
export const persistor = persistStore(store)