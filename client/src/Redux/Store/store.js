import { applyMiddleware, legacy_createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from "../Reducer/reducer";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))

// The store now has the ability to accept thunk functions in `dispatch`
const store = legacy_createStore(rootReducer, composedEnhancer)
export default store