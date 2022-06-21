import React, {useState, useEffect} from 'react';
import axios from '../../utils/axios';
import {ScrollView, TouchableOpacity, View, FlatList} from 'react-native';
import {
  Button,
  Select,
  Box,
  CheckIcon,
  Input,
  Image,
  Center,
  Text,
  Flex,
  HStack,
  TextArea,
  VStack,
  Divider,
} from 'native-base';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import style from './styles';
import CardSchedule from '../../components/CardSchedule';
import Footer from '../../components/Footer';

export default function MovieDetailScreen(props) {
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
  const dataDetail = props.route.params.detailMovie;

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [location, SetLocation] = useState('');

  const [dataOrder, setDataOrder] = useState({});
  const city = ['Tangerang', 'Jakarta', 'Bandung'];

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  useEffect(() => {
    getDataSchedule();
  }, []);

  const getDataSchedule = async () => {
    try {
      const result = await axios.get(
        `schedule/?page=${page}&limit=90&sort=name ASC&searchMovieId=${dataDetail.id}&searchLocation=${location}`,
      );
      const userId = await AsyncStorage.getItem('id');
      setData(result.data.data);
      setDataOrder({
        userId: userId,
        movieId: dataDetail.id,
        dateBooking: new Date().toISOString().split('T')[0],
        name: dataDetail.name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookingDate = e => {
    setDataOrder({...dataOrder, dateBooking: e.toISOString().split('T')[0]});
    // console.log(e);
  };

  const handleTime = e => {
    setDataOrder({
      ...dataOrder,
      timeBooking: e.timeBooking,
      scheduleId: e.scheduleId,
      price: e.price,
    });
  };

  console.log(dataOrder);

  const [openDropdown, setOpenDropdown] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Tangerang', value: 'tangerang'},
    {label: 'Jakarta', value: 'jakarta'},
    {label: 'Bandung', value: 'Bandung'},
  ]);

  // console.log(value);

  const ListHeader = () => {
    return (
      <>
        <Box p={5} bgColor="white">
          <Center>
            <Image
              source={require('../../assets/img/poster.png')}
              alt="img_poster"
            />
            <Text fontSize="2xl" mt="2">
              {dataDetail.name}
            </Text>
            <Text fontSize="sm" mb="5">
              {dataDetail.genre}
            </Text>
          </Center>
          <HStack justifyContent="space-between">
            <Box flex={1}>
              <Text fontSize="sm" color="gray.400">
                Release Date
              </Text>
              <Text fontSize="md">{dataDetail.releaseDate}</Text>
              <Text fontSize="sm" color="gray.400" mt="3">
                Duration
              </Text>
              <Text fontSize="md">{dataDetail.duration}</Text>
            </Box>
            <Box flex={1}>
              <Text fontSize="sm" color="gray.400">
                Directed By
              </Text>
              <Text fontSize="md">{dataDetail.director}</Text>
              <Text fontSize="sm" color="gray.400" mt="3">
                Cast
              </Text>
              <Text fontSize="md">{dataDetail.cast}</Text>
            </Box>
          </HStack>
          <Divider w="90%" alignSelf="center" marginY="4" />
          <Box mb="5">
            <Text fontSize="md">Synopsis</Text>
            <Text fontSize="sm" color="gray.400">
              {dataDetail.synopsis}
            </Text>
          </Box>
        </Box>
        <Box bg="#d6d8e7" p={5}>
          <Center>
            <Text fontSize="2xl">Showtimes and Tickets</Text>

            <DropDownPicker
              open={openDropdown}
              value={value}
              items={items}
              setOpen={setOpenDropdown}
              setValue={setValue}
              setItems={setItems}
            />

            <Button
              w="100%"
              onPress={() => setOpen(true)}
              bgColor="white"
              _text={{color: 'black'}}
              borderWidth="1"
              marginTop={2}
              rounded="10"
              padding="3"
              justifyContent="space-between"
              flexDirection="row">
              {date === new Date()
                ? 'Set Date'
                : date.toLocaleDateString('en-US', options)}
              {/* <Icon name="home" /> */}
            </Button>
            <DatePicker
              modal
              mode="date"
              open={open}
              date={new Date()}
              minimumDate={date}
              onConfirm={date => {
                setOpen(false);
                setDate(date);
                handleBookingDate(date);
              }}
              // onPress={() => handleBookingDate(date)}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </Center>
        </Box>
      </>
    );
  };

  return (
    <View style={{paddingBottom: 30}}>
      <FlatList
        data={data}
        ListHeaderComponent={ListHeader}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <VStack space={2} mt={5}>
            <CardSchedule
              {...props}
              data={item}
              handleTime={handleTime}
              dataOrder={dataOrder}
            />
          </VStack>
        )}
        // onRefresh={handleRefresh}
        // refreshing={refresh}
        // onEndReached={handleLoadMore}
        // onEndReachedThreshold={0.1}
        // ListFooterComponent={() =>
        //   last ? (
        //     <View>
        //       <Center>
        //         <Text>-- No more data --</Text>
        //       </Center>
        //       <Footer {...props} />
        //     </View>
        //   ) : loading ? (
        //     <ActivityIndicator size="large" color="blue" />
        //   ) : null
        // }
      />
    </View>
  );
}
