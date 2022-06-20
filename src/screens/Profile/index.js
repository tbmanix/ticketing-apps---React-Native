import * as React from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {
  Box,
  Button,
  Center,
  Image,
  Text,
  VStack,
  FormControl,
  Input,
  InputGroup,
  InputLeftAddon,
  Divider,
} from 'native-base';
import {View, useWindowDimensions, ScrollView} from 'react-native';

import Footer from '../../components/Footer';
import styles from './styles';

const FirstRoute = props => (
  <ScrollView style={styles.container}>
    <Box bgColor="white" rounded="10" marginX={5} p="5" marginTop={5}>
      <Text fontSize="md" fontWeight="light">
        INFO
      </Text>

      <VStack space="4" alignItems="center" marginY="5">
        <Image
          // bgColor="black"
          source={require('../../assets/img/Ava.png')}
          alt="img_ava"
          rounded="100"
          resizeMode="cover"
          // width={30}
        />
        <Text fontSize="2xl" fontWeight="bold">
          Jonas El Rodriguez
        </Text>
        <Text fontSize="md">Moviegoers</Text>
        <Divider />
        <Button width="50%" bgColor="#5f2eea">
          Logout
        </Button>
      </VStack>
    </Box>
    <Box marginX={5} marginTop={5}>
      <Text fontSize="xl" fontWeight="semibold">
        Account Settings
      </Text>
      <Box bgColor="white" rounded="10" p="5">
        <Text fontSize="md" fontWeight="light">
          Details Information
        </Text>
        <Divider mt={2} />
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Full Name</FormControl.Label>
            <Input placeholder="Jonas El Rodriguez" />
          </FormControl>
          <FormControl>
            <FormControl.Label>E-mail</FormControl.Label>
            <Input placeholder="jonas@gmail.com" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Phone Number</FormControl.Label>
            <InputGroup w="100%">
              <InputLeftAddon children={'+62'} w="15%" />
              <Input w="85%" placeholder="876543234567" />
            </InputGroup>
          </FormControl>
        </VStack>
      </Box>
      <Button
        mt="5"
        colorScheme="indigo"
        rounded="7"
        width="80%"
        alignSelf="center">
        Update Changes
      </Button>
    </Box>
    <Box bgColor="white" rounded="10" marginX={5} p="5" marginTop={5}>
      <Text fontSize="md" fontWeight="light">
        Account & Privacy
      </Text>
      <Divider mt={2} />
      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>New Password</FormControl.Label>
          <Input placeholder="Input your new password" type="password" />
        </FormControl>
        <FormControl>
          <FormControl.Label>Confirm</FormControl.Label>
          <Input placeholder="input your new password" type="password" />
        </FormControl>
        {/* <Button mt="2" colorScheme="indigo" rounded="7">
          Update Changes
        </Button> */}
      </VStack>
    </Box>
    <Button
      mt="5"
      colorScheme="indigo"
      rounded="7"
      width="80%"
      alignSelf="center">
      Update Changes
    </Button>
    <Box marginTop="10">
      <Footer {...props} />
    </Box>
  </ScrollView>
);

const SecondRoute = props => (
  <ScrollView style={styles.container}>
    <VStack space={5}>
      <Box bgColor="white" rounded="10" marginX={5} p="5" marginTop={5}>
        <VStack space={3} mt="5">
          <Image
            source={require('../../assets/img/ebvsponsor.png')}
            width="90"
            resizeMode="contain"
            alt="img_sponsor"
          />
          <Text fontSize="sm" color="gray.400">
            Tuesday, 07 July 2020 - 04:30pm
          </Text>
          <Text fontSize="md" color="black" fontWeight="semibold">
            Spider-Man: Homecoming
          </Text>
          <Divider />
          <Button onPress={() => props.navigation.navigate('TicketResult')}>
            Ticket in active
          </Button>
        </VStack>
      </Box>
      <Box bgColor="white" rounded="10" marginX={5} p="5">
        <VStack space={3} mt="5">
          <Image
            source={require('../../assets/img/ebvsponsor.png')}
            width="90"
            resizeMode="contain"
            alt="img_sponsor"
          />
          <Text>Tuesday, 07 July 2020 - 04:30pm</Text>
          <Text>Spider-Man: Homecoming</Text>
          <Divider />
          <Button
            colorScheme="gray"
            onPress={() => props.navigation.navigate('TicketResult')}>
            Ticket Used
          </Button>
        </VStack>
      </Box>
    </VStack>
    <Box marginTop="10">
      <Footer {...props} />
    </Box>
  </ScrollView>
);

export default function ProfileScreen(props) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Detail Account'},
    {key: 'second', title: 'Order History'},
  ]);

  const renderScene = SceneMap({
    first: () => <FirstRoute {...props} />,
    second: () => <SecondRoute {...props} />,
  });
  const renderTabBar = props => (
    <TabBar
      {...props}
      renderLabel={({route, color}) => (
        <Text style={{color: 'black', margin: 8}}>{route.title}</Text>
      )}
      indicatorStyle={{backgroundColor: '#5f2eea'}}
      style={{backgroundColor: 'white'}}
    />
  );

  return (
    // <ScrollView>
    //   <Box>
    //     <Footer {...props} />
    //   </Box>
    // </ScrollView>

    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      initialLayout={{width: layout.width}}
    />
  );
}
