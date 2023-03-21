const initState = "This is a Login Page"

function NavReducer(state = initState, action) {

    switch(action.type) {
        case "change":
            return action.data;
        default:
            return state;
    }

}

export default NavReducer;