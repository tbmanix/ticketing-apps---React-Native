import React from 'react';
import {Box, HStack, Image, Text, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import IconAnt from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native';

export default function Footer(props) {
  return (
    <VStack
      space={5}
      marginTop="10"
      bgColor="white"
      paddingTop="5"
      paddingX={3}>
      <Box>
        <Image source={require('../assets/img/Vector.png')} alt="img_logo" />
        <Text>
          Stop waiting in line. Buy tickets conveniently, watch movies quietly.
        </Text>
      </Box>
      <Box>
        <Text>Explore</Text>
        <HStack>
          <Box flex={1}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
              <Text>Home</Text>
            </TouchableOpacity>
          </Box>
          <Box flex={2}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('ViewAll')}>
              <Text>List movie</Text>
            </TouchableOpacity>
          </Box>
        </HStack>
      </Box>
      <Box>
        <Text>Our Sponsor</Text>
        <HStack
          space={3}
          borderColor="black"
          borderWidth="1"
          alignItems="flex-end">
          <Image
            flex={1}
            source={require('../assets/img/ebvsponsor.png')}
            alt="img_sponsor"
            resizeMode="contain"
          />
          <Image
            flex={1}
            source={require('../assets/img/cineonesponsor.png')}
            alt="img_sponsor"
            resizeMode="contain"
          />
          <Image
            flex={1}
            source={require('../assets/img/hiflixspnsor.png')}
            alt="img_sponsor"
            resizeMode="contain"
          />
        </HStack>
      </Box>
      <Box>
        <Text>Our Sponsor</Text>
        <HStack space={10}>
          <Icon name="facebook" size={25} />
          <Icon name="instagram" size={25} />
          <Icon name="twitter" size={25} />
          <Icon name="youtube" size={25} />
        </HStack>
      </Box>
      <Box>
        <Text>
          <IconAnt name="copyright" /> 2020 Tickitz. All Right Reserved
        </Text>
      </Box>
    </VStack>
  );
}
