const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  pageInfo: {},
  msg: '',
};

const booking = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BOOKING_BY_ID_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };

    case 'GET_BOOKING_BY_ID_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        pageInfo: action.payload.data.pagination,
        msg: action.payload.data.msg,
      };

    case 'GET_BOOKING_BY_ID_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        pageInfo: {},
        msg: action.payload.response.data,
      };

    default:
      return state;
  }
};

export default booking;
