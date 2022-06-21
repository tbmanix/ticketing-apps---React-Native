import React from 'react';
import {WebView} from 'react-native-webview';

export default function Midtrans(props) {
  return (
    <WebView
      source={{
        uri: props.route.params.url,
      }}
    />
  );
}
