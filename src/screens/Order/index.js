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
} from 'native-base';

import Seat from '../../components/Seat';
import Footer from '../../components/Footer';

export default function SeatScreen(props) {
  const poster = {
    img: '../../assets/img/poster.png',
    name: 'Spiderman',
    genre: 'Sci Fi, Action, Drama',
    releaseDate: 'june 28, 2017',
    duration: '2 hrs 13 min',
    director: 'Jon Watts',
    cast: 'Tom Holland, Zendaya, Robert Downey Jr.',
    synopsis:
      'Thrilled by his experience with the Avengers, Peter returns home, where he lives with his Aunt May, under the watchful eye of his new mentor Tony Stark, Peter tries to fall back into his normal daily routine - distracted by thoughts of proving himself to be more than just your friendly neighborhood Spider-Man - but when the Vulture emerges as a new villain, everything that Peter holds most important will be threatened. ',
  };
  const listSeat = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [reservedSeat, setReservedSeat] = useState(['A1', 'C7']);

  useEffect(() => {
    console.log(props.route.params);
  }, []);

  const handleSelectedSeat = data => {
    if (selectedSeat.includes(data)) {
      const deleteSeat = selectedSeat.filter(el => {
        return el !== data;
      });
      setSelectedSeat(deleteSeat);
    } else {
      setSelectedSeat([...selectedSeat, data]);
    }
  };

  const handleResetSeat = () => {
    setSelectedSeat([]);
  };

  const handleBookingSeat = () => {
    console.log(selectedSeat);
  };

  return (
    <ScrollView>
      <Box marginX={3} marginY={5}>
        <Text fontSize="xl" fontWeight="semibold">
          Choose Your Seat
        </Text>
        <View style={styles.containerSeat}>
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
        </View>
        {/* <Button onPress={handleBookingSeat}>Booking</Button>
        <Button onPress={handleResetSeat}>Reset</Button> */}
      </Box>
      <Box marginX={3} marginY={5}>
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
                Tuesday, 07 July 2020
              </Text>
              <Text fontSize="sm" color="black">
                02:00pm
              </Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text fontSize="sm" color="gray.400">
                One ticket price
              </Text>
              <Text fontSize="sm" color="black">
                $10
              </Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text fontSize="sm" color="gray.400">
                Seat Choosed
              </Text>
              <Text fontSize="sm" color="black">
                C4, C5, C6
              </Text>
            </HStack>
            <Box borderWidth={0.2} marginY={3} />
            <HStack justifyContent="space-between">
              <Text fontSize="xl" color="black">
                Total Payment
              </Text>
              <Text fontSize="2xl" color="purple.600" fontWeight="semibold">
                $30
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
    padding: 10,
  },
});
