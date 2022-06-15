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
import {View, ScrollView, StyleSheet} from 'react-native';

import Footer from '../../components/Footer';
import style from './styles';

export default function TicketResultScreen(props) {
  return (
    <ScrollView style={style.container}>
      <Box bgColor="white" rounded="30" marginX={3} p="5" mt={5}>
        <VStack space="5" alignItems="center" marginY="5" flex={1}>
          <Image source={require('../../assets/img/Qr.png')} alt="img_QRCode" />
        </VStack>
        <Box style={style.radiusLeftBottom} />
        <Box style={style.radiusRightBottom} />
      </Box>
      <Divider width="80%" alignSelf="center" />
      <Box bgColor="white" rounded="30" marginX={3} p="5">
        <Box style={style.radiusLeftTop} />
        <Box style={style.radiusRightTop} />

        <HStack mt="5" flex={1}>
          <VStack flex={1} space={3}>
            <Box>
              <Text fontSize="sm" color="gray.400">
                Movie
              </Text>
              <Text
                fontSize="md"
                color="black"
                fontWeight="semibold"
                isTruncated
                w="80%">
                Spider-Man: Homecoming
              </Text>
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.400">
                Date
              </Text>
              <Text
                fontSize="md"
                color="black"
                fontWeight="semibold"
                isTruncated
                w="80%">
                07 July 2020
              </Text>
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.400">
                Count
              </Text>
              <Text
                fontSize="md"
                color="black"
                fontWeight="semibold"
                isTruncated
                w="80%">
                3 pcs
              </Text>
            </Box>
          </VStack>
          <VStack flex={1} space={3}>
            <Box>
              <Text fontSize="sm" color="gray.400">
                Category
              </Text>
              <Text
                fontSize="md"
                color="black"
                fontWeight="semibold"
                isTruncated
                w="80%">
                Action, Drama, Superhero
              </Text>
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.400">
                Time
              </Text>
              <Text
                fontSize="md"
                color="black"
                fontWeight="semibold"
                isTruncated
                w="80%">
                2:00pm
              </Text>
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.400">
                Seats
              </Text>
              <Text fontSize="md" color="black" fontWeight="semibold">
                C4, C5, C6
              </Text>
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
          <Text fontSize="lg" color="black" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="lg" color="black" fontWeight="semibold">
            $30.00
          </Text>
        </Box>
      </Box>
      <Box marginTop="10">
        <Footer {...props} />
      </Box>
    </ScrollView>
  );
}
