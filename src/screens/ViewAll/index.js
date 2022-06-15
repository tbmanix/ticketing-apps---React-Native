import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {
  Button,
  Select,
  Box,
  CheckIcon,
  Input,
  Icon,
  Ionicons,
} from 'native-base';

import style from './styles';
import CardPoster from '../../components/CardPoster';

export default function ViewAllScreen(props) {
  const poster = [
    {
      img: '../../assets/img/poster.png',
      name: 'Spiderman',
      genre: 'Sci Fi, Action, Drama',
    },
    {
      img: '../../assets/img/poster.png',
      name: 'One Piece',
      genre: 'Sci Fi, Action, Drama',
    },
    {
      img: '../../assets/img/poster.png',
      name: 'Bleach',
      genre: 'Sci Fi, Action, Drama',
    },
    {
      img: '../../assets/img/poster.png',
      name: 'Dragon Ball',
      genre: 'Sci Fi, Action, Drama',
    },
    ,
  ];
  const page = [1, 2, 3, 4, 5];
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'Desember',
  ];
  let [service, setService] = React.useState('');
  console.log(service);
  return (
    <ScrollView>
      <View>
        <View style={style.listMovie}>
          <Select
            selectedValue={service}
            accessibilityLabel="Sort"
            width={100}
            placeholder="Sort"
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size={5} />,
            }}
            onValueChange={itemValue => setService(itemValue)}>
            <Select.Item label="A to Z" value="A" />
            <Select.Item label="Z to A" value="B" />
            <Select.Item label="Newest" value="C" />
          </Select>
          {/* <Input placeholder="Input Search..." size="xs" /> */}
          <Input placeholder="Search" w="50%" size="sm" />
        </View>
        <ScrollView horizontal={true}>
          {month.map(item => (
            <TouchableOpacity style={style.btnMonth} key={item}>
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={style.containerPoster}>
          {poster.map((item, index) => (
            <View key={index}>
              <CardPoster {...props} data={item} />
            </View>
          ))}
        </View>
        <View style={style.pagination}>
          {page.map(item => (
            <TouchableOpacity style={style.btnPaginate}>
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
