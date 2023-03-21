const initState = [null, 0]

function AuthReducer(state = initState, action) {

    switch(action.type) {
        case "login":
            state[0] = action.data.un;
            state[1] = action.data.role;
            return state;
        case "logout":
            return [null, 0];
        default:
            return state;
    }

}

export default AuthReducer;