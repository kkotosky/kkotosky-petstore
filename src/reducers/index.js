import { combineReducers } from 'redux';
import { petHandling } from '../pets/reducers/view-reducers';
import { petCreation } from '../pets/reducers/create-reducers';

const rootReducer = combineReducers({
  petHandling,
  petCreation
});

export default rootReducer;
