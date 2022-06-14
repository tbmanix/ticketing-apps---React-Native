import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';

import styles from './styles';
import Input from '../../components/input';
import Btn from '../../components/button';

function RegisterScreen(props) {
  const handleLogin = () => {
    props.navigation.navigate('AppScreen', {
      screen: 'Home',
    });
  };

  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState(null);

  // dengan kelas yang sama
  const handleRegister = () => {
    props.navigation.navigate('Register');
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 10,
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <Image
        source={require('../../assets/img/Vector.svg')}
        // style={{width: 60, height: 100, backgroundColor: 'blue'}}
      />
      <Text style={{color: 'black', fontSize: 40, fontWeight: 'bold'}}>
        Sign Up
      </Text>
      <Text>
        Sign in with your data that you entered during your registration
      </Text>
      <View style={{marginVertical: 20}}>
        <Input
          placeholder="input your First Name"
          label="First Name"
          iconName="email-outline"
        />
        <Input
          placeholder="input your Last Name"
          label="Last Name"
          iconName="email-outline"
        />
        <Input
          placeholder="input your Phone Number"
          label="Phone Number"
          iconName="email-outline"
        />
        <Input
          placeholder="input your email"
          label="Email"
          iconName="email-outline"
        />
        <Input
          placeholder="input your password"
          label="Password"
          iconName="key-outline"
          // secureTextEntry={true}
          password
        />
      </View>
      <Btn text="Sign Up" onPress={handleLogin} />
    </ScrollView>
  );
}

export default RegisterScreen;
