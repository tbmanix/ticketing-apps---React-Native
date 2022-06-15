import * as React from 'react';
import {TabView, SceneMap} from 'react-native-tab-view';
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
} from 'native-base';
import {View, useWindowDimensions, ScrollView} from 'react-native';
import Footer from '../../components/Footer';

const FirstRoute = props => (
  <ScrollView>
    <Box bgColor="white" rounded="20" marginX={3} p="5">
      <Text>INFO</Text>

      <VStack space="5" alignItems="center" marginY="5">
        <Image
          bgColor="black"
          source={require('../../assets/img/Ava.png')}
          alt="img_ava"
          rounded="100"
          resizeMode="cover"
          // width={30}
        />
        <Text>Jonas El Rodriguez</Text>
        <Text>Moviegoers</Text>
        <Box borderWidth="0.5" borderBottomColor="black" w="90%" />
        <Button width="50%">Logout</Button>
      </VStack>
    </Box>
    <Box marginX={3}>
      <Text>Account Settings</Text>
      <Box bgColor="white" rounded="20" p="5">
        <Text>Details Information</Text>
        <Box borderWidth="0.5" borderBottomColor="black" w="90%" />
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
          <Button mt="2" colorScheme="indigo" rounded="7">
            Update Changes
          </Button>
        </VStack>
      </Box>
    </Box>
    <Box bgColor="white" rounded="20" marginX={3} p="5">
      <Text>Account and Privacy</Text>
      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>New Password</FormControl.Label>
          <Input placeholder="Input your new password" type="password" />
        </FormControl>
        <FormControl>
          <FormControl.Label>Confirm</FormControl.Label>
          <Input placeholder="input your new password" type="password" />
        </FormControl>
        <Button mt="2" colorScheme="indigo" rounded="7">
          Update Changes
        </Button>
      </VStack>
    </Box>
    <Box>
      <Footer {...props} />
    </Box>
  </ScrollView>
);

const SecondRoute = props => (
  <ScrollView>
    <Box bgColor="white" rounded="20" marginX={3} p="5">
      <VStack space={3} mt="5">
        <Image
          source={require('../../assets/img/ebvsponsor.png')}
          width="90"
          resizeMode="contain"
          alt="img_sponsor"
        />
        <Text>Tuesday, 07 July 2020 - 04:30pm</Text>
        <Text>Spider-Man: Homecoming</Text>
        <Box borderWidth="0.5" borderBottomColor="black" />
        <Button onPress={() => props.navigation.navigate('TicketResult')}>
          Ticket in active
        </Button>
      </VStack>
    </Box>
    <Box bgColor="white" rounded="20" marginX={3} p="5">
      <VStack space={3} mt="5">
        <Image
          source={require('../../assets/img/ebvsponsor.png')}
          width="90"
          resizeMode="contain"
          alt="img_sponsor"
        />
        <Text>Tuesday, 07 July 2020 - 04:30pm</Text>
        <Text>Spider-Man: Homecoming</Text>
        <Box borderWidth="0.5" borderBottomColor="black" />
        <Button
          colorScheme="gray"
          onPress={() => props.navigation.navigate('TicketResult')}>
          Ticket Used
        </Button>
      </VStack>
    </Box>
    <Box>
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
      initialLayout={{width: layout.width}}
    />
  );
}
