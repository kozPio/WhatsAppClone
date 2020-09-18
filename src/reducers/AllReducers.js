import loginReducer from './LoggedIn';
import inputReducer from './inputReducer'
import uploadReducer from './UploadReducer'
const { combineReducers } = require("redux");

const allReducers = combineReducers({
    user: loginReducer,
    input: inputReducer,
    uploadWindow: uploadReducer
});



export default allReducers;