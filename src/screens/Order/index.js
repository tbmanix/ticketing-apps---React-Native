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
      <Box marginX={3}>
        <Text>Choose Your Seat</Text>
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
        <Button onPress={handleBookingSeat}>Booking</Button>
        <Button onPress={handleResetSeat}>Reset</Button>
      </Box>
      <Box marginX={3}>
        <Text>Order Info</Text>
        <Box rounded="xl" bg="white" p={4}>
          <Center>
            <Image
              source={require('../../assets/img/ebvsponsor.png')}
              alt="img_Sponsor"
            />
            <Text>Cineone21 Cinema</Text>
            <Text>Spider-Man: HomeComing</Text>
          </Center>
          <HStack justifyContent="space-between">
            <Text>Tuesday, 07 July 2020</Text>
            <Text>02:00pm</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text>One ticket price</Text>
            <Text>$10</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text>Seat Choosed</Text>
            <Text>C4, C5, C6</Text>
          </HStack>
          <Box borderWidth={0.2} marginY={5} />
          <HStack justifyContent="space-between">
            <Text>Total Payment</Text>
            <Text>$30</Text>
          </HStack>
        </Box>
        <Button
          rounded={10}
          onPress={() => props.navigation.navigate('Payment')}>
          Checkout Now
        </Button>
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
