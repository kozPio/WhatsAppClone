const initialState = {
    user: null,
}

const loginReducer = (state = initialState.user, action) => {
    switch (action.type) {

        case "SET_USER":
            state = action.user
            return state

        default:
            return state
    }
}
export default loginReducer;