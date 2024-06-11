import { combineReducers,configureStore } from '@reduxjs/toolkit'
import UserReducer from './user/UserSlice.js'

import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

//we using combiner method with the help of this method we can combine different reducers


const persistConfig = {
  key : 'root',
  version: 1,
  storage,
}
const rootReducer = combineReducers({User : UserReducer})



const persistedReducer = persistReducer(persistConfig, rootReducer)



export const store = configureStore({
  // reducer: { User : UserReducer}, //add those reducer here
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
})



//allows the state in a Redux store to persist across browser and app sessions, improving user experience by pre-loading the store with persistent data.
//need to add this persist store inside main.js

//import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../Features/Auth/AuthSlice.js'
// import storage from 'redux-persist/lib/storage'
// import {persistReducer} from 'redux-persist'
// import { combineReducers } from '@reduxjs/toolkit';



// const persistConfig = {
//     key:"root",
//     version:1,
//     storage
// }

// const reducer = combineReducers({
//     auth: authReducer,

// })

// const presistedReducer = persistReducer(persistConfig, reducer);

// export const store = configureStore({
//   reducer: presistedReducer,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware({
//         serializableCheck: false,
//       })
//     // Add other reducers here
 
// });