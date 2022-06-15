import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
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
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';

import style from './styles';
import CardSchedule from '../../components/CardSchedule';
import Footer from '../../components/Footer';

export default function MovieDetailScreen(props) {
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

  const city = ['Tangerang', 'Jakarta', 'Bandung'];

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  console.log(open);

  const [openDropdown, setOpenDropdown] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Tangerang', value: 'tangerang'},
    {label: 'Jakarta', value: 'jakarta'},
    {label: 'Bandung', value: 'Bandung'},
  ]);

  console.log(value);

  return (
    <ScrollView>
      <Box p={3}>
        <Center>
          <Image
            source={require('../../assets/img/poster.png')}
            alt="img_poster"
          />
          <Text fontSize="xl">{poster.name}</Text>
          <Text>{poster.genre}</Text>
        </Center>
        <HStack justifyContent="space-between">
          <Box flex={1}>
            <Text>Release Date</Text>
            <Text>{poster.releaseDate}</Text>
            <Text>Duration</Text>
            <Text>{poster.duration}</Text>
          </Box>
          <Box flex={1}>
            <Text>Directed By</Text>
            <Text>{poster.director}</Text>
            <Text>Cast</Text>
            <Text>{poster.cast}</Text>
          </Box>
        </HStack>
        <Box style={{borderBottomColor: 'black', borderWidth: 0.5}} />
        <Box>
          <Text>Synopsis</Text>
          <Text>{poster.synopsis}</Text>
        </Box>
      </Box>
      <Box bg="#d6d8e7" p={3}>
        <Center>
          <Text>Showtimes and Tickets</Text>
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
            padding="3">
            Set Date
          </Button>
          <DatePicker
            modal
            open={open}
            date={date}
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
          <Text>Show More</Text>
        </Center>
      </Box>
      <Box>
        <Footer {...props} />
      </Box>
    </ScrollView>
  );
}
