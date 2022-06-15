import {StyleSheet} from 'react-native';

import React from 'react';

export default StyleSheet.create({
  listMovie: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  btnMonth: {
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    width: 80,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue',
    borderColor: '#5f2eea',
  },
  containerPoster: {
    // padding: 10,
    flex: 1,
    // backgroundColor: 'blue',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
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
