import {combineReducers} from 'redux';

import authReducer from './authReducer';
import invoiceReducer from './invoiceReducer';

const appReducer = combineReducers({
  auth: authReducer,
  invoiceData: invoiceReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
