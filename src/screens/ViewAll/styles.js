import {StyleSheet} from 'react-native';

import React from 'react';

export default StyleSheet.create({
  listMovie: {
    padding: 10,
  },
  containerPoster: {
    // padding: 10,
    flex: 1,
    // backgroundColor: 'blue',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnPaginate: {
    marginHorizontal: 5,
    borderColor: 'black',
    borderWidth: 1,
    width: 20,
    height: 20,
    alignItems: 'center',
    borderRadius: 1,
  },
});
