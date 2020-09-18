const signIn = (result) => {
    return {
        type: "SET_USER",
        user: result,
    }
}

export default signIn;