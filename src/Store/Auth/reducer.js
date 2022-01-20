import { AUTH } from "./constants";

const initialState = {
  loading: false,
  registerEventLoading: false,
  loggedIn: false,
  error: null,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH.LOGIN_WITH_EMAIL.REQUEST:
    case AUTH.LOGOUT.REQUEST:
    case AUTH.GET_USER.REQUEST:
      return {
        ...state,
        registerEventLoading: false,
        loggedIn: false,
        loading: true,
        error: null,
      };
    case AUTH.GET_USER.RESOLVED:
      return {
        ...state,
        registerEventLoading: false,
        loading: false,
        loggedIn: true,
        user: action.user,
      };
    case AUTH.GET_USER.REJECTED:
      return {
        ...state,
        registerEventLoading: false,
        loading: false,
        loggedIn: false,
        user: null,
      };
    case AUTH.REGISTER_WITH_EMAIL.REQUEST:
      return {
        ...state,
        loggedIn: false,
        registerEventLoading: true,
        loading: false,
        error: null,
      };
    case AUTH.LOGIN_WITH_EMAIL.SUCCESS:
    case AUTH.REGISTER_WITH_EMAIL.SUCCESS:
      return {
        ...state,
        registerEventLoading: false,
        loading: false,
        error: null,
      };
    case AUTH.REGISTER_WITH_EMAIL.FAILURE:
      return {
        ...state,
        registerEventLoading: false,
        loading: false,
        error: { register: action.error.message },
      };
    case AUTH.LOGIN_WITH_EMAIL.FAILURE:
      return {
        ...state,
        loading: false,
        error: { login: action.error.message },
      };
    case AUTH.LOGOUT.FAILURE:
      return {
        ...state,
        loading: false,
        error: { logout: action.error.message },
      };
    case AUTH.LOGOUT.SUCCESS:
      return {
        ...state,
        error: null,
        user: null,
        loading: false,
        loggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
