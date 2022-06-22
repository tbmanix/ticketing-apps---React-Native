import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  // Button,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Button, Select} from 'native-base';

import style from './styles';
import Footer from '../../components/Footer';
import Navbar from '../../components/navbar';

export default function HomeScreen(props) {
  const poster = [
    {
      img: '../../assets/img/poster.png',
      name: 'Spiderman',
      genre: 'Sci Fi, Action, Drama',
    },
    {
      img: '../../assets/img/poster.png',
      name: 'Naruto',
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
  ];
  const [month, setMonth] = useState(new Date().getMonth() + 2);
  console.log(month);

  const monthFilter = [
    {name: 'January', value: 1},
    {name: 'February', value: 2},
    {name: 'March', value: 3},
    {name: 'April', value: 4},
    {name: 'May', value: 5},
    {name: 'June', value: 6},
    {name: 'July', value: 7},
    {name: 'August', value: 8},
    {name: 'September', value: 9},
    {name: 'October', value: 10},
    {name: 'November', value: 11},
    {name: 'Desember', value: 12},
  ];

  return (
    <ScrollView style={style.container}>
      {/* <Navbar /> */}
      <View style={style.bannerText}>
        <Text>Nearest Cinema, Newest Movie,</Text>
        <Text style={{color: '#5f2eea', fontSize: 40, fontWeight: 'bold'}}>
          Find out now!
        </Text>
      </View>
      <View style={style.bannerImage}>
        <Image
          style={{alignSelf: 'flex-end'}}
          source={require('../../assets/img/banner1.png')}
        />
        <Image
          style={{alignSelf: 'center'}}
          source={require('../../assets/img/banner2.png')}
        />
        <Image
          style={{alignSelf: 'flex-start'}}
          source={require('../../assets/img/banner3.png')}
        />
      </View>
      <View style={style.nowShowing}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={style.textMedium}>Now Showing</Text>
          {/* <Text onPress={props.navigation.navigate('ViewAll')}>View All</Text> */}
          <TouchableOpacity
            style={style.textLink}
            onPress={() => props.navigation.navigate('ViewAll')}>
            <Text style={style.textNormalPurple}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true}>
          {poster.map((item, index) => (
            <View style={style.card} key={index}>
              <Image
                source={require('../../assets/img/poster.png')}
                style={style.poster}
              />
              <Text style={style.textTitle}>{item.name}</Text>
              <Text style={style.textGenre}>{item.genre}</Text>
              <Button
                variant="outline"
                size="sm"
                _text={{
                  color: 'purple.600',
                }}
                borderColor="purple.600">
                Details
              </Button>
            </View>
          ))}
          {/* <View style={style.card}>
            <Image
              source={require('../../assets/img/poster.png')}
              style={style.poster}
            />
            <Text>Spiderman</Text>
            <Text>Genre</Text>
            <Button title="Details" />
          </View> */}
        </ScrollView>
      </View>
      <View style={style.upComing}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={style.textMedium}>Upcoming Movies</Text>
          <TouchableOpacity style={style.textLink}>
            <Text
              style={style.textNormalPurple}
              onPress={() => props.navigation.navigate('ViewAll')}>
              View All
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true}>
          {monthFilter.map(item => (
            <TouchableOpacity
              style={
                item.value === month ? style.btnMonthActive : style.btnMonth
              }
              onPress={() => setMonth(item.value)}
              key={item.value}>
              <Text
                style={
                  item.value === month ? {color: 'white'} : {color: 'blue'}
                }>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView horizontal={true}>
          {poster.map((item, index) => (
            <View style={style.card} key={index}>
              <Image
                source={require('../../assets/img/poster.png')}
                style={style.poster}
              />
              <Text style={style.textTitle}>{item.name}</Text>
              <Text style={style.textGenre}>{item.genre}</Text>
              <Button
                variant="outline"
                size="sm"
                _text={{
                  color: 'purple.600',
                }}
                borderColor="purple.600"
                onPress={() => props.navigation.navigate('MovieDetail')}>
                Details
              </Button>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={style.join}>
        <Text>Be the vanguard of the</Text>
        <Text
          style={{
            fontSize: 50,
          }}>
          Moviegoers
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: 'black',
            width: '100%',
            borderRadius: 5,
            marginTop: 30,
          }}
          placeholder="Type Your Email"
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#5f2eea',
            width: '100%',
            padding: 15,
            borderRadius: 5,
            marginTop: 10,
          }}>
          <Text style={{color: 'white', textAlign: 'center'}}>Join Now</Text>
        </TouchableOpacity>
        <Text
          style={{marginTop: 40, textAlign: 'center', paddingHorizontal: 20}}>
          By joining you as a Tickitz member, we will always send you the latest
          updates via email .
        </Text>
      </View>
      <View>
        <Footer {...props} />
      </View>
    </ScrollView>
  );
}
