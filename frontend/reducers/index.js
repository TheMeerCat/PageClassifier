import {combineReducers} from 'redux';
import {bylineReducer} from './bylineReducer';

export default combineReducers({
	bylineReducer: bylineReducer
});
