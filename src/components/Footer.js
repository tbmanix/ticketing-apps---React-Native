import React from 'react';
import {Box, HStack, Image, Text, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import IconAnt from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native';

export default function Footer(props) {
  return (
    <VStack
      space={6}
      // marginTop="10"
      bgColor="white"
      paddingTop="5"
      paddingX={5}>
      <Box>
        <Image source={require('../assets/img/Vector.png')} alt="img_logo" />
        <Text mt={3}>
          Stop waiting in line. Buy tickets conveniently, watch movies quietly.
        </Text>
      </Box>
      <Box>
        <Text fontSize="md" fontWeight="semibold" mb={2}>
          Explore
        </Text>
        <HStack>
          <Box flex={1}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
              <Text fontSize="md">Home</Text>
            </TouchableOpacity>
          </Box>
          <Box flex={2}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('ViewAll')}>
              <Text fontSize="md">List movie</Text>
            </TouchableOpacity>
          </Box>
        </HStack>
      </Box>
      <Box>
        <Text fontSize="md" fontWeight="semibold" mb={2}>
          Our Sponsor
        </Text>
        <HStack space={3} alignItems="flex-end">
          <Image
            // flex={0.5}
            source={require('../assets/img/ebvsponsor.png')}
            alt="img_sponsor"
            resizeMode="contain"
            width="20"
            height="10"
            // bgColor="black"
          />
          <Image
            // flex={0.5}
            source={require('../assets/img/cineonesponsor.png')}
            alt="img_sponsor"
            resizeMode="contain"
            width="20"
            height="10"
            // bgColor="black"
          />
          <Image
            // flex={0.5}
            source={require('../assets/img/hiflixspnsor.png')}
            alt="img_sponsor"
            width="20"
            height="10"
            resizeMode="contain"
          />
        </HStack>
      </Box>
      <Box>
        <Text fontSize="md" fontWeight="semibold" mb={3}>
          Social Media
        </Text>
        <HStack space={10}>
          <Icon name="facebook" size={20} />
          <Icon name="instagram" size={20} />
          <Icon name="twitter" size={20} />
          <Icon name="youtube" size={20} />
        </HStack>
      </Box>
      <Box mb={3}>
        <Text>
          <IconAnt name="copyright" /> 2020 Tickitz. All Right Reserved
        </Text>
      </Box>
    </VStack>
  );
}
