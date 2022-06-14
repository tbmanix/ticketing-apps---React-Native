import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

import HomeScreen from '../screens/Home';
import ViewAllScreen from '../screens/ViewAll';
import Header from '../components/Header';
import DrawerContent from '../components/DrawerContent';

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
    </Stack.Navigator>
  );
}

function ProfileNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        // component={HomeScreen}
        name="Profile"
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
    </Drawer.Navigator>
  );
}
