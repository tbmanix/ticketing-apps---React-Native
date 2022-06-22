import {StyleSheet} from 'react-native';

import React from 'react';

export default StyleSheet.create({
  container: {
    // padding: 10,
  },
  bannerText: {
    padding: 20,
    height: 130,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  bannerImage: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    height: 500,
    padding: 20,
    paddingTop: 20,
    // marginVertical: 30,
  },
  // nowShowing
  nowShowing: {
    backgroundColor: '#d6d8e7',
    padding: 20,
  },

  textMedium: {
    fontSize: 20,
    color: '#5f2eea',
    fontWeight: '600',
  },
  textNormalPurple: {
    // fontSize: 20,
    color: '#5f2eea',
    fontWeight: '600',
  },
  textLink: {
    justifyContent: 'center',
  },
  textTitle: {
    // fontSize: '20',
    fontWeight: '600',
    fontSize: 18,
    color: 'black',
    letterSpacing: 1,
    marginVertical: 10,
  },
  textGenre: {
    fontSize: 12,
    marginBottom: 20,
  },

  card: {
    padding: 20,
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
    padding: 20,
    backgroundColor: 'white',
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
    marginTop: 20,
  },
  btnMonthActive: {
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    width: 80,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    borderColor: '#5f2eea',
    marginTop: 20,
  },

  // Join
  join: {
    padding: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    height: 400,
  },
  focusedButton: {
    backgroundColor: 'purple',
  },
});
