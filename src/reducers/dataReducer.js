export const dataReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROFILE":
      return { ...state, profile: action.payload };
    case "UPDATE_PROFILE":
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
