import React, {useEffect, useState} from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {
  Box,
  Button,
  Center,
  Image,
  Text,
  VStack,
  FormControl,
  Input,
  InputGroup,
  InputLeftAddon,
  Divider,
  Actionsheet,
  useDisclose,
  Pressable,
} from 'native-base';
import {
  View,
  useWindowDimensions,
  ScrollView,
  TextInput,
  FlatList,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import axios from '../../utils/axios';

import Footer from '../../components/Footer';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getBookingById} from '../../stores/actions/booking';
import {
  deleteAvatar,
  updateAvatar,
  updatePassword,
  updateProfile,
} from '../../stores/actions/user';
import moment from 'moment';

export default function ProfileScreen(props) {
  // moment.locale('id');
  // const [filePath, setFilePath] = useState({});

  const dispatch = useDispatch();

  const [buttonActive, setButonActive] = useState(false);
  const [buttonPassActive, setButonPassActive] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const dataUser = useSelector(state => state.user.data[0]);
  // console.log(dataUser);
  // const dataBooking = useSelector(state => state.booking.data);
  // const [data, setData] = useState(dataUser);
  const [dataBooking, setDataBooking] = useState([]);
  // const [avatar, setAvatar] = useState(dataUser.image);
  const {isOpen, onOpen, onClose} = useDisclose();
  const [formData, setFormData] = useState({
    firstName: dataUser.firstName,
    lastName: dataUser.lastName,
    noTelp: dataUser.noTelp,
  });
  const [formPassword, setFormPassword] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  // console.log(dataUser);

  const [photo, setPhoto] = React.useState(null);
  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true}, response => {
      // console.log(response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response) {
        setPhoto(response.assets[0]);
      }
    });
    onClose();
  };
  const handleLaunchCamera = () => {
    launchCamera({noData: true}, response => {
      // console.log(response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response) {
        setPhoto(response.assets[0]);
      }
    });
  };
  const handleDeletePhoto = async () => {
    try {
      onClose();
      const data = {image: null};
      const result = await dispatch(deleteAvatar(dataUser.id, data));
      alert(result.value.data.message);
    } catch (error) {
      console.log(error.response);
      onClose();
    }
  };

  // console.log(avatar);
  console.log(dataUser);
  const uploadFile = async () => {
    try {
      const formData = new FormData();
      // formData.append({
      //   name: photo.fileName,
      //   type: photo.type,
      //   uri:
      //     Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
      // });
      formData.append('image', {
        name: 'image',
        fileName: photo.fileName,
        type: photo.type,
        uri:
          Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
      });
      console.log(formData);
      // await axios.patch(`user/image/${dataUser.id}`, formData);
      const result = await dispatch(updateAvatar(dataUser.id, formData));
      // setAvatar(result.value.data.data.image);
      alert(result.value.data.message);
      setPhoto(null);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getDataBookingById();
  }, []);

  const handleLogout = async () => {
    try {
      alert('Logout');
      await AsyncStorage.clear();
      props.navigation.navigate('AuthScreen', {
        screen: 'Login',
      });
    } catch (error) {}
  };

  const handleRefresh = () => {
    console.log('REFRESH SCREEN');
    setRefresh(true);
    getDataBookingById();
  };

  const getDataBookingById = async () => {
    try {
      setRefresh(false);
      const result = await dispatch(getBookingById(dataUser.id));
      setDataBooking(result.value.data.data);
      // console.log(result);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleButtonActive = async () => {
    try {
      if (buttonActive) {
        const result = await dispatch(updateProfile(dataUser.id, formData));
        setButonActive(!buttonActive);
        // console.log(formData);
        // setData(result);
        // resetFormData();
        await alert('Success Update Profile');
      } else {
        setButonActive(!buttonActive);
        false;
        // resetFormData();
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleButtonPassActive = async () => {
    try {
      if (buttonPassActive) {
        const result = await dispatch(
          updatePassword(dataUser.id, formPassword),
        );
        // console.log(formPassword);
        setButonPassActive(!buttonPassActive);
        resetFormPassword();
        await alert('Success Update Password');
      } else {
        setButonPassActive(!buttonPassActive);
        false;
        resetFormPassword();
      }
    } catch (error) {
      alert('password not match');
      console.log(error.response);
      resetFormPassword();
    }
  };

  const resetFormPassword = () => {
    setFormPassword({
      newPassword: '',
      confirmPassword: '',
    });
  };

  const handleChangeData = (text, name) => {
    setFormData({...formData, [name]: text});
    // console.log(data);
  };
  const handleChangePassword = (text, name) => {
    setFormPassword({...formPassword, [name]: text});
    // console.log(data);
  };

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Detail Account'},
    {key: 'second', title: 'Order History'},
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      renderLabel={({route, color}) => (
        <Text style={{color: 'black', margin: 8}}>{route.title}</Text>
      )}
      indicatorStyle={{backgroundColor: '#5f2eea'}}
      style={{backgroundColor: 'white'}}
    />
  );
  const _renderTabs = ({route}) => {
    switch (route.key) {
      case 'first':
        return (
          <ScrollView style={styles.container}>
            <Box bgColor="white" rounded="10" marginX={5} p="5" marginTop={5}>
              <Text fontSize="md" fontWeight="light">
                INFO
              </Text>

              <VStack space="4" alignItems="center" marginY="5">
                {photo ? (
                  <>
                    <Image
                      source={{uri: photo.uri}}
                      style={styles.imageStyle}
                      height="100"
                      width="100"
                      alt="img_picker"
                      resizeMode="cover"
                      rounded="100"
                    />
                    <Button onPress={uploadFile}>Save</Button>
                  </>
                ) : (
                  <View>
                    <Image
                      // bgColor="black"
                      source={{
                        uri: dataUser.image
                          ? `https://res.cloudinary.com/dx8zjtlv8/image/upload/v1655960622/${dataUser.image}`
                          : 'https://res.cloudinary.com/dx8zjtlv8/image/upload/v1656424787/TICKETING/user/user1_kcsnxx.png',
                      }}
                      alt="img_ava"
                      rounded="100"
                      width="100"
                      height="100"
                      resizeMode="cover"
                      // width={30}
                    />
                    <Button onPress={onOpen} variant="outline" marginY={2}>
                      Edit Photo
                    </Button>
                  </View>
                )}

                <Actionsheet isOpen={isOpen} onClose={onClose}>
                  <Actionsheet.Content>
                    <Actionsheet.Item onPress={handleChoosePhoto}>
                      Chose Image
                    </Actionsheet.Item>
                    <Actionsheet.Item onPress={handleLaunchCamera}>
                      Launch Camera
                    </Actionsheet.Item>
                    <Actionsheet.Item onPress={handleDeletePhoto}>
                      Delete
                    </Actionsheet.Item>
                    <Actionsheet.Item onPress={onClose}>
                      Cancel
                    </Actionsheet.Item>
                  </Actionsheet.Content>
                </Actionsheet>

                <Text fontSize="2xl" fontWeight="bold">
                  {dataUser.firstName + ' ' + dataUser.lastName}
                </Text>
                <Text fontSize="md">Moviegoers</Text>
                <Divider />
                <Button width="50%" bgColor="#5f2eea" onPress={handleLogout}>
                  Logout
                </Button>
              </VStack>
            </Box>
            <Box marginX={5} marginTop={5}>
              <Text fontSize="xl" fontWeight="semibold">
                Account Settings
              </Text>
              <Box bgColor="white" rounded="10" p="5">
                <Text fontSize="md" fontWeight="light">
                  Details Information
                </Text>
                <Divider mt={2} />
                <VStack space={3} mt="5">
                  <FormControl>
                    <FormControl.Label>First Name</FormControl.Label>
                    <Input
                      // placeholder={data.firstName + ' ' + data.lastName}
                      value={formData.firstName}
                      onChangeText={text => handleChangeData(text, 'firstName')}
                      isDisabled={buttonActive ? false : true}
                    />
                  </FormControl>
                  <FormControl>
                    <FormControl.Label>Last Name</FormControl.Label>
                    <Input
                      value={formData.lastName}
                      isDisabled={buttonActive ? false : true}
                      onChangeText={text => handleChangeData(text, 'lastName')}
                    />
                  </FormControl>
                  {/* <FormControl>
              <FormControl.Label>E-mail</FormControl.Label>
              <Input
                value={data.email}
                onChangeText={text => handleChangeData(text, 'email')}
              />
            </FormControl> */}
                  <FormControl>
                    <FormControl.Label>Phone Number</FormControl.Label>
                    <InputGroup w="100%">
                      <InputLeftAddon children={'+62'} w="15%" />
                      <Input
                        w="85%"
                        dataDetectorTypes="phoneNumber"
                        value={formData.noTelp}
                        isDisabled={buttonActive ? false : true}
                        onChangeText={text => handleChangeData(text, 'noTelp')}
                      />
                    </InputGroup>
                  </FormControl>
                </VStack>
              </Box>
              <Button
                mt="5"
                colorScheme="indigo"
                rounded="7"
                width="80%"
                alignSelf="center"
                onPress={handleButtonActive}>
                {buttonActive ? 'Save Update' : 'Update Profile'}
              </Button>
            </Box>
            <Box bgColor="white" rounded="10" marginX={5} p="5" marginTop={5}>
              <Text fontSize="md" fontWeight="light">
                Account & Privacy
              </Text>
              <Divider mt={2} />
              <VStack space={3} mt="5">
                <FormControl>
                  <FormControl.Label>New Password</FormControl.Label>
                  <Input
                    placeholder="Input your new password"
                    type="password"
                    value={formPassword.newPassword}
                    isDisabled={buttonPassActive ? false : true}
                    onChangeText={text =>
                      handleChangePassword(text, 'newPassword')
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Confirm</FormControl.Label>
                  <Input
                    placeholder="input your new password"
                    type="password"
                    value={formPassword.confirmPassword}
                    isDisabled={buttonPassActive ? false : true}
                    onChangeText={text =>
                      handleChangePassword(text, 'confirmPassword')
                    }
                  />
                </FormControl>
                {/* <Button mt="2" colorScheme="indigo" rounded="7">
            Update Changes
          </Button> */}
              </VStack>
            </Box>
            <Button
              mt="5"
              colorScheme="indigo"
              rounded="7"
              width="80%"
              alignSelf="center"
              onPress={handleButtonPassActive}>
              {buttonPassActive ? 'Save Update' : 'Update Passsword'}
            </Button>
            <Box marginTop="10">
              <Footer {...props} />
            </Box>
          </ScrollView>
        );

      case 'second':
        return (
          <View style={styles.container}>
            <FlatList
              data={dataBooking}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <VStack space={5}>
                  {item.statusPayment === 'SUCCESS' ? (
                    <Box
                      bgColor="white"
                      rounded="10"
                      marginX={5}
                      p="5"
                      marginTop={5}>
                      <VStack space={3} mt="5">
                        <Image
                          source={
                            // require('../../assets/img/hiflixspnsor.png')
                            item.premiere === 'Ebu.id'
                              ? require('../../assets/img/ebvsponsor.png')
                              : item.premiere === 'cineone'
                              ? require('../../assets/img/cineonesponsor.png')
                              : item.premiere === 'hiflix'
                              ? require('../../assets/img/hiflixspnsor.png')
                              : require('../../assets/img/ebvsponsor.png')
                          }
                          width="90"
                          resizeMode="contain"
                          alt="img_sponsor"
                        />
                        <Text fontSize="sm" color="gray.400">
                          {moment(item.dateBooking).format(
                            'dddd, MMMM Do YYYY',
                          )}
                          - {item.timeBooking}
                        </Text>
                        <Text fontSize="md" color="black" fontWeight="semibold">
                          {item.name}
                        </Text>
                        <Divider />
                        {item.statusUsed === 'active' ? (
                          <Button
                            onPress={() =>
                              props.navigation.navigate('TicketResult', {
                                dataTicket: item,
                              })
                            }>
                            Ticket in active
                          </Button>
                        ) : (
                          <Button isDisabled>Ticket used</Button>
                        )}
                      </VStack>
                    </Box>
                  ) : (
                    <View />
                  )}
                </VStack>
              )}
              onRefresh={handleRefresh}
              refreshing={refresh}
            />
          </View>
        );
    }
  };

  return (
    // <ScrollView>
    //   <Box>
    //     <Footer {...props} />
    //   </Box>
    // </ScrollView>

    // <TabView
    //   navigationState={{index, routes}}
    //   renderScene={renderScene}
    //   onIndexChange={setIndex}
    //   renderTabBar={renderTabBar}
    //   initialLayout={{width: layout.width}}
    // />
    <TabView
      // swipeEnabled={true}
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={_renderTabs}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
}
