import React, {useState} from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default function Input({
  label,
  iconName,
  error,
  password,
  onChangeText,
  onFocus = () => {},
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);

  const [hidePass, setHidePass] = useState(password);

  return (
    <View style={{marginVertical: 5}}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {borderColor: error ? 'red' : isFocused ? 'darkblue' : 'black'},
        ]}>
        {/* <TextInput
          secureTextEntry={props.secureTextEntry}
          // value={text}
          // onChangeText={onChangeText}
          placeholder={props.placeholder}
          style={style.textInput}
        /> */}
        <Icon name={iconName} style={style.icon} />
        <TextInput
          secureTextEntry={hidePass}
          {...props}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          style={{color: 'darkblue', flex: 1}}
          onChangeText={onChangeText}
        />
      </View>
      {error && (
        <Text style={{color: 'red', fontSize: 12, marginTop: 7}}>{error}</Text>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  icon: {
    fontSize: 22,
    color: 'darkblue',
    marginRight: 10,
  },
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: 'grey',
  },
  inputContainer: {
    borderWidth: 1,
    // borderColor: 'black',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    backgroundColor: '#e6efff',
    borderRadius: 5,
  },
});
