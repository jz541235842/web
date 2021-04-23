import {createStore,applyMiddleware,compose} from "redux";
import {createLogger} from "redux-logger"
import  thunk from "redux-thunk"
import reducers from "../store/reducers"
const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose
const loggerMiddleware=createLogger();
const store=createStore(reducers,
    process.env.NODE_ENV==='development'?composeEnhancers(applyMiddleware(thunk,loggerMiddleware)):composeEnhancers(applyMiddleware(thunk))
    )

    export default store;