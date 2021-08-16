import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, NativeBaseProvider } from 'native-base';
import React, { Component } from 'react';
import { Text, View, ScrollView, TextInput, Image, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, Alert } from 'react-native';
var { width } = Dimensions.get("window")
import { useNavigation } from '@react-navigation/native';

// import icons
import Icon from 'react-native-vector-icons/Ionicons';
import CartProvider, { IProduct } from '../components/CartProvider';
import { TabOneParamList } from '../types';
import NumberFormat from 'react-number-format';

export class Cart extends Component<{}, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      dataCart: [],
      totalAmount: 0,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('cart').then((cart) => {
      if (cart !== null) {
        // We have data!!
        const cartfood = JSON.parse(cart)
        this.setState({ dataCart: cartfood })

        //tính tổng tiền giỏ hàng
        let sum = 0;
        cartfood?.forEach(
          (item: { quantity: number; product: { price: number; }; }) =>
            (sum += item.quantity * item.product.price));
        this.setState({ totalAmount: sum })
      } else {
        console.log('1')
      }
    })
      .catch((err) => {
        alert(err)
      })

  }

  async addQuantity(product: IProduct) {
    const inlineItems = CartProvider.getItemFromStorage();
    CartProvider.addToCart(product, await inlineItems);
    this.componentDidMount();
  }

  async removeQuantity(product: IProduct) {
    const inlineItems = CartProvider.getItemFromStorage();
    CartProvider.minusToCart(product, await inlineItems);
    this.componentDidMount();
  }

  async removeProduct(product: IProduct) {
    Alert.alert(
      "Xóa sản phẩm",
      `Bạn có chắc chắn xóa ${product.name} khỏi giỏ hàng?`,
      [
        // The "Yes" button
        {
          text: "Có",
          onPress: async () => {
            const inlineItems = CartProvider.getItemFromStorage();
            CartProvider.removeFromCart(product, await inlineItems);
            this.componentDidMount();
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "Không",
        },
      ]
    );

  }

  render() {
    const { navigation } = this.props;
    if (this.state.dataCart.length > 0) {
      return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ flex: 1 }}>
            <ScrollView>
              {
                this.state.dataCart.map((item: any, i: number) => {
                  return (
                    <View style={{ width: width - 20, margin: 10, backgroundColor: 'transparent', flexDirection: 'row', borderBottomWidth: 2, borderColor: "#cccccc", paddingBottom: 10 }}>
                      <Image resizeMode={"contain"} style={{ width: width / 3, height: width / 3 }} source={{ uri: `data:image/jpeg;base64,${item.product.image}` }} />
                      <View style={{ flex: 1, backgroundColor: 'trangraysparent', padding: 10, justifyContent: "space-between" }}>
                        <View>
                          <Text style={{ fontWeight: "bold", fontSize: 20 }}>{item.product.name}</Text>
                          {/* <Text>{item.product.name}</Text> */}
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <NumberFormat
                            value={item.product.price * item.quantity}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'đ'}
                            renderText={formattedValue => <Text style={{ fontWeight: 'bold', color: "#33c37d", fontSize: 20 }}>{formattedValue}</Text>} // <--- Don't forget this!
                          />
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => this.removeQuantity(item.product)}>
                              <Icon name="ios-remove-circle" size={35} color={"#33c37d"} />
                            </TouchableOpacity>
                            <Text style={{ paddingHorizontal: 8, fontWeight: 'bold', fontSize: 18 }}>{item.quantity}</Text>
                            <TouchableOpacity onPress={() => this.addQuantity(item.product)}>
                              <Icon name="ios-add-circle" size={35} color={"#33c37d"} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                      <View>
                        <MaterialCommunityIcons name="delete" size={25} onPress={() => this.removeProduct(item.product)} />
                      </View>
                    </View>
                  )
                })
              }

              <View style={{ height: 20 }} />


              <View style={{ height: 20 }} />
            </ScrollView>

            <View style={{ flex: 1 }}>
              <View style={{ position: 'absolute', bottom: 60, backgroundColor: '#f8f8ff', flexDirection: "row", flexWrap: "wrap", width: '100%', height: 30 }}>
                <Text style={{ width: '60%', marginLeft: 10, fontSize: 18, fontWeight: 'bold' }}>Tổng tiền</Text>
                <NumberFormat
                  value={this.state.totalAmount}
                  displayType={'text'}
                  thousandSeparator={true}
                  suffix={'đ'}
                  renderText={formattedValue => <Text style={{ width: '35%', textAlign: 'right', fontSize: 18, fontWeight: 'bold', color: 'red' }}>{formattedValue}</Text>} // <--- Don't forget this!
                />

              </View>
              <View style={{ position: 'absolute', bottom: 0, backgroundColor: '#f8f8ff', flexDirection: "row", flexWrap: "wrap", justifyContent: 'center', width: '100%', height: 60 }}>
                <Button borderColor='#f8f8ff' borderRadius={0} size="sm" variant="outline" onPress={() => navigation.navigate('Main')} width='59%'>
                  Tiếp tục mua hàng
                </Button>
                <View style={{ height: '100%', width: 1, backgroundColor: '#909090', }}></View>
                <Button borderColor='#f8f8ff' borderRadius={0} size="sm" onPress={() => navigation.reset({ index: 0, routes: [{ name: 'OrderPayment', params: { index: 0} }], })} width='40%'>
                  Thanh toán
                </Button>
              </View>
            </View>

          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image resizeMode={"contain"} style={{ width: width / 2, height: width / 2 }} source={require('../assets/images/cart-empty.png')} />
          <Text style={{ marginBottom: 5, color: '#FF69B4' }}>Giỏ hàng trống!</Text>
          <Button
            size="sm"
            variant="solid"
            colorScheme="secondary"
            onPress={() => navigation.navigate('Main')}
          >
            Hãy mua sắm ngay
          </Button>
        </SafeAreaView>
      )
    }
  }
}

export default () => {
  return (
    <NativeBaseProvider>
      <TabOneNavigator />
    </NativeBaseProvider>
  )
}

const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={Cart}
        options={{ headerTitle: "DANH SÁCH GIỎ HÀNG", headerLeft: null, gestureEnabled: false }}
      />
    </TabOneStack.Navigator>
  );
}