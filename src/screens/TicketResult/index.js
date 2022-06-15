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
  HStack,
  Divider,
} from 'native-base';
import React from 'react';
import {View, ScrollView} from 'react-native';
import Footer from '../../components/Footer';

export default function TicketResultScreen(props) {
  return (
    <ScrollView>
      <Box bgColor="white" rounded="30" marginX={3} p="5" mt={5}>
        <VStack space="5" alignItems="center" marginY="5" flex={1}>
          <Image source={require('../../assets/img/Qr.png')} alt="img_QRCode" />
        </VStack>
      </Box>
      {/* <Box
        w="50"
        h="50"
        borderRadius="100"
        bgColor="#f5f6f8"
        zIndex={1}
        position="absolute"
        bottom="50%"
        top="50%"
        left="-10%"
      />

      <Box
        w="50"
        h="50"
        borderRadius="100"
        bgColor="#f5f6f8"
        zIndex={1}
        position="absolute"
        bottom="50%"
        top="50%"
        right="-10%"
      /> */}
      <Divider />
      <Box bgColor="white" rounded="30" marginX={3} p="5">
        <HStack mt="5" flex={1}>
          <VStack flex={1} space={3}>
            <Box>
              <Text>Movie</Text>
              <Text isTruncated w="80%">
                Spider-Man: Homecoming
              </Text>
            </Box>
            <Box>
              <Text>Date</Text>
              <Text isTruncated w="80%">
                07 July 2020
              </Text>
            </Box>
            <Box>
              <Text>Count</Text>
              <Text isTruncated w="80%">
                3 pcs
              </Text>
            </Box>
          </VStack>
          <VStack flex={1} space={3}>
            <Box>
              <Text>Category</Text>
              <Text isTruncated w="80%">
                Action, Drama, Superhero
              </Text>
            </Box>
            <Box>
              <Text>Time</Text>
              <Text isTruncated w="80%">
                2:00pm
              </Text>
            </Box>
            <Box>
              <Text>Seats</Text>
              <Text>C4, C5, C6</Text>
            </Box>
          </VStack>
        </HStack>
        <Box
          flexDirection="row"
          w="100%"
          justifyContent="space-between"
          p="3"
          marginTop="4"
          borderWidth="0.5"
          borderColor="black"
          borderRadius="10">
          <Text>Total</Text>
          <Text>$30.00</Text>
        </Box>
      </Box>
      <Box>
        <Footer {...props} />
      </Box>
    </ScrollView>
  );
}
