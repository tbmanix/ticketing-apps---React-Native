import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  TextInput,
  Image,
} from 'react-native';
import axios from '../../utils/axios';

import styles from './styles';
import Input from '../../components/input';
import Btn from '../../components/button';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginScreen(props) {
  // // console.log(props);
  // const handleLogin = () => {
  //   props.navigation.navigate('AppScreen', {
  //     screen: 'Home',
  //   });
  // };

  // const [text, onChangeText] = React.useState('');
  // const [number, onChangeNumber] = React.useState(null);

  // dengan kelas yang sama
  const handleRegister = () => {
    props.navigation.navigate('Register');
  };

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    try {
      console.log(form);
      const result = await axios.post('auth/login', form);
      await AsyncStorage.setItem('id', result.data.data.id);
      await AsyncStorage.setItem('token', result.data.data.token);
      await AsyncStorage.setItem('refreshToken', result.data.data.refreshToken);
      // console.log(result.data.data);
      props.navigation.navigate('AppScreen', {
        screen: 'Home',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeForm = (text, name) => {
    setForm({...form, [name]: text});
  };
  // console.log(form);

  return (
    // <View style={{backgroundColor: 'blue'}}>
    <SafeAreaView
      style={{
        flex: 1,
        padding: 10,
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      {/* <View style={styles.container}>
        <View style={{flex: 1, backgroundColor: 'green'}}>
          <Text>Left</Text>
        </View>
        <View style={{flex: 1, backgroundColor: 'yellow'}}>
          <Text>Right</Text>
        </View>
      </View>
      <View style={styles.container2}>
        <Text style={styles.textHeader}>Login Screen</Text>
      </View>
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text>Register</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity
        style={{
          backgroundColor: 'darkblue',
          padding: 10,
          borderRadius: 10,
          width: '50%',
          alignSelf: 'center',
        }}>
        <Text style={{color: 'white'}}>Login</Text>
      </TouchableOpacity> */}

      <Image
        source={require('../../assets/img/Vector.svg')}
        // style={{width: 60, height: 100, backgroundColor: 'blue'}}
      />
      <Text style={{color: 'black', fontSize: 40, fontWeight: 'bold'}}>
        Sign In
      </Text>
      <Text>
        Sign in with your data that you entered during your registration
      </Text>
      <View style={{marginVertical: 20}}>
        <Input
          placeholder="input your email"
          label="Email"
          iconName="email-outline"
          onChangeText={text => handleChangeForm(text, 'email')}
        />
        <Input
          placeholder="input your password"
          label="Password"
          iconName="key-outline"
          // secureTextEntry={true}
          onChangeText={text => handleChangeForm(text, 'password')}
          password
        />
      </View>
      <Btn text="Sign In" onPress={handleLogin} />
      <Text>
        Forgot your password?
        <TouchableOpacity onPress={handleRegister} style={{paddingStart: 5}}>
          <Text>Reset Now</Text>
        </TouchableOpacity>
      </Text>
      <Text>
        Don't have a account?
        <TouchableOpacity onPress={handleRegister} style={{paddingStart: 5}}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </Text>
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'blue',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   container2: {
//     backgroundColor: 'red',
//   },
//   textHeader: {
//     color: 'white',
//   },
// });

export default LoginScreen;
