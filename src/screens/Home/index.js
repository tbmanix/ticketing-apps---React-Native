import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import style from './styles';
import Footer from '../../components/footer';
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
    ,
  ];
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
          <Text>Now Showing</Text>
          {/* <Text onPress={props.navigation.navigate('ViewAll')}>View All</Text> */}
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ViewAll')}>
            <Text>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true}>
          {poster.map((item, index) => (
            <View style={style.card} key={index}>
              <Image
                source={require('../../assets/img/poster.png')}
                style={style.poster}
              />
              <Text style={{marginTop: 10}}>{item.name}</Text>
              <Text style={{marginBottom: 20}}>{item.genre}</Text>
              <Button title="Details" />
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
          <Text>Upcoming Movies</Text>
          <Text>View All</Text>
        </View>
        <ScrollView horizontal={true}>
          {month.map(item => (
            <TouchableOpacity style={style.btnMonth} key={item}>
              <Text>{item}</Text>
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
              <Text style={{marginTop: 10}}>{item.name}</Text>
              <Text style={{marginBottom: 20}}>{item.genre}</Text>
              <Button title="Details" />
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
      <Footer />
    </ScrollView>
  );
}
