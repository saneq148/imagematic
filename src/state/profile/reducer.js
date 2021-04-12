import * as types from "./types";

const initialState = {
    username: null,
    created_at: null,
    updated_at: null,
    first_name: null,
    last_name: null,
    phone: null
};

const Profile = (state = initialState, action) => {

    const { type, payload } = action;

    switch (type) {
        case types.SET_PROFILE:
            return {
                ...state,
                username: payload.username,
                created_at: payload.created_at,
                first_name: payload.first_name,
                last_name: payload.last_name,
                phone: payload.phone,
                updated_at: payload.updated_at
            };
        default:
            return {
                ...state,
            };
    }

};

export default Profile;