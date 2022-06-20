import React from 'react';
import {View, Text, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {increaseCounter, decreaseCounter} from '../../stores/actions/counter';

export default function Counter() {
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30}}>{counter.count}</Text>
      <Button title="Increase" onPress={() => dispatch(increaseCounter())} />
      <Button
        title="Decrease -2"
        onPress={() => dispatch(decreaseCounter(2))}
      />
      <Button title="Reset" onPress={() => dispatch({type: 'RESET'})} />
    </View>
  );
}
