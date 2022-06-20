import {Box, Center, Image, HStack, Flex, Divider} from 'native-base';
import React from 'react';
import {
  Text,
  TouchableOpacity,
  Button,
  View,
  StyleSheet,
  FlatList,
} from 'react-native';

export default function CardSchedule(props) {
  //   console.log(props);
  return (
    <Box bg="white" rounded="xl" p="5">
      <Center>
        <Image
          source={require('../assets/img/ebvsponsor.png')}
          alt="img_sponsor"
          w={20}
          resizeMode="contain"
        />
        <Text>{props.data.location}</Text>
        <Divider mt="4" />
      </Center>
      <HStack
        flexWrap="wrap"
        flexDirection="row"
        justifyContent="space-evenly"
        mt="4"
        h="120">
        <FlatList
          numColumns="5"
          data={props.data.time}
          keyExtractor={item => item}
          renderItem={({item}) => (
            // <Button
            //   variant="ghost"
            //   _text={{color: 'purple.600'}}
            //   size="sm"
            //   mt="2"
            //   onPress={() =>
            //     props.handleTime({timeBooking: item, scheduleId: props.data.id})
            //   }>
            //   {item}
            // </Button>
            <TouchableOpacity
              onPress={() =>
                props.handleTime({
                  timeBooking: item,
                  scheduleId: props.data.id,
                  price: props.data.price,
                })
              }>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </HStack>

      <HStack justifyContent="space-between">
        <Text style={style.textPriceTitle}>Price</Text>
        <Text style={style.textPrice}>{props.data.price}/seat</Text>
      </HStack>
      <Button
        mt="5"
        onPress={() =>
          props.navigation.navigate('Seat', {dataOrder: props.dataOrder})
        }
        disabled={props.data.id === props.dataOrder.scheduleId ? false : true}
        // bgColor="purple.600"
        title="Book Now"
      />
      {/* Book Now
      </Button> */}
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

  textPrice: {
    fontSize: 18,
    color: 'black',
  },
  textPriceTitle: {
    fontSize: 17,
  },
});
