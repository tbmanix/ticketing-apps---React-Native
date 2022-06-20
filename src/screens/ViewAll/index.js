import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
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
  // const poster = [
  //   {
  //     img: '../../assets/img/poster.png',
  //     name: 'Spiderman',
  //     genre: 'Sci Fi, Action, Drama',
  //   },
  //   {
  //     img: '../../assets/img/poster.png',
  //     name: 'One Piece',
  //     genre: 'Sci Fi, Action, Drama',
  //   },
  //   {
  //     img: '../../assets/img/poster.png',
  //     name: 'Bleach',
  //     genre: 'Sci Fi, Action, Drama',
  //   },
  //   {
  //     img: '../../assets/img/poster.png',
  //     name: 'Dragon Ball',
  //     genre: 'Sci Fi, Action, Drama',
  //   },
  //   ,
  // ];
  // const page = [1, 2, 3, 4, 5];
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'Desember',
  ];
  let [service, setService] = React.useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [last, setLast] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    getDataMovie();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getDataMovie();
    }, 2000);
  }, [page]);

  const getDataMovie = async () => {
    try {
      setRefresh(false);
      setLoading(false);
      setLoadMore(false);
      if (page <= totalPage) {
        const result = await axios.get(`movie?page=${page}&limit=5`);
        if (page === 1) {
          setData(result.data.data);
        } else {
          setData([...data, ...result.data.data]);
        }
        setTotalPage(result.data.pagination.totalPage);
      } else {
        setLast(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(data);

  const handleRefresh = () => {
    console.log('REFRESH SCREEN');
    setPage(1);
    setLast(false);
    if (page !== 1) {
      setRefresh(true);
    } else {
      getDataMovie();
    }
  };

  const handleLoadMore = () => {
    console.log('LOAD MORE DATA');
    if (!loadMore) {
      const newPage = page + 1;
      setLoadMore(true);
      if (newPage <= totalPage + 1) {
        setLoading(true);
        setPage(newPage);
      } else {
        setLoading(false);
      }
    }
  };

  const ListHeader = () => {
    return (
      <>
        <Text style={{padding: 10, fontSize: 18}}>List Movie</Text>
        <View style={style.listMovie}>
          <Select
            bgColor="white"
            selectedValue={service}
            accessibilityLabel="Sort"
            width={100}
            placeholder="Sort"
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size={5} />,
            }}
            onValueChange={itemValue => setService(itemValue)}>
            <Select.Item label="A to Z" value="A" />
            <Select.Item label="Z to A" value="B" />
            <Select.Item label="Newest" value="C" />
          </Select>
          {/* <Input placeholder="Input Search..." size="xs" /> */}
          <Input placeholder="Search" w="50%" size="sm" bgColor="white" />
        </View>
        <ScrollView horizontal={true}>
          {month.map(item => (
            <TouchableOpacity style={style.btnMonth} key={item}>
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </>
    );
  };

  // console.log(refresh);
  console.log(page);
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
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() =>
          last ? (
            <View>
              <Center>
                <Text>-- No more data --</Text>
              </Center>
              <Footer {...props} />
            </View>
          ) : loading ? (
            <ActivityIndicator size="large" color="blue" />
          ) : null
        }
      />
    </View>

    // </ScrollView>
  );
}
