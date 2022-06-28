import React, {useState, useEffect} from 'react';
import axios from '../../utils/axios';
import {
  ScrollView,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
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
import moment from 'moment';

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
  const [location, setLocation] = useState('');
  const [totalPage, setTotalPage] = useState(10);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [last, setLast] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  const [dataOrder, setDataOrder] = useState({});

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const dateDataDetail = moment(dataDetail.releaseDate).format('MMMM D, YYYY');

  useEffect(() => {
    getDataSchedule();
  }, []);

  useEffect(() => {
    getDataSchedule();
  }, [page, location]);

  const getDataSchedule = async () => {
    try {
      // console.log(page, totalPage);
      setRefresh(false);
      setLoading(false);
      setLoadMore(false);
      if (page <= totalPage || totalPage === 0) {
        const result = await axios.get(
          `schedule/?page=${page}&limit=2&sort=name ASC&searchMovieId=${dataDetail.id}&searchLocation=${location}`,
        );
        const userId = await AsyncStorage.getItem('id');
        setData(result.data.data);
        setDataOrder({
          userId: userId,
          movieId: dataDetail.id,
          dateBooking: new Date().toISOString().split('T')[0],
          name: dataDetail.name,
        });
        if (page === 1) {
          // console.log(true);
          setData(result.data.data);
        } else {
          // console.log(false, result.data.data);
          setData([...data, ...result.data.data]);
        }
        setTotalPage(result.data.pagination.totalPage);
        if (result.data.data.length <= 1 || page === totalPage) {
          setLast(true);
        }
        // setTotalPage(3);
      } else {
        setLast(true);
      }
    } catch (error) {
      console.log(error);
    }
    // try {
    //   const result = await axios.get(
    //     `schedule/?page=${page}&limit=90&sort=name ASC&searchMovieId=${dataDetail.id}&searchLocation=${location}`,
    //   );
    //   const userId = await AsyncStorage.getItem('id');
    //   setData(result.data.data);
    //   setDataOrder({
    //     userId: userId,
    //     movieId: dataDetail.id,
    //     dateBooking: new Date().toISOString().split('T')[0],
    //     name: dataDetail.name,
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
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

  // console.log(location);

  const [openDropdown, setOpenDropdown] = useState(false);
  // const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'All', value: ''},
    {label: 'Bogor', value: 'bogor'},
    {label: 'Parung', value: 'parung'},
    {label: 'Tangerang', value: 'tangerang'},
    {label: 'Jakarta', value: 'jakarta'},
    {label: 'Bandung', value: 'Bandung'},
  ]);

  const handleRefresh = () => {
    console.log('REFRESH SCREEN');
    setPage(1);
    setLast(false);
    setLocation('');
    if (page !== 1) {
      setRefresh(true);
    }
    // else {
    // getDataSchedule();
    // }
  };

  const handleLoadMore = () => {
    console.log('LOAD MORE DATA');
    if (!loadMore) {
      const newPage = page + 1;
      setLoadMore(true);
      if (newPage <= totalPage) {
        setLoading(true);
        setPage(newPage);
      } else {
        setLoading(false);
      }
    }
  };
  const handleLocation = dataLocation => {
    setLocation(dataLocation);
    setPage(1);
    setTotalPage(10);
    setLast(false);
    // getDataSchedule();
    // console.log(data);
  };

  const Rupiah = number => {
    const format = number.toString().split('').reverse().join('');
    const convert = format.match(/\d{1,3}/g);
    const rupiah = 'Rp ' + convert.join('.').split('').reverse().join('');
    return rupiah;
  };

  // console.log(location);

  const ListHeader = () => {
    return (
      <>
        <Box p={5} bgColor="white">
          <Center>
            <Box style={style.cardPoster}>
              <Image
                source={{
                  uri: `https://res.cloudinary.com/dx8zjtlv8/image/upload/v1651042190/${dataDetail.image}`,
                }}
                style={style.imagePoster}
                alt="img_poster"
              />
            </Box>

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
              <Text fontSize="md">{dateDataDetail}</Text>
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
        <Box bg="#d6d8e7" p={5} zIndex="99">
          <Center>
            <Text fontSize="2xl">Showtimes and Tickets</Text>

            {/* <DropDownPicker
              open={openDropdown}
              value={location}
              items={items}
              setOpen={setOpenDropdown}
              setValue={SetLocation}
              setItems={setItems}
              autoScroll={true}
              zIndex={1000}
            /> */}

            <Select
              bgColor="white"
              selectedValue={location}
              accessibilityLabel="Sort Location"
              width="100%"
              placeholder="Sort"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size={5} />,
              }}
              onValueChange={itemValue => handleLocation(itemValue)}>
              <Select.Item label="View All" value="" />
              <Select.Item label="Tangerang" value="tangerang" />
              <Select.Item label="Bogor" value="bogor" />
              <Select.Item label="Parung" value="parung" />
              <Select.Item label="Jakarta" value="jakarta" />
            </Select>

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

  const ListFooter = () => {
    return (
      <>
        {last ? (
          <View>
            <Center marginY="6">
              <Text>-- No more data --</Text>
            </Center>
            <Footer {...props} />
          </View>
        ) : loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <Center>
            <Button onPress={handleLoadMore}>loadMore</Button>
          </Center>
        )}
      </>
    );
  };

  return (
    <View style={{paddingBottom: 30, padding: 5}}>
      <FlatList
        data={data}
        ListHeaderComponent={ListHeader}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <VStack space={5} mt={5} marginX={5}>
            <CardSchedule
              {...props}
              data={item}
              handleTime={handleTime}
              dataOrder={dataOrder}
              rupiah={Rupiah}
            />
          </VStack>
        )}
        onRefresh={handleRefresh}
        refreshing={refresh}
        // onEndReached={handleLoadMore}
        // onEndReachedThreshold={0.1}
        ListFooterComponent={ListFooter}
      />
    </View>
  );
}
