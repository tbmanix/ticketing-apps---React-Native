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
} from 'native-base';
import {
  View,
  useWindowDimensions,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Footer from '../../components/Footer';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getBookingById} from '../../stores/actions/booking';

export default function ProfileScreen(props) {
  const dispatch = useDispatch();

  const dataUser = useSelector(state => state.user.data[0]);
  // const dataBooking = useSelector(state => state.booking.data);
  const [data, setData] = useState(dataUser);
  const [dataBooking, setDataBooking] = useState([]);
  const [formData, setFormData] = useState({
    firstName: data.firstName,
    lastName: '',
    noTelp: '',
  });
  // console.log(dataUser);

  useEffect(() => {
    getDataBookingById();
  }, []);

  const getDataBookingById = async () => {
    try {
      const result = await dispatch(getBookingById(dataUser.id));
      setDataBooking(result.value.data.data);
      // console.log(result);
    } catch (error) {
      console.log(error.response);
    }
  };

  console.log(dataBooking);

  const handleChangeData = (text, name) => {
    setFormData({...formData, [name]: text});
    // console.log(data);
  };

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Detail Account'},
    {key: 'second', title: 'Order History'},
  ]);

  const renderScene = SceneMap({
    first: () => <FirstRoute />,
    second: () => <SecondRoute {...props} dataUser={data} />,
  });
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

  const FirstRoute = () => (
    <ScrollView style={styles.container}>
      <Box bgColor="white" rounded="10" marginX={5} p="5" marginTop={5}>
        <Text fontSize="md" fontWeight="light">
          INFO
        </Text>

        <VStack space="4" alignItems="center" marginY="5">
          <Image
            // bgColor="black"
            source={require('../../assets/img/Ava.png')}
            alt="img_ava"
            rounded="100"
            resizeMode="cover"
            // width={30}
          />
          <Text fontSize="2xl" fontWeight="bold">
            {data.firstName + ' ' + data.lastName}
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
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Last Name</FormControl.Label>
              <Input
                value={data.lastName}
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
                  value={data.noTelp}
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
          alignSelf="center">
          Update Changes
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
            <Input placeholder="Input your new password" type="password" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirm</FormControl.Label>
            <Input placeholder="input your new password" type="password" />
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
        alignSelf="center">
        Update Changes
      </Button>
      <Box marginTop="10">
        <Footer {...props} />
      </Box>
    </ScrollView>
  );

  const SecondRoute = () => (
    <View style={styles.container}>
      <FlatList
        data={dataBooking}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <VStack space={5}>
            {item.statusPayment === 'SUCCESS' ? (
              <Box bgColor="white" rounded="10" marginX={5} p="5" marginTop={5}>
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
      />
    </View>
  );

  return (
    // <ScrollView>
    //   <Box>
    //     <Footer {...props} />
    //   </Box>
    // </ScrollView>

    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      initialLayout={{width: layout.width}}
    />
  );
}

const SecondRoute2 = () => (
  <ScrollView style={styles.container}>
    <VStack space={5}>
      <Box bgColor="white" rounded="10" marginX={5} p="5" marginTop={5}>
        <VStack space={3} mt="5">
          <Image
            source={require('../../assets/img/ebvsponsor.png')}
            width="90"
            resizeMode="contain"
            alt="img_sponsor"
          />
          <Text fontSize="sm" color="gray.400">
            Tuesday, 07 July 2020 - 04:30pm
          </Text>
          <Text fontSize="md" color="black" fontWeight="semibold">
            Spider-Man: Homecoming
          </Text>
          <Divider />
          <Button onPress={() => props.navigation.navigate('TicketResult')}>
            Ticket in active
          </Button>
        </VStack>
      </Box>
      <Box bgColor="white" rounded="10" marginX={5} p="5">
        <VStack space={3} mt="5">
          <Image
            source={require('../../assets/img/ebvsponsor.png')}
            width="90"
            resizeMode="contain"
            alt="img_sponsor"
          />
          <Text>Tuesday, 07 July 2020 - 04:30pm</Text>
          <Text>Spider-Man: Homecoming</Text>
          <Divider />
          <Button
            colorScheme="gray"
            onPress={() => props.navigation.navigate('TicketResult')}>
            Ticket Used
          </Button>
        </VStack>
      </Box>
    </VStack>
    <Box marginTop="10">
      <Footer {...props} />
    </Box>
  </ScrollView>
);
