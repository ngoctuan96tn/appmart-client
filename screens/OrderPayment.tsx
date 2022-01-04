
import * as React from 'react';
import { Dimensions, StatusBar, TouchableOpacity, Animated, Pressable, ActivityIndicator, AsyncStorage } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { NativeBaseProvider, Box, View, Link, TextArea, Radio, Image, Button, Text, FlatList } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import { TabOneParamList } from '../types';
import { Entypo, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import NumberFormat from 'react-number-format';
import ApiCommon from '../constants/ApiCommon';
import Toast from 'react-native-root-toast';
import CartProvider from '../components/CartProvider';

const initialLayout = { width: Dimensions.get('window').width };
var note = '';

export function OrderPayment() {
  const navigation = useNavigation();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Địa chỉ', icon: 'location' },
    { key: 'second', title: 'Thanh toán', icon: 'credit' },
    { key: 'third', title: 'Đặt hàng', icon: 'check' },
  ]);
  const renderScene = SceneMap({
    first: () => PaymentTabFirst(),
    second: () => PaymentTabSecond(),
    third: () => PaymentTabThird(),
  });

  const [token, setToken] = React.useState<string | null>('');
  const [userLogin, setUserLogin] = React.useState<any>({});
  const { getItem, setItem } = useAsyncStorage('token');
  const [retrieve, setRetrieve] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [dataCart, setDataCart] = React.useState<any>({});
  const [totalAmount, setTotalAmount] = React.useState<any>({});
  const [isDisabled, setIsDisabled] = React.useState(false);
  // const [note, setNote] = React.useState('');

  React.useEffect(() => {
    const readToken = async () => {
      const item = await getItem();
      setToken(item);
      setRetrieve(false);
    };

    const getCart = () => {
      AsyncStorage.getItem('cart').then((cart) => {
        if (cart !== null) {
          // We have data!!
          const cartfood = JSON.parse(cart)
          setDataCart(cartfood)

          //tính tổng tiền giỏ hàng
          let sum = 0;
          cartfood?.forEach(
            (item: { quantity: number; product: { price: number; }; }) =>
              (sum += item.quantity * item.product.price));
          setTotalAmount(sum)
        } else {
          console.log('1')
        }
      })
        .catch((err) => {
          console.log(err)
        })

    }

    if (retrieve) {
      readToken();
      getCart();
    }
    if (retrieve === false) {
      const headers = { 'Authorization': `Bearer ${token}` }
      fetch(ApiCommon.rootUrl + '/api/user/login', { headers })
        .then((response) => response.json())
        .then((json) => setUserLogin(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }

  }, [retrieve]);

  // tab địa chỉ
  const PaymentTabFirst = () => {
    if (!loading) {
      return (
        <Box flex={1} bg="#f5f5f5">
          <View p={4} m={4} height={120} bg="#fff" borderRadius={5} marginTop={4}>
            <Text style={{ fontWeight: 'bold', bottom: 2 }}>Địa chỉ nhận hàng</Text>
            <Text style={{ fontWeight: 'bold' }}>{userLogin.userName}</Text>
            <Text>{userLogin.roomName} - {userLogin.floorName} - {userLogin.buildingName}</Text>
            <Text>{userLogin.phone}</Text>
          </View>
          <View p={2} m={4} height={120} bg="#fff" marginTop="5%" borderRadius={5}>
            <TextArea h='100%' placeholder="Lưu ý (ví dụ: Địa chỉ nhận hàng khác)" onChangeText={(data) => { note =data }} />

          </View>
          <View style={{ flexDirection: 'row' }} p={2} m={4} height={35} bg="#fff" marginTop="5%" borderRadius={5}>
            <Text style={{ width: '50%' }}>Phí vận chuyển</Text>
            <Text style={{ width: '50%', textAlign: 'right', color: '#00bfff', fontWeight: 'bold' }}>Theo nhà cung cấp</Text>
          </View>

          <View paddingLeft={4} paddingRight={4} paddingTop={2} style={{ position: 'absolute', bottom: 1, backgroundColor: '#f8f8ff', flexDirection: "row", flexWrap: "wrap", width: '100%', height: 100 }}>
            <Text style={{ width: '50%' }}>Tổng tiền thanh toán</Text>
            <NumberFormat
              value={totalAmount}
              displayType={'text'}
              thousandSeparator={true}
              suffix={'đ'}
              renderText={formattedValue => <Text style={{ width: '50%', textAlign: 'right', color: '#ff0000', fontWeight: 'bold' }}>{formattedValue}</Text>} // <--- Don't forget this!
            />
            <Button onPress={() => setIndex(1)} width="100%" marginTop="5%">Xác nhận</Button>
          </View>
        </Box>
      );
    } else {
      return (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
  }
  // tab địa chỉ

  // tab phương thức thanh toán
  const PaymentTabSecond = () => {
    if (!loading) {
      return (
        <Box flex={1} bg="#f5f5f5">
          <View p={4} height={200} bg="#fff" borderRadius={5} marginTop={4}>
            <Text style={{ fontWeight: 'bold', bottom: 2 }}>Phương thức thanh toán</Text>
            <Radio.Group
              name="paymentMethodRadio"
              value="1"
              onChange={(nextValue) => {
                console.log(nextValue)
              }}
            >
              <Radio value="1" my={1}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ width: '50%', marginLeft: 5 }}>Thanh toán khi nhận hàng</Text>
                  <Text style={{ width: '50%', textAlign: 'center', }}><MaterialCommunityIcons name="cash-multiple" color="#00bfff" size={20} /></Text>
                </View>
              </Radio>
              <Radio value="2" my={1} isDisabled={true}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ width: '50%', marginLeft: 5 }}>Thẻ tín dụng/Ghi nợ</Text>
                  <Text style={{ width: '50%', textAlign: 'center', color: '#00bfff', fontWeight: 'bold' }}><FontAwesome name="cc-visa" color="#00bfff" size={20} /></Text>
                </View>
              </Radio>
              <Radio value="3" my={1} isDisabled={true}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ width: '50%', marginLeft: 5 }}>Ví điện tử</Text>
                  <Text style={{ width: '50%', textAlign: 'center', color: '#00bfff', fontWeight: 'bold' }}><Entypo name="wallet" color="#00bfff" size={20} /></Text>
                </View>
              </Radio>
            </Radio.Group>
          </View>
          <View paddingLeft={4} paddingRight={4} paddingTop={2} style={{ position: 'absolute', bottom: 1, backgroundColor: '#f8f8ff', flexDirection: "row", flexWrap: "wrap", width: '100%', height: 100 }}>
            <Text style={{ width: '50%' }}>Tổng tiền thanh toán</Text>
            <NumberFormat
              value={totalAmount}
              displayType={'text'}
              thousandSeparator={true}
              suffix={'đ'}
              renderText={formattedValue => <Text style={{ width: '50%', textAlign: 'right', color: '#ff0000', fontWeight: 'bold' }}>{formattedValue}</Text>} // <--- Don't forget this!
            />
            <Button onPress={() => setIndex(2)} width="100%" marginTop="5%">Xác nhận</Button>
          </View>
        </Box>
      );
    } else {
      return (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
  }
  // tab phương thức thanh toán

  //tab đặt hàng
  const PaymentTabThird = () => {
    if (!loading) {
      return (
        <Box flex={1} bg="#f5f5f5">
          <ScrollView>
            <View p={4} height={120} bg="#fff" borderRadius={5} marginTop={4}>
              <Text style={{ fontWeight: 'bold', bottom: 2 }}>Địa chỉ nhận hàng</Text>
              <Text style={{ fontWeight: 'bold' }}>{userLogin.userName}</Text>
              <Text>{userLogin.roomName} - {userLogin.floorName} - {userLogin.buildingName}</Text>
              <Text>{userLogin.phone}</Text>
            </View>

            <View p={4} height={120} bg="#fff" borderRadius={5}>
              <Text style={{ fontWeight: 'bold', bottom: 2 }}>Phương thức thanh toán</Text>
              <Text>Thanh toán khi nhận hàng</Text>
            </View>

            <View p={4} bg="#fff" borderRadius={5} width="100%">
              <Text style={{ fontWeight: 'bold', bottom: 2 }}>Sản phẩm</Text>

              <FlatList
                data={dataCart}
                renderItem={({ item }) => (
                  <View style={{
                    flexDirection: "row", height: 100, marginTop: '2%', shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                  }}>
                    <View width="30%" height="100%">
                      {/* <Image source={{ uri: `data:image/jpeg;base64,${item.product.image}` }} alt="image base" resizeMode="cover" height='100%' /> */}
                    </View>
                    <View width="55%" left="10%" height="100%">
                      <Text>{item.product.name}</Text>
                      <Text>{item.quantity}</Text>
                      <Text><NumberFormat
                        value={item.product.price * item.quantity}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={'đ'}
                        renderText={formattedValue => <Text style={{ fontWeight: 'bold', color: "#33c37d", fontSize: 20 }}>{formattedValue}</Text>} // <--- Don't forget this!
                      /></Text>
                      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        <Image source={require('../assets/images/MiMartLogoGradientApp.png')} alt="image base" resizeMode="cover" width={6} height={6} />
                        <Text style={{ marginLeft: '3%', marginTop: '3%' }} width='45%'>MiMart</Text>
                      </View>
                    </View>
                  </View>
                )}
                keyExtractor={(item) => item.id}
              />

            </View>
            <View style={{ height: 100 }}></View>
          </ScrollView>



          <View paddingLeft={4} paddingRight={4} paddingTop={2} style={{ position: 'absolute', bottom: 1, backgroundColor: '#f8f8ff', flexDirection: "row", flexWrap: "wrap", width: '100%', height: 100 }}>
            <Text style={{ width: '50%' }}>Tổng tiền thanh toán</Text>
            <NumberFormat
              value={totalAmount}
              displayType={'text'}
              thousandSeparator={true}
              suffix={'đ'}
              renderText={formattedValue => <Text style={{ width: '50%', textAlign: 'right', color: '#ff0000', fontWeight: 'bold' }}>{formattedValue}</Text>} // <--- Don't forget this!
            />
            <Button isDisabled={isDisabled} onPress={() => {
              setIsDisabled(true);
              handlePayment(note, dataCart, userLogin, token, navigation);
              setIsDisabled(false);
              note ='';
              }} width="100%" marginTop="5%">ĐẶT HÀNG</Button>
          </View>
        </Box>
      );
    } else {
      return (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
  }
  //tab đặt hàng

  const renderTabBar = (props: any) => {
    const inputRange = props.navigationState.routes.map((x: any, i: number) => i);
    return (
      <View>
        <Box flexDirection="row">
          {props.navigationState.routes.map((route: any, i: number) => {
            const opacity = props.position.interpolate({
              inputRange,
              outputRange: inputRange.map((inputIndex: any) =>
                inputIndex === i ? 1 : 0.2
              ),
            });

            return (
              <Box
                flex={1}
                alignItems='center'
              >
                <View alignItems='center'>
                  <Entypo name={route.icon} size={20} style={{ borderWidth: 1, borderRadius: 50, width: 50, height: 50, textAlign: 'center', paddingTop: 15 }} />
                  <Pressable>
                    <Animated.Text style={{ opacity, fontWeight: 'bold' }}>{route.title}</Animated.Text>
                  </Pressable>
                </View>
              </Box>

            );
          })}
        </Box>

        <Link
          _text={{
            color: "red.500",
            fontWeight: 'bold'
          }}
          onPress={() => { navigation.navigate('Cart') }}
          isExternal
          mt={4}
          paddingBottom={1}
          alignItems='center'
        >
          Quay lại giỏ hàng
        </Link>
      </View>
    );
  };

  return (
    <NativeBaseProvider>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={{ marginTop: StatusBar.currentHeight }}
        swipeEnabled={false}
      />
    </NativeBaseProvider>
  );
}


export default (data: any) => {
  return (
    <NativeBaseProvider>
      <TabOneNavigator data={data} />
    </NativeBaseProvider>
  )
}

const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator(data: any) {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={OrderPayment}
        options={{ headerTitle: "ĐẶT HÀNG", headerTitleAlign: 'center', headerLeft: null, gestureEnabled: false }}
        initialParams={data}
      />
    </TabOneStack.Navigator>
  );
}


// xử lý thanh toán đặt hàng
function handlePayment(note: any, dataCart: any, userLogin: any, token: any, navigation: any) {
  const productArr: IProductBill[] = [];
  dataCart.forEach(function (data: any) {
    const productBill: IProductBill = {
      productId: data.product.id,
      quantity: data.quantity,
      price: data.product.price,
      amount: data.product.price * data.quantity,

    };
    productArr.push(productBill);
  });

  const bill: IBilling = {
    userId: userLogin.id,
    buildingId: 1,
    note: note,
    productList: productArr,
  };
  console.log(bill);

  fetch(ApiCommon.rootUrl + '/api/order-payment', {
    method: 'post',
    body: JSON.stringify(bill),
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((responseJson) => {
      const orderCode = responseJson.listData[0].orderCode;
      console.log(orderCode);
      if (responseJson.code == 1) {
        CartProvider.clearCart();
        // AsyncStorage.clear();
        Toast.show('Đặt hàng thành công!', {
          duration: Toast.durations.LONG,
          position: 0,
          shadow: true,
          animation: true,
          hideOnPress: true,
          backgroundColor: '#ffffff',
          textColor: '#000000',

        });
        navigation.navigate('OrderPaymentSuccess', { orderCode: orderCode });
      } else {
        Toast.show(responseJson.message, {
          duration: Toast.durations.LONG,
          position: 0,
          shadow: true,
          animation: true,
          hideOnPress: true,
          backgroundColor: '#ffffff',
          textColor: '#ff0000',

        });
      }
    })
    .catch((error) => {
      console.log(error)
    });
}


export interface IBilling {
  userId: number;
  buildingId: number;
  note: string;
  productList: IProductBill[]
}

export interface IProductBill {
  productId: number;
  quantity: number,
  price: number,
  amount: number;
}
// xử lý thanh toán đặt hàng