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
  updateAvatar,
  updatePassword,
  updateProfile,
} from '../../stores/actions/user';

const createFormData = (photo, body = {}) => {
  const data = new FormData();

  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};

export default function ProfileScreen(props) {
  // const [filePath, setFilePath] = useState({});

  // const requestCameraPermission = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.CAMERA,
  //         {
  //           title: 'Camera Permission',
  //           message: 'App needs camera permission',
  //         },
  //       );
  //       // If CAMERA Permission is granted
  //       return granted === PermissionsAndroid.RESULTS.GRANTED;
  //     } catch (err) {
  //       console.warn(err);
  //       return false;
  //     }
  //   } else {
  //     return true;
  //   }
  // };

  // const requestExternalWritePermission = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //         {
  //           title: 'External Storage Write Permission',
  //           message: 'App needs write permission',
  //         },
  //       );
  //       // If WRITE_EXTERNAL_STORAGE Permission is granted
  //       return granted === PermissionsAndroid.RESULTS.GRANTED;
  //     } catch (err) {
  //       console.warn(err);
  //       alert('Write permission err', err);
  //     }
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

  // const captureImage = async type => {
  //   let options = {
  //     mediaType: type,
  //     maxWidth: 300,
  //     maxHeight: 550,
  //     quality: 1,
  //     videoQuality: 'low',
  //     durationLimit: 30, //Video max duration in seconds
  //     saveToPhotos: true,
  //   };
  //   let isCameraPermitted = await requestCameraPermission();
  //   let isStoragePermitted = await requestExternalWritePermission();
  //   if (isCameraPermitted && isStoragePermitted) {
  //     launchCamera(options, response => {
  //       console.log('Response = ', response);

  //       if (response.didCancel) {
  //         alert('User cancelled camera picker');
  //         return;
  //       } else if (response.errorCode == 'camera_unavailable') {
  //         alert('Camera not available on device');
  //         return;
  //       } else if (response.errorCode == 'permission') {
  //         alert('Permission not satisfied');
  //         return;
  //       } else if (response.errorCode == 'others') {
  //         alert(response.errorMessage);
  //         return;
  //       }
  //       console.log('base64 -> ', response.base64);
  //       console.log('uri -> ', response.uri);
  //       console.log('width -> ', response.width);
  //       console.log('height -> ', response.height);
  //       console.log('fileSize -> ', response.fileSize);
  //       console.log('type -> ', response.type);
  //       console.log('fileName -> ', response.fileName);
  //       setFilePath(response);
  //     });
  //   }
  // };

  // const chooseFile = type => {
  //   let options = {
  //     mediaType: type,
  //     maxWidth: 300,
  //     maxHeight: 550,
  //     quality: 1,
  //   };
  //   launchImageLibrary(options, response => {
  //     console.log('Response = ', response.assets[0]);

  //     if (response.didCancel) {
  //       alert('User cancelled camera picker');
  //       return;
  //     } else if (response.errorCode == 'camera_unavailable') {
  //       alert('Camera not available on device');
  //       return;
  //     } else if (response.errorCode == 'permission') {
  //       alert('Permission not satisfied');
  //       return;
  //     } else if (response.errorCode == 'others') {
  //       alert(response.errorMessage);
  //       return;
  //     }
  //     console.log('base64 -> ', response.assets[0].base64);
  //     console.log('uri -> ', response.assets[0].uri);
  //     console.log('width -> ', response.assets[0].width);
  //     console.log('height -> ', response.assets[0].height);
  //     console.log('fileSize -> ', response.assets[0].fileSize);
  //     console.log('type -> ', response.assets[0].type);
  //     console.log('fileName -> ', response.assets[0].fileName);
  //     setFilePath(response.assets[0]);
  //     setPhoto(response.assets[0].uri);
  //   });
  // };

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

  // const handlePicker = () => {
  //   // console.log('edit');
  //   ImagePicker.showImagePicker({}, response => {
  //     console.log('Response = ', response);
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //     } else {
  //       setAvatar({uri: response.uri});
  //       // here we can call a API to upload image on server
  //     }
  //   });
  // };

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
    onClose();
  };
  const handleDeletePhoto = () => {
    launchImageLibrary({noData: true}, response => {
      // console.log(response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response) {
        setPhoto(response.assets[0]);
      }
    });
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

  // const handleChoosePhoto = () => {
  //   launchImageLibrary({noData: true}, response => {
  //     // console.log(response);
  //     if (response) {
  //       setPhoto(response);
  //     }
  //   });
  // };

  // const handleUploadPhoto = () => {
  //   fetch(`${SERVER_URL}/api/upload`, {
  //     method: 'POST',
  //     body: createFormData(photo, {userId: '123'}),
  //   })
  //     .then(response => response.json())
  //     .then(response => {
  //       console.log('response', response);
  //     })
  //     .catch(error => {
  //       console.log('error', error);
  //     });
  // };

  useEffect(() => {
    getDataBookingById();
  }, []);

  // const addImage = async () => {
  //   const photo = await launchImageLibrary({});
  //   setImage(photo.assets[0]);
  // };

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

  // const resetFormData = () => {
  //   setFormData({
  //     firstName: dataUser.firstName,
  //     lastName: dataUser.lastName,
  //     noTelp: dataUser.noTelp,
  //   });
  // };

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

  // const renderScene = SceneMap({
  //   first: () => <FirstRoute />,
  //   second: () => <SecondRoute {...props} dataUser={data} />,
  // });
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
                {/* {photo ? (
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
                        uri: `https://res.cloudinary.com/dx8zjtlv8/image/upload/v1655960622/${avatar}`,
                      }}
                      alt="img_ava"
                      rounded="100"
                      width="100"
                      height="100"
                      resizeMode="cover"
                      // width={30}
                    />

                    <Button
                      onPress={handleChoosePhoto}
                      variant="outline"
                      marginY={2}>
                      Edit Photo
                    </Button>
                    <Button
                      onPress={() =>
                        launchCamera(
                          {mediaType: 'photo', maxHeight: 512, maxWidth: 512},
                          // res => handleImage(res.assets[0]),
                        )
                      }
                      variant="outline"
                      marginY={2}>
                      Camera
                    </Button>
                  </View>
                )} */}
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
                        uri: `https://res.cloudinary.com/dx8zjtlv8/image/upload/v1655960622/${dataUser.image}`,
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
                <Button width="50%" bgColor="#5f2eea">
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
                          source={require('../../assets/img/ebvsponsor.png')}
                          width="90"
                          resizeMode="contain"
                          alt="img_sponsor"
                        />
                        <Text fontSize="sm" color="gray.400">
                          {item.dateBooking} {item.timeBooking}
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

  // const FirstRoute = () => {
  //   return (
  //     <>
  //       <ScrollView style={styles.container}>
  //         <Box bgColor="white" rounded="10" marginX={5} p="5" marginTop={5}>
  //           <Text fontSize="md" fontWeight="light">
  //             INFO
  //           </Text>

  //           <VStack space="4" alignItems="center" marginY="5">
  //             <Image
  //               // bgColor="black"
  //               source={require('../../assets/img/Ava.png')}
  //               alt="img_ava"
  //               rounded="100"
  //               resizeMode="cover"
  //               // width={30}
  //             />
  //             <Text fontSize="2xl" fontWeight="bold">
  //               {data.firstName + ' ' + data.lastName}
  //             </Text>
  //             <Text fontSize="md">Moviegoers</Text>
  //             <Divider />
  //             <Button width="50%" bgColor="#5f2eea">
  //               Logout
  //             </Button>
  //           </VStack>
  //         </Box>
  //         <Box marginX={5} marginTop={5}>
  //           <Text fontSize="xl" fontWeight="semibold">
  //             Account Settings
  //           </Text>
  //           <Box bgColor="white" rounded="10" p="5">
  //             <Text fontSize="md" fontWeight="light">
  //               Details Information
  //             </Text>
  //             <Divider mt={2} />
  //             <VStack space={3} mt="5">
  //               <FormControl>
  //                 <FormControl.Label>First Name</FormControl.Label>
  //                 <Input
  //                   placeholder={data.firstName + ' ' + data.lastName}
  //                   // value={formData.firstName}
  //                   onChangeText={text => handleChangeData(text, 'firstName')}
  //                 />
  //               </FormControl>
  //               <FormControl>
  //                 <FormControl.Label>Last Name</FormControl.Label>
  //                 <Input
  //                   value={data.lastName}
  //                   onChangeText={text => handleChangeData(text, 'lastName')}
  //                 />
  //               </FormControl>
  //               {/* <FormControl>
  //             <FormControl.Label>E-mail</FormControl.Label>
  //             <Input
  //               value={data.email}
  //               onChangeText={text => handleChangeData(text, 'email')}
  //             />
  //           </FormControl> */}
  //               <FormControl>
  //                 <FormControl.Label>Phone Number</FormControl.Label>
  //                 <InputGroup w="100%">
  //                   <InputLeftAddon children={'+62'} w="15%" />
  //                   <Input
  //                     w="85%"
  //                     dataDetectorTypes="phoneNumber"
  //                     value={data.noTelp}
  //                     onChangeText={text => handleChangeData(text, 'noTelp')}
  //                   />
  //                 </InputGroup>
  //               </FormControl>
  //             </VStack>
  //           </Box>
  //           <Button
  //             mt="5"
  //             colorScheme="indigo"
  //             rounded="7"
  //             width="80%"
  //             alignSelf="center">
  //             Update Changes
  //           </Button>
  //         </Box>
  //         <Box bgColor="white" rounded="10" marginX={5} p="5" marginTop={5}>
  //           <Text fontSize="md" fontWeight="light">
  //             Account & Privacy
  //           </Text>
  //           <Divider mt={2} />
  //           <VStack space={3} mt="5">
  //             <FormControl>
  //               <FormControl.Label>New Password</FormControl.Label>
  //               <Input placeholder="Input your new password" type="password" />
  //             </FormControl>
  //             <FormControl>
  //               <FormControl.Label>Confirm</FormControl.Label>
  //               <Input placeholder="input your new password" type="password" />
  //             </FormControl>
  //             {/* <Button mt="2" colorScheme="indigo" rounded="7">
  //           Update Changes
  //         </Button> */}
  //           </VStack>
  //         </Box>
  //         <Button
  //           mt="5"
  //           colorScheme="indigo"
  //           rounded="7"
  //           width="80%"
  //           alignSelf="center">
  //           Update Changes
  //         </Button>
  //         <Box marginTop="10">
  //           <Footer {...props} />
  //         </Box>
  //       </ScrollView>
  //     </>
  //   );
  // };

  // const SecondRoute = () => (
  //   <View style={styles.container}>
  //     <FlatList
  //       data={dataBooking}
  //       keyExtractor={item => item.id}
  //       renderItem={({item}) => (
  //         <VStack space={5}>
  //           {item.statusPayment === 'SUCCESS' ? (
  //             <Box bgColor="white" rounded="10" marginX={5} p="5" marginTop={5}>
  //               <VStack space={3} mt="5">
  //                 <Image
  //                   source={require('../../assets/img/ebvsponsor.png')}
  //                   width="90"
  //                   resizeMode="contain"
  //                   alt="img_sponsor"
  //                 />
  //                 <Text fontSize="sm" color="gray.400">
  //                   {item.dateBooking} {item.timeBooking}
  //                 </Text>
  //                 <Text fontSize="md" color="black" fontWeight="semibold">
  //                   {item.name}
  //                 </Text>
  //                 <Divider />
  //                 {item.statusUsed === 'active' ? (
  //                   <Button
  //                     onPress={() =>
  //                       props.navigation.navigate('TicketResult', {
  //                         dataTicket: item,
  //                       })
  //                     }>
  //                     Ticket in active
  //                   </Button>
  //                 ) : (
  //                   <Button isDisabled>Ticket used</Button>
  //                 )}
  //               </VStack>
  //             </Box>
  //           ) : (
  //             <View />
  //           )}
  //         </VStack>
  //       )}
  //     />
  //   </View>
  // );

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

