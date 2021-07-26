import { Button, Input, NativeBaseProvider, Radio, VStack, Text, Box, FlatList, ScrollView } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, Image, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import { View } from '../components/Themed';
import Animated from 'react-native-reanimated';
import ProductList from '../components/ProductList';
import CategoryList from '../components/CategoryList';
import { StoreList } from '../components/StoreList';
import ProductSuggestList from '../components/ProductSuggestList';
import ApiCommon from '../constants/ApiCommon';
import Icon from 'react-native-vector-icons/FontAwesome'
import { red } from '@material-ui/core/colors';
const { width } = Dimensions.get('window')


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  wrapper: {
    height: 200,
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },

  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },

  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },

  image: {
    width,
    flex: 1
  },

});


export default function ShopScreen() {
  const [data, setData] = useState([]);

  const [dataProduct, setDataproduct] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      fetch(ApiCommon.rootUrl + '/api/categories')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));

      fetch(ApiCommon.rootUrl + '/api/products/popular')
        .then((response) => response.json())
        .then((json) => setDataproduct(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  });

  if (!isLoading) {
    return (
      <View style={styles.container}>
        <NativeBaseProvider>
          <Animated.View>
            <SearchBar />
          </Animated.View>
          <ScrollView
            height={400}
          >

            {/* slideshow */}
            <Swiper
              style={styles.wrapper}
              // onMomentumScrollEnd={(e, state, context) =>
              //   console.log('index:', state.index)
              // }
              dot={
                <View
                  style={{
                    backgroundColor: 'rgba(0,0,0,.2)',
                    width: 5,
                    height: 5,
                    borderRadius: 4,
                    marginLeft: 3,
                  }}
                />
              }
              activeDot={
                <View
                  style={{
                    backgroundColor: '#f7a70a',
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginLeft: 3,
                  }}
                />
              }
              loop
              autoplay={true}
              autoplayTimeout={2.5}
            >
              <View
                style={styles.slide}
              >
                <Image
                  resizeMode="stretch"
                  style={styles.image}
                  source={require('../assets/images/slideshow1.jpg')}
                />
              </View>
              <View
                style={styles.slide}
              >
                <Image
                  resizeMode="stretch"
                  style={styles.image}
                  source={require('../assets/images/slideshow2.jpg')}
                />
              </View>
              <View
                style={styles.slide}
              >
                <Image
                  resizeMode="stretch"
                  style={styles.image}
                  source={require('../assets/images/slideshow3.jpg')}
                />
              </View>

            </Swiper>
            {/* end slide show */}

            <NativeBaseProvider>
              <View style={{ marginTop: 5 }}>
                <ProductList data={dataProduct} />
              </View>
              <View style={{ marginTop: 10 }}>
                <CategoryList data={data} />
              </View>
              <View style={{ marginTop: 10 }}>
                <StoreList />
              </View>
              <View style={{ marginTop: 15 }}>
                <ProductSuggestList data={dataProduct} />
              </View>
            </NativeBaseProvider>
          </ScrollView>
        </NativeBaseProvider>

      </View>
    );
  } else {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
}

function SearchBar() {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Input
        placeholder="  Tìm kiếm  "
        variant="filled"
        bg="white"
        py={1}
        px={2}
        width="85%"
      />

      <Button
        style={{ alignSelf: 'flex-end' }}
        size="sm"
        variant="link"
        onPress={() => console.log("hello world")}
      >
        <Icon name="shopping-cart" size={25} color='#ffa500' />
      </Button>
    </View>

  )
}
