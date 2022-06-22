const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  msg: '',
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };

    case 'REGISTER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };

    case 'REGISTER_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        msg: action.payload.response.data,
      };

    default:
      return state;
  }
};

export default auth;
