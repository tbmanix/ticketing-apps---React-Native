import {Box, Center, Image, Button, HStack, Flex} from 'native-base';
import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';

export default function CardSchedule(props) {
  //   console.log(props);
  return (
    <Box bg="white" rounded="xl" p="5">
      <Center>
        <Image
          source={require('../assets/img/ebvsponsor.png')}
          alt="img_sponsor"
        />
        <Text>Whatever street No.12, South Purwokerto</Text>
        <Box style={{borderBottomColor: 'black', borderWidth: 0.5}} />
      </Center>
      <HStack
        flexWrap="wrap"
        flexDirection="row"
        justifyContent="space-between"
        // space={1}
        mt="4"
        borderWidth={1}>
        <Button mt="2">08.03.pm</Button>
        <Button mt="2">08.03.pm</Button>
        <Button mt="2">08.03.pm</Button>
        <Button mt="2">08.03.pm</Button>
        <Button mt="2">08.03.pm</Button>
        <Button mt="2">08.03.pm</Button>
      </HStack>
      <HStack justifyContent="space-between">
        <Text>Price</Text>
        <Text>$10.00/seat</Text>
      </HStack>
      <Button onPress={() => props.navigation.navigate('Seat')}>
        Book Now
      </Button>
    </Box>
  );
}

const style = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: 'white',
    maxWidth: 170,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  poster: {
    width: 140,
    borderRadius: 10,
  },
});
