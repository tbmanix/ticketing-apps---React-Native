import {StyleSheet} from 'react-native';

import React from 'react';

export default StyleSheet.create({
  container: {
    // padding: 10,
  },
  bannerText: {
    padding: 10,
    height: 130,
    // backgroundColor: 'blue',
    justifyContent: 'center',
  },
  bannerImage: {
    flexDirection: 'row',
    // backgroundColor: 'blue',
    justifyContent: 'space-between',
    height: 450,
    padding: 20,
    marginVertical: 30,
  },

  // nowShowing
  nowShowing: {
    backgroundColor: '#d6d8e7',
    padding: 10,
  },
  card: {
    padding: 10,
    backgroundColor: 'white',
    maxWidth: 170,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  poster: {
    width: 140,
    borderRadius: 10,
  },

  // upComing
  upComing: {
    padding: 10,
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

  // Join
  join: {
    padding: 10,
    alignItems: 'center',
  },
});
