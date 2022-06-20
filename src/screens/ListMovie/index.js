import React, {useEffect, useState} from 'react';
// import {View, Text} from 'react-native';
import {
  Box,
  Heading,
  FlatList,
  VStack,
  HStack,
  Avatar,
  Text,
  Spacer,
  Center,
} from 'native-base';
import axios from '../../utils/axios';
import {ActivityIndicator} from 'react-native';

export default function ListMovie(props) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [last, setLast] = useState(false);

  useEffect(() => {
    getDataMovie();
  }, []);

  const getDataMovie = async () => {
    try {
      setRefresh(false);
      const result = await axios.get(`movie/?page=${page}&limit=8`);
      // console.log(result.data.data);
      setData(result.data.data);
      setTotalPage(result.data.pagination.totalPage);
    } catch (error) {}
  };

  const handleRefresh = () => {
    console.log('refresh success');
    setPage(1);
    setLast(false);
    if (page !== 1) {
      setRefresh(true);
    } else {
      getDataMovie();
    }
  };

  const handleLoadMore = () => {
    console.log('load more');
  };

  return (
    <Box>
      <Heading>List Movie</Heading>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: 'gray.600',
            }}
            borderColor="coolGray.200"
            pl="4"
            pr="5"
            py="2"
            my="3"
            w="100%">
            <HStack space={3} justifyContent="space-between">
              <Avatar size="48px" />
              <VStack>
                <Text
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  color="coolGray.800"
                  bold
                  // w="50%"
                  maxW="150"
                  isTruncated>
                  {item.name}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}>
                  {item.genre}
                </Text>
              </VStack>
              <Spacer />
              <Text
                fontSize="xs"
                _dark={{
                  color: 'warmGray.50',
                }}
                color="coolGray.800"
                alignSelf="flex-start">
                minggu
              </Text>
            </HStack>
          </Box>
        )}
        keyExtractor={item => item.id}
        onRefresh={handleRefresh}
        refreshing={refresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          last ? (
            <Box>
              <Center>
                <Text>No More Datal</Text>
              </Center>
            </Box>
          ) : loading ? (
            <ActivityIndicator size="large" color="red" />
          ) : null
        }
      />
    </Box>
  );
}
