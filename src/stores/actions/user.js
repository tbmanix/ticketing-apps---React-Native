import axios from '../../utils/axios';

export const getUserById = id => {
  return {
    type: 'GET_USER_BY_ID',
    payload: axios.get(`user/id/${id}`),
  };
};

export const updateProfile = (id, data) => {
  return {
    type: 'PATCH_PROFILE_BY_ID',
    payload: axios.patch(`user/profile/${id}`, data),
  };
};

export const updatePassword = (id, data) => {
  return {
    type: 'PATCH_PASSWORD_BY_ID',
    payload: axios.patch(`user/password/${id}`, data),
  };
};

export const updateAvatar = (id, data) => {
  return {
    type: 'PATCH_AVATAR_BY_ID',
    payload: axios.patch(`user/image/${id}`, data),
  };
};

export const deleteAvatar = (id, data) => {
  return {
    type: 'DELETE_AVATAR_BY_ID',
    payload: axios.patch(`user/delete-image/${id}`, data),
  };
};
