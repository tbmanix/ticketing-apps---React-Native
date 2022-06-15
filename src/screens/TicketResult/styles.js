import {StyleSheet} from 'react-native';

import React from 'react';

export default StyleSheet.create({
  container: {
    backgroundColor: '#e5e5e5',
  },
  radiusLeftTop: {
    width: 50,
    height: 50,
    backgroundColor: '#e5e5e5',
    position: 'absolute',
    top: -25,
    left: -25,
    borderRadius: 50,
    zIndex: 99,
  },
  radiusRightTop: {
    width: 50,
    height: 50,
    backgroundColor: '#e5e5e5',
    position: 'absolute',
    top: -25,
    right: -25,
    borderRadius: 50,
    zIndex: 99,
  },
  radiusLeftBottom: {
    width: 50,
    height: 50,
    backgroundColor: '#e5e5e5',
    position: 'absolute',
    bottom: -25,
    left: -25,
    borderRadius: 50,
    zIndex: 99,
  },
  radiusRightBottom: {
    width: 50,
    height: 50,
    backgroundColor: '#e5e5e5',
    position: 'absolute',
    bottom: -25,
    right: -25,
    borderRadius: 50,
    zIndex: 99,
  },
});
