import { legacy_createStore as createStore, applyMiddleware, thunk } from 'redux';

const store = createStore(applyMiddleware(thunk))


export default store