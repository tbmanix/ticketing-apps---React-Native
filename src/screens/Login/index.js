import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../utils/axios';
import {useDispatch} from 'react-redux';

import styles from './styles';
import Input from '../../components/input';
import Btn from '../../components/button';
import {getUserById} from '../../stores/actions/user';

function LoginScreen(props) {
  // // console.log(props);
  // const handleLogin = () => {
  //   props.navigation.navigate('AppScreen', {
  //     screen: 'Home',
  //   });
  // };

  // const [text, onChangeText] = React.useState('');
  // const [number, onChangeNumber] = React.useState(null);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const validationForm = () => {
    if (form.email === '' || form.password === '') {
      return true;
    }
  };

  // dengan kelas yang sama
  const handleRegister = () => {
    props.navigation.navigate('Register');
  };

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      // console.log(form);
      setLoading(true);
      if (validationForm() === true) {
        return alert('Lengkapi Semua Data'), setLoading(false);
      }
      const result = await axios.post('auth/login', form);
      await AsyncStorage.setItem('id', result.data.data.id);
      await AsyncStorage.setItem('token', result.data.data.token);
      await AsyncStorage.setItem('refreshToken', result.data.data.refreshToken);
      // console.log(result.data.data);
      setLoading(false);
      setIsError(false);
      setMessage(result.data.message);
      const dataUser = await dispatch(getUserById(result.data.data.id));
      // console.log(dataUser);
      await props.navigation.navigate('AppScreen', {
        screen: 'Home',
      });
    } catch (error) {
      setLoading(false);
      console.log(error.response);
      setIsError(true);
      setMessage(error.response.data.message);
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
      {/* <Image
        source={require('../../assets/img/Vector.png')}
        style={styles.logo}
      /> */}
      <Text
        style={{
          fontSize: 30,
          fontWeight: '900',
          color: '#5f2eea',
          paddingTop: 10,
        }}>
        Ticketing
      </Text>
      <Text style={{color: 'black', fontSize: 40, fontWeight: 'bold'}}>
        Sign In
      </Text>
      <Text>
        Sign in with your data that you entered during your registration
      </Text>
      <View style={{marginVertical: 20}}>
        {!message ? null : isError ? (
          <View>
            <Text style={{color: 'red'}}>{message}</Text>
          </View>
        ) : (
          <View>
            <Text style={{color: 'green'}}>{message}</Text>
          </View>
        )}
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
      {loading ? (
        <Btn
          loading={<ActivityIndicator color="white" />}
          onPress={handleLogin}
        />
      ) : (
        <Btn text="Sign In" onPress={handleLogin} />
      )}
      <View flexDirection="row" justifyContent="center">
        <Text>Forgot your password?</Text>
        <TouchableOpacity onPress={handleRegister} style={{paddingStart: 5}}>
          <Text style={styles.textLink}>Reset Now</Text>
        </TouchableOpacity>
      </View>
      <View flexDirection="row" justifyContent="center">
        <Text>Don't have a account?</Text>
        <TouchableOpacity onPress={handleRegister} style={{paddingStart: 5}}>
          <Text style={styles.textLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
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
