// import { createStore, applyMiddleware } from "redux"
// import thunk from "redux-thunk"
// import { reducer } from "./reducer"
// import { composeWithDevTools } from "redux-devtools-extension"

// const store = createStore(
//     reducer,
//     composeWithDevTools(applyMiddleware(thunk))
// );

import { configureStore } from '@reduxjs/toolkit'

import { rootReducer } from './reducer'

const store = configureStore({ reducer: rootReducer })
// The store now has redux-thunk added and the Redux DevTools Extension is turned on

export default store;