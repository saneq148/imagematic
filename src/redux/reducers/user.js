const initialState = {
    isLoggedIn: false,
};

const user = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                isLoggedIn: action.payload,
            };
        default:
            return state;
    }
};

export default user;