import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import videoSliceReducer from './reducers/videoSlice.reducer';
import thunk from 'redux-thunk';

const reducer = combineReducers({
  videoSliceReducer
})

const store = createStore(
 reducer,
 compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
 )
)

export default store;