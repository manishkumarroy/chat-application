import { combineReducers } from 'redux'
import authReducer from './authReducer'
import chatScreenChanger from './transitionReducer'
import messageReducer from './messageReducer'
import sideBarChangerReducer from './sideBarChangeReducer'
export default combineReducers({
    user: authReducer,
    messageDetails: messageReducer,
    chatScreenChanger,
    sideBarChanger: sideBarChangerReducer

})
