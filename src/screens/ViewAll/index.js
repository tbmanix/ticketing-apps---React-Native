import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {
  Button,
  Select,
  Box,
  CheckIcon,
  Input,
  Icon,
  Ionicons,
  Center,
} from 'native-base';
import axios from '../../utils/axios';

import style from './styles';
import CardPoster from '../../components/CardPoster';
import Footer from '../../components/Footer';

export default function ViewAllScreen(props) {
  const monthFilter = [
    {name: 'January', value: 1},
    {name: 'February', value: 2},
    {name: 'March', value: 3},
    {name: 'April', value: 4},
    {name: 'May', value: 5},
    {name: 'June', value: 6},
    {name: 'July', value: 7},
    {name: 'August', value: 8},
    {name: 'September', value: 9},
    {name: 'October', value: 10},
    {name: 'November', value: 11},
    {name: 'Desember', value: 12},
  ];

  // let [service, setService] = React.useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [last, setLast] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [month, setMonth] = useState('');
  const [sort, setSort] = useState('createdAt DESC');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    getDataMovie();
  }, []);

  useEffect(() => {
    // setTimeout(() => {
    getDataMovie();
    // }, 2000);
  }, [page, month, sort, keyword]);

  const getDataMovie = async () => {
    try {
      console.log(page, totalPage);
      setRefresh(false);
      setLoading(true);
      setLoadMore(false);

      if (page <= totalPage || totalPage === 0) {
        const result = await axios.get(
          `movie?page=${page}&limit=4&searchName=${keyword}&sort=${sort}&searchReleaseDate=${month}`,
        );

        if (page === 1) {
          // console.log(true);
          setData(result.data.data);
        } else {
          // console.log(false, result.data.data);
          setData([...data, ...result.data.data]);
        }
        setTotalPage(result.data.pagination.totalPage);

        if (result.data.data.length <= 3 || page === totalPage) {
          setLast(true);
        }
        // setTotalPage(3);
      } else {
        setLast(true);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(data.length);

  const handleRefresh = () => {
    console.log('REFRESH SCREEN');
    setPage(1);
    setMonth('');
    setSort('createdAt DESC');
    setKeyword('');
    setTotalPage(10);
    setLast(false);
    if (page !== 1) {
      setRefresh(true);
    }
  };

  const handleLoadMore = () => {
    console.log('LOAD MORE DATA');
    console.log(page, totalPage);
    // console.log(last);
    if (!loadMore) {
      const newPage = page + 1;
      setLoadMore(true);
      if (newPage <= totalPage) {
        setLoading(true);
        setPage(newPage);
      } else {
        setLoading(false);
      }
    }
    // if (page === totalPage) {
    //   setLast(true);
    // }
  };

  const handleSortMonth = dataMonth => {
    if (month === dataMonth) {
      setMonth('');
    } else {
      setMonth(dataMonth);
      setKeyword('');
      setSort('createdAt DESC');
      setPage(1);
      setLast(false);
      setTotalPage(10);
      // console.log(data);
    }
  };

  const handleSort = dataSort => {
    setSort(dataSort);
    setPage(1);
    // console.log(data);
  };

  const handleSearch = e => {
    setKeyword(e.nativeEvent.text);
    setPage(1);
    setMonth('');
  };

  console.log(last);

  const ListHeader = () => {
    return (
      <>
        <Text style={{padding: 10, fontSize: 18}}>List Movie</Text>
        <View style={style.listMovie}>
          <Select
            bgColor="white"
            selectedValue={sort}
            accessibilityLabel="Sort"
            width={100}
            placeholder="Sorting"
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size={5} />,
            }}
            onValueChange={itemValue => handleSort(itemValue)}>
            <Select.Item label="A to Z" value="name ASC" />
            <Select.Item label="Z to A" value="name DESC" />
            <Select.Item label="Newest" value="createdAt DESC" />
          </Select>
          {/* <Input placeholder="Input Search..." size="xs" /> */}
          <Input
            placeholder="Search"
            w="50%"
            size="sm"
            bgColor="white"
            onSubmitEditing={e => {
              handleSearch(e); // called only when multiline is false
            }}
          />
        </View>
        <ScrollView horizontal={true}>
          {monthFilter.map(item => (
            <TouchableOpacity
              style={
                item.value === month ? style.btnMonthActive : style.btnMonth
              }
              onPress={() => handleSortMonth(item.value)}
              key={item.value}>
              <Text
                style={
                  item.value === month ? {color: 'white'} : {color: 'blue'}
                }>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </>
    );
  };

  const ListFooter = () => {
    return (
      <>
        {/* {loading ? <ActivityIndicator size="large" color="blue" /> : null} */}
        {last ? (
          <View>
            <Center marginY="6">
              <Text>-- No more data --</Text>
            </Center>
            <Footer {...props} />
          </View>
        ) : loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <Center>
            <Button onPress={handleLoadMore}>loadMore</Button>
          </Center>
        )}
      </>
    );
  };

  // console.log(refresh);

  return (
    // <ScrollView>
    <View style={{paddingBottom: 30}}>
      <FlatList
        data={data}
        numColumns="2"
        ListHeaderComponent={ListHeader}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={style.containerPoster}>
            <CardPoster {...props} data={item} />
          </View>
        )}
        onRefresh={handleRefresh}
        refreshing={refresh}
        // onEndReached={handleLoadMore}
        // onEndReachedThreshold={0.3}
        ListFooterComponent={ListFooter}
      />
    </View>

    // </ScrollView>
  );
}
