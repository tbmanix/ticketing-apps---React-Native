import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

import HomeScreen from '../screens/Home';
import ViewAllScreen from '../screens/ViewAll';
import MovieDetailScreen from '../screens/MovieDetail';
import Header from '../components/Header';
import DrawerContent from '../components/DrawerContent';
import SeatScreen from '../screens/Order';
import PaymentScreen from '../screens/Payment';
import ProfileScreen from '../screens/Profile';
import TicketResultScreen from '../screens/TicketResult';
import Counter from '../screens/Counter';
import ListMovie from '../screens/ListMovie';
import Midtrans from '../screens/Midtrans';

function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={HomeScreen}
        name="Home"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={ViewAllScreen}
        name="ViewAll"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={MovieDetailScreen}
        name="MovieDetail"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={SeatScreen}
        name="Seat"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={PaymentScreen}
        name="Payment"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={Midtrans}
        name="Midtrans"
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function ProfileNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={ProfileScreen}
        name="Profile"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={TicketResultScreen}
        name="TicketResult"
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default function AppNavgiator() {
  return (
    <Drawer.Navigator
      screenOptions={{drawerPosition: 'right'}}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        component={HomeNavigator}
        name="HomeNavigator"
        options={{
          title: 'Home',
          header: props => <Header {...props} />,
          drawerIcon: ({size, color}) => {
            <Icon name="home" size={size} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        component={ProfileNavigator}
        name="ProfileNavigator"
        options={{
          title: 'Profile',
          header: props => <Header {...props} />,
          drawerIcon: ({size, color}) => {
            <Icon name="user" size={size} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        component={Counter}
        name="Counter"
        options={{
          title: 'Counter',
          header: props => <Header {...props} />,
          drawerIcon: ({size, color}) => {
            <Icon name="user" size={size} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        component={ListMovie}
        name="ListMovie"
        options={{
          title: 'List',
          header: props => <Header {...props} />,
          drawerIcon: ({size, color}) => {
            <Icon name="user" size={size} color={color} />;
          },
        }}
      />
    </Drawer.Navigator>
  );
}
