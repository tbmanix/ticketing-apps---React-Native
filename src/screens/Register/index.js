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
  ScrollView,
  Alert,
} from 'react-native';
import axios from '../../utils/axios';
import {useDispatch} from 'react-redux';

import styles from './styles';
import Input from '../../components/input';
import Btn from '../../components/button';
import {register} from '../../stores/actions/auth';

function RegisterScreen(props) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    noTelp: '',
    email: '',
    password: '',
  });

  const handleChangeForm = (text, name) => {
    setForm({...form, [name]: text});
  };

  const validationForm = () => {
    if (
      form.firstName === '' ||
      form.lastName === '' ||
      form.noTelp === '' ||
      form.email === '' ||
      form.password === ''
    ) {
      return true;
    }
  };

  const handleRegister = async () => {
    try {
      if (validationForm() === true) {
        return alert('Lengkapi Semua Data');
      }
      await dispatch(register(form));
      // console.log(form);

      setTimeout(() => {
        Alert.alert('Sucess Register', 'Go to Page Login', [
          // The "Yes" button
          {
            text: 'Yes',
            onPress: () => props.navigation.navigate('Login'),
          },
        ]);
      }, 2000);
      // await props.navigation.navigate('Login');
    } catch (error) {
      console.log(error.response);
    }
  };

  // const [text, onChangeText] = React.useState('');
  // const [number, onChangeNumber] = React.useState(null);

  // dengan kelas yang sama
  const handleLogin = () => {
    props.navigation.navigate('Login');
  };

  return (
    <ScrollView
      style={{
        padding: 10,
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <Image
        source={require('../../assets/img/Vector.png')}
        style={styles.logo}
      />
      <Text style={{color: 'black', fontSize: 40, fontWeight: 'bold'}}>
        Sign Up
      </Text>
      <Text>
        Sign in with your data that you entered during your registration
      </Text>
      <View style={{marginVertical: 10}}>
        <Input
          placeholder="input your First Name"
          label="First Name"
          iconName="account-outline"
          onChangeText={text => handleChangeForm(text, 'firstName')}
        />
        <Input
          placeholder="input your Last Name"
          label="Last Name"
          iconName="account-outline"
          onChangeText={text => handleChangeForm(text, 'lastName')}
        />
        <Input
          placeholder="input your Phone Number"
          label="Phone Number"
          iconName="phone-outline"
          onChangeText={text => handleChangeForm(text, 'noTelp')}
        />
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
          onChangeText={text => handleChangeForm(text, 'password')}
          // secureTextEntry={true}
          password
        />
      </View>
      <Btn text="Sign Up" onPress={handleRegister} />
      <View flexDirection="row" justifyContent="center">
        <Text>Have an Account?</Text>
        <TouchableOpacity onPress={handleLogin} style={{paddingStart: 5}}>
          <Text style={styles.textLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default RegisterScreen;
