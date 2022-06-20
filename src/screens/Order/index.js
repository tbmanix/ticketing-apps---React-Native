import React, {useState, useEffect} from 'react';
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
  Divider,
} from 'native-base';
import axios from '../../utils/axios';

import IconFeather from 'react-native-vector-icons/Feather';

import Seat from '../../components/Seat';
import Footer from '../../components/Footer';

export default function SeatScreen(props) {
  // const poster = {
  //   img: '../../assets/img/poster.png',
  //   name: 'Spiderman',
  //   genre: 'Sci Fi, Action, Drama',
  //   releaseDate: 'june 28, 2017',
  //   duration: '2 hrs 13 min',
  //   director: 'Jon Watts',
  //   cast: 'Tom Holland, Zendaya, Robert Downey Jr.',
  //   synopsis:
  //     'Thrilled by his experience with the Avengers, Peter returns home, where he lives with his Aunt May, under the watchful eye of his new mentor Tony Stark, Peter tries to fall back into his normal daily routine - distracted by thoughts of proving himself to be more than just your friendly neighborhood Spider-Man - but when the Vulture emerges as a new villain, everything that Peter holds most important will be threatened. ',
  // };
  const listSeat = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [reservedSeat, setReservedSeat] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);

  const [dataOrder, setDataOrder] = useState(props.route.params.dataOrder);

  useEffect(() => {
    getSeatBooking();
  }, []);

  const getSeatBooking = async () => {
    try {
      const result = await axios.get(
        `booking/seat?scheduleId=${dataOrder.scheduleId}&dateBooking=${dataOrder.bookingDate}&timeBooking=${dataOrder.timeBooking}`,
      );
      setReservedSeat(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(reservedSeat);

  const handleSelectedSeat = data => {
    if (selectedSeat.includes(data)) {
      const deleteSeat = selectedSeat.filter(el => {
        return el !== data;
      });
      setSelectedSeat(deleteSeat);
      setTotalPayment(totalPayment - dataOrder.price);
    } else {
      setSelectedSeat([...selectedSeat, data]);
      setTotalPayment((selectedSeat.length + 1) * dataOrder.price);
    }
  };

  console.log(dataOrder);

  const handleResetSeat = () => {
    setSelectedSeat([]);
  };

  const handleBookingSeat = () => {
    console.log(selectedSeat);
  };

  return (
    <ScrollView>
      <Box marginX={5} marginY={5}>
        <Text fontSize="xl" fontWeight="semibold">
          Choose Your Seat
          {selectedSeat}
        </Text>
        <View style={styles.containerSeat}>
          <HStack h="240">
            <Box h="70%" alignSelf="center">
              <Divider
                orientation="vertical"
                width="1"
                rounded="10"
                bg="green.600"
              />
            </Box>
            <Box flex={1}>
              <Divider
                w="90%"
                h="2"
                rounded="10"
                bg="purple.600"
                mb="3"
                alignSelf="center"
              />
              <FlatList
                data={listSeat}
                keyExtractor={item => item}
                renderItem={({item}) => (
                  <Seat
                    seatAlphabhet={item}
                    reserved={reservedSeat}
                    selected={selectedSeat}
                    selectSeat={handleSelectedSeat}
                  />
                )}
              />
            </Box>
          </HStack>
          <Text fontSize="lg" fontWeight="semibold">
            Seating Key
          </Text>
          <HStack space={2} mt="3">
            <VStack space={2}>
              <IconFeather name="arrow-down" size={20} />
              <Box bgColor="#d6d8e7" width="6" height="6" rounded="5" />
              <Box bgColor="#6e7191" width="6" height="6" rounded="5" />
            </VStack>
            <VStack space={2} flex={1}>
              <Text>A - G</Text>
              <Text>Available</Text>
              <Text>Sold</Text>
            </VStack>
            <VStack space={2}>
              <IconFeather name="arrow-right" size={20} />
              <Box bgColor="#5f2eea" width="6" height="6" rounded="5" />
            </VStack>
            <VStack space={2} flex={1}>
              <Text>1 - 14</Text>
              <Text>Selected</Text>
            </VStack>
          </HStack>
        </View>
        {/* <Button onPress={handleBookingSeat}>Booking</Button>
        <Button onPress={handleResetSeat}>Reset</Button> */}
      </Box>
      <Box marginX={5} marginY={5}>
        <Text fontSize="xl" fontWeight="semibold">
          Order Info
        </Text>
        <Box rounded="xl" bg="white" p={4} marginY={3}>
          <Center>
            <Image
              source={require('../../assets/img/cineonesponsor.png')}
              alt="img_Sponsor"
              w="150"
              resizeMode="contain"
            />
            <Text fontSize="xl">Cineone21 Cinema</Text>
            <Text fontSize="md">Spider-Man: HomeComing</Text>
          </Center>
          <VStack space={2} mt="4">
            <HStack justifyContent="space-between">
              <Text fontSize="sm" color="gray.400">
                {dataOrder.bookingDate}
              </Text>
              <Text fontSize="sm" color="black">
                {dataOrder.timeBooking}
              </Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text fontSize="sm" color="gray.400">
                One ticket price
              </Text>
              <Text fontSize="sm" color="black">
                {dataOrder.price}
              </Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text fontSize="sm" color="gray.400">
                Seat Choosed
              </Text>
              <Text fontSize="sm" color="black">
                {selectedSeat}
              </Text>
            </HStack>
            <Box borderWidth={0.2} marginY={3} />
            <HStack justifyContent="space-between">
              <Text fontSize="xl" color="black">
                Total Payment
              </Text>
              <Text fontSize="2xl" color="purple.600" fontWeight="semibold">
                Rp.{totalPayment}
              </Text>
            </HStack>
          </VStack>
        </Box>
        <Button
          rounded={10}
          bgColor="#5f2eea"
          marginY={6}
          onPress={() => props.navigation.navigate('Payment')}>
          Checkout Now
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
    marginTop: 10,
    padding: 15,
  },
});