// const SecondRoute2 = () => (
//   <ScrollView style={styles.container}>
//     <VStack space={5}>
//       <Box bgColor="white" rounded="10" marginX={5} p="5" marginTop={5}>
//         <VStack space={3} mt="5">
//           <Image
//             source={require('../../assets/img/ebvsponsor.png')}
//             width="90"
//             resizeMode="contain"
//             alt="img_sponsor"
//           />
//           <Text fontSize="sm" color="gray.400">
//             Tuesday, 07 July 2020 - 04:30pm
//           </Text>
//           <Text fontSize="md" color="black" fontWeight="semibold">
//             Spider-Man: Homecoming
//           </Text>
//           <Divider />
//           <Button onPress={() => props.navigation.navigate('TicketResult')}>
//             Ticket in active
//           </Button>
//         </VStack>
//       </Box>
//       <Box bgColor="white" rounded="10" marginX={5} p="5">
//         <VStack space={3} mt="5">
//           <Image
//             source={require('../../assets/img/ebvsponsor.png')}
//             width="90"
//             resizeMode="contain"
//             alt="img_sponsor"
//           />
//           <Text>Tuesday, 07 July 2020 - 04:30pm</Text>
//           <Text>Spider-Man: Homecoming</Text>
//           <Divider />
//           <Button
//             colorScheme="gray"
//             onPress={() => props.navigation.navigate('TicketResult')}>
//             Ticket Used
//           </Button>
//         </VStack>
//       </Box>
//     </VStack>
//     <Box marginTop="10">
//       <Footer {...props} />
//     </Box>
//   </ScrollView>
// );
