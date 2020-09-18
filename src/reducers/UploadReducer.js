const initialstate = {
    upload: false,
}


const uploadReducer = (state = initialstate.upload, action) => {
    switch (action.type) {
        case "SET__UPLOAD":
            state = action.upload;
            return state;
        default:
            return state;
    }
}



export default uploadReducer;