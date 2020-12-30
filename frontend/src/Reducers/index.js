import { combineReducers} from 'redux';

// Import all the reducers here
import auth from './auth';
import alert from './alert';


const rootReducer = combineReducers({
    auth,
    alert,
});

export default rootReducer;