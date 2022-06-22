import axios from '../../utils/axios';

export const getBookingById = id => {
  return {
    type: 'GET_BOOKING_BY_ID',
    payload: axios.get(`booking/user/${id}`),
  };
};
