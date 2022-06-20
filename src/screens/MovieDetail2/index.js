import React, {useState, useEffect} from 'react';
import axios from '../../utils/axios';
import {ScrollView, TouchableOpacity, View} from 'react-native';
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

import style from './styles';
import CardSchedule from '../../components/CardSchedule';
import Footer from '../../components/Footer';

export default function MovieDetail2Screen(props) {
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
  const [dataOrder, setDataOrder] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [location, SetLocation] = useState('');
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
      setData(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data);

  const [openDropdown, setOpenDropdown] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Tangerang', value: 'tangerang'},
    {label: 'Jakarta', value: 'jakarta'},
    {label: 'Bandung', value: 'Bandung'},
  ]);

  // console.log(value);

  return (
    <ScrollView>
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
          {/* <SelectDropdown
            data={city}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          /> */}

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
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          {/* <DatePicker date={date} onDateChange={setDate} /> */}
          <VStack space={2} mt={5}>
            <CardSchedule {...props} />
            <CardSchedule {...props} />
            <CardSchedule {...props} />
            <CardSchedule {...props} />
            <CardSchedule {...props} />
          </VStack>
          <Text style={{color: 'purple', marginVertical: 19}}>View More</Text>
        </Center>
      </Box>
      <Box>
        <Footer {...props} />
      </Box>
    </ScrollView>
  );
}
