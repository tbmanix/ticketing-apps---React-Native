import React, {useState, useEffect} from 'react';
import axios from '../../utils/axios';
import {
  ScrollView,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import {
  Button,
  Select,
  Box,
  CheckIcon,
  Input,
  Icon,
  Ionicons,
  Image,
  Center,
  Text,
  Flex,
  HStack,
  TextArea,
  VStack,
  FormControl,
  InputGroup,
  InputLeftAddon,
  Alert,
} from 'native-base';

import Seat from '../../components/Seat';
import Footer from '../../components/Footer';
import {useSelector} from 'react-redux';
import Notification from '../../utils/notif';

export default function PaymentScreen(props) {
  const dataUser = useSelector(state => state.user.data[0]);
  const dataNotif = props.route.params.dataOrder;
  const [dataOrder, setDataOrder] = useState({
    ...props.route.params.dataOrder,
    paymentMethod: 'waiting',
  });

  // console.log(dataOrder);

  const handleReminder = () => {
    console.log('Clicked !');
    // [without schedule]
    // Notification.reminderProductNotification();

    // [with schedule]
    const setNotification = {
      title: 'Status Booking',
      message: `Success Booking ticket ${dataNotif.name}`,
      date: new Date(Date.now() + 15 * 1000),
    };
    // const title = 'pro';
    // const message = 'pro';
    // const date = new Date(Date.now() + 5 * 1000);
    // console.log(setNotification);
    Notification.scheduleProductNotification(setNotification);
  };

  const handlePayment = async e => {
    try {
      e.preventDefault();
      delete dataOrder.name;
      delete dataOrder.movieId;
      delete dataOrder.price;
      // console.log(dataOrder);
      const result = await axios.post('booking/', dataOrder);
      // console.log(result.data.data);
      handleReminder();
      props.navigation.navigate('Midtrans', {
        url: result.data.data.redirectUrl,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const Rupiah = number => {
    const format = number.toString().split('').reverse().join('');
    const convert = format.match(/\d{1,3}/g);
    const rupiah = 'Rp ' + convert.join('.').split('').reverse().join('');
    return rupiah;
  };

  return (
    <ScrollView style={{backgroundColor: '#f5f6f8'}}>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        bgColor="white"
        paddingX={5}
        paddingBottom={5}
        paddingTop={3}
        roundedBottom={20}>
        <Text fontSize="md" color="gray.400">
          Total Payment
        </Text>
        <Text fontSize="lg" color="black">
          {Rupiah(dataOrder.totalPayment)}
        </Text>
      </Box>
      <Box marginX={5} marginTop={5}>
        <Text fontSize="xl" fontWeight="semibold">
          Payment Method
        </Text>
        <Box bgColor="white" rounded="xl" p={8} marginTop={3}>
          <Center>
            <HStack space={3}>
              <VStack flex={1} space={2}>
                <Button variant="outline">
                  <Image
                    source={require('../../assets/img/gpay.png')}
                    alt="img_sponsor"
                    resizeMode="contain"
                    height={3}
                  />
                </Button>
                <Button variant="outline">
                  <Image
                    source={require('../../assets/img/paypal.png')}
                    alt="img_sponsor"
                    resizeMode="contain"
                    height={3}
                  />
                </Button>
              </VStack>
              <VStack flex={1} space={2}>
                <Button variant="outline">
                  <Image
                    source={require('../../assets/img/visa.png')}
                    alt="img_sponsor"
                    resizeMode="contain"
                    height={3}
                  />
                </Button>
                <Button variant="outline">
                  <Image
                    source={require('../../assets/img/ovo.png')}
                    alt="img_sponsor"
                    resizeMode="contain"
                    height={3}
                  />
                </Button>
              </VStack>
              <VStack flex={1} space={2}>
                <Button variant="outline">
                  <Image
                    source={require('../../assets/img/gopay.png')}
                    alt="img_sponsor"
                    resizeMode="contain"
                    height={3}
                  />
                </Button>
                <Button variant="outline">
                  <Image
                    source={require('../../assets/img/dana.png')}
                    alt="img_sponsor"
                    resizeMode="contain"
                    height={3}
                  />
                </Button>
              </VStack>
            </HStack>
            <Text marginY={5}>Or</Text>
            <Text>
              Pay via Cash. <Text color="#5f2eea">See how it work.</Text>
            </Text>
          </Center>
        </Box>
      </Box>
      <Box marginX={5} marginTop={5}>
        <Text fontSize="xl" fontWeight="semibold">
          Personal Info
        </Text>
        <Box bgColor="white" rounded="xl" p={8} marginTop={3}>
          <FormControl>
            <FormControl.Label>Full Name</FormControl.Label>
            <Input placeholder={dataUser.firstName} />
            <FormControl.Label>Email</FormControl.Label>
            <Input placeholder={dataUser.email} />
            <FormControl.Label>Phone Number</FormControl.Label>
            <InputGroup w="100%">
              <InputLeftAddon children={'+62'} w="15%" />
              <Input w="85%" placeholder={dataUser.noTelp} />
            </InputGroup>
            <Alert
              w="100%"
              variant="solid"
              //   colorScheme="yellow"
              status="warning"
              mt={5}>
              <VStack space={2} flexShrink={1} w="100%">
                <HStack
                  flexShrink={1}
                  space={2}
                  alignItems="center"
                  justifyContent="space-between">
                  <HStack space={2} flexShrink={1} alignItems="center">
                    <Alert.Icon />
                    <Text color="white">Fill your data correctly.</Text>
                  </HStack>
                </HStack>
              </VStack>
            </Alert>
          </FormControl>
        </Box>
        <Button
          bgColor="#5f2eea"
          rounded="10"
          marginY={6}
          onPress={handlePayment}>
          Pay your order
        </Button>
      </Box>
      <Box>
        <Footer {...props} />
      </Box>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  containerSeat: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
});
