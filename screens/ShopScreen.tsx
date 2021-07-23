import { Button, Input, NativeBaseProvider, Radio, VStack, Icon, Text, Box, FlatList, ScrollView } from 'native-base';
import * as React from 'react';
import { StyleSheet, Dimensions, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { View } from '../components/Themed';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import ProductCard from '../components/ProductCard';
import ProductList from '../components/ProductList';
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
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
  const data = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d73",
      title: "Four Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d74",
      title: "Five Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d75",
      title: "Six Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d76",
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d77",
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d78",
      title: "Third Item",
    },
  ]

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


          <View style={styles.separator} />
          <NativeBaseProvider>
            <ProductList />
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <Box px={5} py={2} rounded="md" my={2} bg="primary.300">
                  {item.title}
                </Box>
              )}
              keyExtractor={(item) => item.id}
            />
          </NativeBaseProvider>
        </ScrollView>
      </NativeBaseProvider>

    </View>
  );
}

function SearchBar() {
  return (
    <Input
      placeholder="  Tìm kiếm  "
      variant="filled"
      width="100%"
      bg="white"
      borderRadius={10}
      py={1}
      px={2}
    />

  )
}

