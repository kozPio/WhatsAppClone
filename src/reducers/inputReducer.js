const inititalState = {
    input: ''
}


const inputReducer = (state = inititalState.input, action) => {
    switch (action.type) {
        case "SET_INPUT":
            state = action.input;
            return state;
        default:
            return state
    }
}


export default inputReducer;