const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  msg: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_BY_ID_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };

    case 'GET_USER_BY_ID_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };

    case 'GET_USER_BY_ID_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        pageInfo: {},
        msg: action.payload.response.data,
      };

    case 'PATCH_PROFILE_BY_ID_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };

    case 'PATCH_PROFILE_BY_ID_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: [{...state.data[0], ...action.payload.data.data}],
        msg: action.payload.data.msg,
      };

    case 'PATCH_PROFILE_BY_ID_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        pageInfo: {},
        msg: action.payload.response.data,
      };

    case 'PATCH_AVATAR_BY_ID_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };

    case 'PATCH_AVATAR_BY_ID_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: [{...state.data[0], ...action.payload.data.data}],
        msg: action.payload.data.msg,
      };

    case 'PATCH_AVATAR_BY_ID_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        pageInfo: {},
        msg: action.payload.response.data,
      };

    case 'PATCH_PASSWORD_BY_ID_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };

    case 'PATCH_PASSWORD_BY_ID_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };

    case 'PATCH_PASSWORD_BY_ID_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data,
      };

    default:
      return state;
  }
};

export default user;
