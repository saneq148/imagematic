export const getProfileInfo = state => ({
    username: state.Profile.username,
    created_at: state.Profile.created_at,
    updated_at: state.Profile.updated_at,
    first_name: state.Profile.first_name,
    last_name: state.Profile.last_name,
    phone: state.Profile.phone
});