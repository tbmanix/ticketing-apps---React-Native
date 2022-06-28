import {Box, Center, Image, HStack, Flex, Divider, VStack} from 'native-base';
import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  Button,
  View,
  StyleSheet,
  FlatList,
} from 'react-native';

export default function CardSchedule(props) {
  const [time, setTime] = useState('');
  //   console.log(props);
  return (
    <Box bg="white" rounded="xl" p="5">
      <Center>
        <Image
          source={
            props.data.premiere === 'ebvid'
              ? require('../assets/img/ebvsponsor.png')
              : props.data.premiere === 'cineone'
              ? require('../assets/img/cineonesponsor.png')
              : props.data.premiere === 'hiflix'
              ? require('../assets/img/hiflixspnsor.png')
              : require('../assets/img/ebvsponsor.png')
          }
          alt="img_sponsor"
          w={20}
          resizeMode="contain"
        />
        <Text>{props.data.location}</Text>
        <Divider mt="4" />
      </Center>
      <VStack
        flexWrap="wrap"
        // flexDirection="row"
        // justifyContent="space-between"
        mt="4"
        // w="100%"
        h="120">
        {/* <Box bgColor="red.300" w="100%"> */}
        <FlatList
          numColumns="4"
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
            <Box marginX={5}>
              <TouchableOpacity
                onPress={() =>
                  props.handleTime(
                    {
                      timeBooking: item,
                      scheduleId: props.data.id,
                      price: props.data.price,
                    },
                    setTime(item),
                  )
                }>
                <Text
                  style={
                    time !== item
                      ? {color: 'black', fontWeight: '500'}
                      : {color: 'purple', fontWeight: '500'}
                  }>
                  {item}
                </Text>
              </TouchableOpacity>
            </Box>
          )}
        />
        {/* </Box> */}
      </VStack>

      <HStack justifyContent="space-between">
        <Text style={style.textPriceTitle}>Price</Text>
        <Text style={style.textPrice}>
          {props.rupiah(props.data.price)}/seat
        </Text>
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
    // elevation: 5,
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
