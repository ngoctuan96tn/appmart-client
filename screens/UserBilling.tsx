import * as React from 'react';
import { Dimensions, StatusBar, TouchableOpacity, Animated, Pressable, ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Alert } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { NativeBaseProvider, Box, View, Text, Image, Button } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import { TabOneParamList } from '../types';
import { useNavigation } from '@react-navigation/native';
import UserBillingFirst from '../components/UserBillingFirst';
import UserBillingSecond from '../components/UserBillingSecond';
import UserBillingThird from '../components/UserBillingThird';
import UserBillingFourth from '../components/UserBillingFourth';
import ApiCommon from '../constants/ApiCommon';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import Toast from 'react-native-root-toast';

const initialLayout = { width: Dimensions.get('window').width };



export function UserBilling() {
  const renderScene = SceneMap({
    first: () => userBillingTabFirst(),
    second: () => userBillingTabSecond(),
    third: () => userBillingTabThird(),
    four: () => userBillingTabFour(),
  });

  const [token, setToken] = React.useState<string | null>('');
  const [userLogin, setUserLogin] = React.useState<any>({});
  const { getItem, setItem } = useAsyncStorage('token');
  const [retrieve, setRetrieve] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [dataProductTab1, setDataproductTab1] = React.useState<any>([]);
  const [dataProductTab2, setDataproductTab2] = React.useState<any>([]);
  const [dataProductTab3, setDataproductTab3] = React.useState<any>([]);
  const [dataProductTab4, setDataproductTab4] = React.useState<any>([]);

  React.useEffect(() => {
    const readToken = async () => {
      const item = await getItem();
      setToken(item);
      setRetrieve(false);
    };

    if (retrieve) {
      readToken();
    }
    if (retrieve === false) {
      const headers = { 'Authorization': `Bearer ${token}` }
      fetch(ApiCommon.rootUrl + '/api/user/login', { headers })
        .then((response) => response.json())
        .then((json) => setUserLogin(json))
        .catch((error) => console.error(error))

      fetch(ApiCommon.rootUrl + `/api/new-order/${userLogin.id}`, { headers })
        .then((response) => response.json())
        .then((json) => setDataproductTab1(json))
        .catch((error) => console.error(error))

      fetch(ApiCommon.rootUrl + `/api/processing-order/${userLogin.id}`, { headers })
        .then((response) => response.json())
        .then((json) => setDataproductTab2(json))
        .catch((error) => console.error(error))

      fetch(ApiCommon.rootUrl + `/api/done-order/${userLogin.id}`, { headers })
        .then((response) => response.json())
        .then((json) => setDataproductTab3(json))
        .catch((error) => console.error(error))

      fetch(ApiCommon.rootUrl + `/api/cancel-order/${userLogin.id}`, { headers })
        .then((response) => response.json())
        .then((json) => setDataproductTab4(json))
        .catch((error) => console.error(error))

      
      setLoading(false);
    }

  }, [retrieve, userLogin]);


  // tab 1
  const userBillingTabFirst = () => {
    if (!loading) {
      return (
        <Box bg="#f5f5f5" >
          <FlatList
            data={dataProductTab1.listData}
            ListHeaderComponent={() => (!(dataProductTab1.listData !== undefined && dataProductTab1.listData.length > 0) ?
              <SafeAreaView style={{ alignItems: 'center', justifyContent: 'center', marginTop: '50%' }}>
                <MaterialCommunityIcons name='cart-arrow-down' size={80} color='#ffa500' />
                <Text marginTop={2}>Hiện chưa có đơn hàng!</Text>
              </SafeAreaView>
              : null)}
            renderItem={({ item }) => (
              <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: '2%', backgroundColor: '#fff', paddingLeft: '2%', paddingTop: '5%', paddingBottom: '5%' }}>
                <View style={{ width: '70%' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 14 }} >Đơn hàng số #{item.orderCode}</Text>
                  <Text style={{ fontWeight: '400', fontSize: 12 }} >Đặt ngày: {moment(item.createdDate).format("DD-MM-YYYY hh:mm")}</Text>
                </View>
                <View style={{ width: '27%' }}>
                  <Text style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 14 }} >Tổng tiền</Text>
                  <NumberFormat
                    value={item.totalAmount}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={'đ'}
                    renderText={formattedValue => <Text style={{ textAlign: 'right', fontWeight: '400', color: 'red', fontSize: 12 }}>{formattedValue}</Text>} // <--- Don't forget this!
                  />

                </View>
                <View style={styles.line} />
                <View style={{ width: '99%' }}>
                  <FlatList
                    data={item.productList}
                    renderItem={({ item }) => (
                      <View style={{
                        flexDirection: "row", height: 100, marginTop: '2%'
                      }}>
                        <View width="25%" height="100%">
                          <Image source={{ uri: `data:image/jpeg;base64,${item.productImageBase64}` }} alt="image base" resizeMode="cover" height='100%' />
                        </View>
                        <View width="60%" left="10%" height="100%">
                          <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{item.productName}</Text>
                          <Text style={{ fontWeight: '400', fontSize: 12 }}>Số lượng: {item.quantity}</Text>
                          <Text><NumberFormat
                            value={item.amount}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'đ'}
                            renderText={formattedValue => <Text style={{ fontWeight: 'bold', color: "red", fontSize: 12 }}>{formattedValue}</Text>} // <--- Don't forget this!
                          /></Text>
                          <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: '13%' }}>
                            <Image source={require('../assets/images/MiMartLogoGradientApp.png')} alt="image base" resizeMode="cover" width={6} height={6} />
                            <Text style={{ marginLeft: '3%', marginTop: '3%', fontWeight: 'bold', fontSize: 12 }} width='45%'>MiMart</Text>
                          </View>
                        </View>
                      </View>
                    )}
                    keyExtractor={(item) => item.productId}
                  />
                </View>

                <View style={{ width: '97%', alignItems: 'flex-end' }}>
                  <Button
                    size="xs"
                    colorScheme="danger"
                    bottom={1}
                    _text={{
                      color: "white",
                    }}
                    onPress={() => handleCancel(item.billId, userLogin.id, item.orderCode)}
                  >
                    Hủy đơn
                  </Button>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.billId.toString()}
          />
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
  // tab 1

  // tab 2
  const userBillingTabSecond = () => {
    if (!loading) {
      return (
        <Box bg="#f5f5f5">
          <FlatList
            data={dataProductTab2.listData}
            ListHeaderComponent={() => (!(dataProductTab2.listData !== undefined && dataProductTab2.listData.length > 0) ?
              <SafeAreaView style={{ alignItems: 'center', justifyContent: 'center', marginTop: '50%' }}>
                <MaterialCommunityIcons name='cart-arrow-down' size={80} color='#ffa500' />
                <Text marginTop={2}>Hiện chưa có đơn hàng!</Text>
              </SafeAreaView>
              : null)}
            renderItem={({ item }) => (
              <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: '2%', backgroundColor: '#fff', paddingLeft: '2%', paddingTop: '5%', paddingBottom: '5%' }}>
                <View style={{ width: '70%' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Đơn hàng số #{item.orderCode}</Text>
                  <Text style={{ fontWeight: '400', fontSize: 12 }}>Đặt ngày: {moment(item.createdDate).format("DD-MM-YYYY hh:mm")}</Text>
                </View>
                <View style={{ width: '27%' }}>
                  <Text style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 14 }} >Tổng tiền</Text>
                  <NumberFormat
                    value={item.totalAmount}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={'đ'}
                    renderText={formattedValue => <Text style={{ textAlign: 'right', fontWeight: '400', color: 'red', fontSize: 12 }}>{formattedValue}</Text>} // <--- Don't forget this!
                  />

                </View>
                <View style={styles.line} />
                <View style={{ width: '99%' }}>
                  <FlatList
                    data={item.productList}
                    renderItem={({ item }) => (
                      <View style={{
                        flexDirection: "row", height: 100, marginTop: '2%',
                      }}>
                        <View width="25%" height="100%">
                          <Image source={{ uri: `data:image/jpeg;base64,${item.productImageBase64}` }} alt="image base" resizeMode="cover" height='100%' />
                        </View>
                        <View width="60%" left="10%" height="100%">
                          <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{item.productName}</Text>
                          <Text style={{ fontWeight: '400', fontSize: 12 }}>Số lượng: {item.quantity}</Text>
                          <Text><NumberFormat
                            value={item.amount}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'đ'}
                            renderText={formattedValue => <Text style={{ fontWeight: 'bold', color: "red", fontSize: 12 }}>{formattedValue}</Text>} // <--- Don't forget this!
                          /></Text>
                          <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: '12%' }}>
                            <Image source={require('../assets/images/MiMartLogoGradientApp.png')} alt="image base" resizeMode="cover" width={6} height={6} />
                            <Text style={{ marginLeft: '3%', marginTop: '3%', fontWeight: 'bold', fontSize: 12 }} width='45%'>MiMart</Text>
                          </View>
                        </View>
                      </View>
                    )}
                    keyExtractor={(item) => item.productId}
                  />
                </View>

              </View>
            )}
            keyExtractor={(item) => item.billId.toString()}
          />
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
  // tab 2

  // tab 3
  const userBillingTabThird = () => {
    if (!loading) {
      return (
        <Box bg="#f5f5f5">
          <FlatList
            data={dataProductTab3.listData}
            ListHeaderComponent={() => (!(dataProductTab3.listData !== undefined && dataProductTab3.listData.length > 0) ?
              <SafeAreaView style={{ alignItems: 'center', justifyContent: 'center', marginTop: '50%' }}>
                <MaterialCommunityIcons name='cart-arrow-down' size={80} color='#ffa500' />
                <Text marginTop={2}>Hiện chưa có đơn hàng!</Text>
              </SafeAreaView>
              : null)}
            renderItem={({ item }) => (
              <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: '2%', backgroundColor: '#fff', paddingLeft: '2%', paddingTop: '5%', paddingBottom: '5%' }}>
                <View style={{ width: '70%' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 14 }} >Đơn hàng số #{item.orderCode}</Text>
                  <Text style={{ fontWeight: '400', fontSize: 12 }} >Đặt ngày: {moment(item.createdDate).format("DD-MM-YYYY hh:mm")}</Text>
                </View>
                <View style={{ width: '27%' }}>
                  <Text style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 14 }} >Tổng tiền</Text>
                  <NumberFormat
                    value={item.totalAmount}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={'đ'}
                    renderText={formattedValue => <Text style={{ textAlign: 'right', fontWeight: '400', color: 'red', fontSize: 12 }}>{formattedValue}</Text>} // <--- Don't forget this!
                  />

                </View>
                <View style={styles.line} />
                <View style={{ width: '99%' }}>
                  <FlatList
                    data={item.productList}
                    renderItem={({ item }) => (
                      <View style={{
                        flexDirection: "row", height: 100, marginTop: '2%'
                      }}>
                        <View width="30%" height="100%">
                          <Image source={{ uri: `data:image/jpeg;base64,${item.productImageBase64}` }} alt="image base" resizeMode="cover" height='100%' />
                        </View>
                        <View width="50%" left="10%" height="100%">
                          <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{item.productName}</Text>
                          <Text style={{ fontWeight: '400', fontSize: 12 }}>Số lượng: {item.quantity}</Text>
                          <Text><NumberFormat
                            value={item.amount}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'đ'}
                            renderText={formattedValue => <Text style={{ fontWeight: 'bold', color: "red", fontSize: 12 }}>{formattedValue}</Text>} // <--- Don't forget this!
                          /></Text>
                          <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: '13%' }}>
                            <Image source={require('../assets/images/MiMartLogoGradientApp.png')} alt="image base" resizeMode="cover" width={6} height={6} />
                            <Text style={{ marginLeft: '3%', marginTop: '3%', fontWeight: 'bold', fontSize: 12 }} width='45%'>MiMart</Text>
                          </View>
                        </View>

                        <View height="100%" marginTop='10'>
                          <Button
                            size="xs"
                            variant='outline'
                            colorScheme="secondary"
                            onPress={() => navigation.navigate('ProductRatting', { item: item })}
                          >
                            Đánh giá
                          </Button>
                        </View>
                      </View>
                    )}
                    keyExtractor={(item) => item.productId}
                  />
                </View>
              </View>
            )}
            keyExtractor={(item) => item.billId.toString()}
          />
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
  // tab 3

  // tab 4
  const userBillingTabFour = () => {
    if (!loading) {
      return (
        <Box bg="#f5f5f5">
          <FlatList
            data={dataProductTab4.listData}
            ListHeaderComponent={() => (!(dataProductTab4.listData !== undefined && dataProductTab4.listData.length > 0) ?
              <SafeAreaView style={{ alignItems: 'center', justifyContent: 'center', marginTop: '50%' }}>
                <MaterialCommunityIcons name='cart-arrow-down' size={80} color='#ffa500' />
                <Text marginTop={2}>Hiện chưa có đơn hàng!</Text>
              </SafeAreaView>
              : null)}
            renderItem={({ item }) => (
              <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: '2%', backgroundColor: '#fff', paddingLeft: '2%', paddingTop: '5%', paddingBottom: '5%' }}>
                <View style={{ width: '70%' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Đơn hàng số #{item.orderCode}</Text>
                  <Text style={{ fontWeight: '400', fontSize: 12 }}>Đặt ngày: {moment(item.createdDate).format("DD-MM-YYYY hh:mm")}</Text>
                </View>
                <View style={{ width: '27%' }}>
                  <Text style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 14 }} >Tổng tiền</Text>
                  <NumberFormat
                    value={item.totalAmount}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={'đ'}
                    renderText={formattedValue => <Text style={{ textAlign: 'right', fontWeight: '400', color: 'red', fontSize: 12 }}>{formattedValue}</Text>} // <--- Don't forget this!
                  />

                </View>
                <View style={styles.line} />
                <View style={{ width: '99%' }}>
                  <FlatList
                    data={item.productList}
                    renderItem={({ item }) => (
                      <View style={{
                        flexDirection: "row", height: 100, marginTop: '2%',
                      }}>
                        <View width="25%" height="100%">
                          <Image source={{ uri: `data:image/jpeg;base64,${item.productImageBase64}` }} alt="image base" resizeMode="cover" height='100%' />
                        </View>
                        <View width="60%" left="10%" height="100%">
                          <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{item.productName}</Text>
                          <Text style={{ fontWeight: '400', fontSize: 12 }}>Số lượng: {item.quantity}</Text>
                          <Text><NumberFormat
                            value={item.amount}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'đ'}
                            renderText={formattedValue => <Text style={{ fontWeight: 'bold', color: "red", fontSize: 12 }}>{formattedValue}</Text>} // <--- Don't forget this!
                          /></Text>
                          <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: '12%' }}>
                            <Image source={require('../assets/images/MiMartLogoGradientApp.png')} alt="image base" resizeMode="cover" width={6} height={6} />
                            <Text style={{ marginLeft: '3%', marginTop: '3%', fontWeight: 'bold', fontSize: 12 }} width='45%'>MiMart</Text>
                          </View>
                        </View>
                      </View>
                    )}
                    keyExtractor={(item) => item.productId}
                  />
                </View>

              </View>
            )}
            keyExtractor={(item) => item.billId.toString()}
          />
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
  // tab 4
  const navigation = useNavigation();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Chờ xác nhận' },
    { key: 'second', title: 'Đang giao' },
    { key: 'third', title: 'Đã giao' },
    { key: 'four', title: 'Đã hủy' },
  ]);

  const renderTabBar = (props: any) => {
    const inputRange = props.navigationState.routes.map((x: any, i: number) => i);
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route: any, i: number) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex: any) =>
              inputIndex === i ? 1 : 0.5
            ),
          });

          return (
            <Box
              flex={1}
              alignItems='center'
              justifyContent='center'
            >
              <TouchableOpacity
                onPress={() => {
                  console.log(i);
                  setIndex(i);
                }}>
                <Animated.Text style={{ opacity, fontWeight: 'bold' }}>{route.title}</Animated.Text>
              </TouchableOpacity>
            </Box>

          );
        })}
      </Box>
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
      />
    </NativeBaseProvider>
  );
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
        component={UserBilling}
        options={{ headerTitle: "ĐƠN HÀNG CỦA TÔI", headerTitleAlign: 'center' }}
      />
    </TabOneStack.Navigator>
  );
}

const styles = StyleSheet.create({
  line: {
    height: 0.5,
    backgroundColor: '#BDBDBD',
    marginTop: 10,
    width: '100%'
  },
});


function handleCancel(billId: any, userId: any, orderCode: any) {
  Alert.alert(
    "Hủy đơn hàng",
    `Bạn có chắc chắn muốn hủy đơn hàng ${orderCode} ?`,
    [
      // The "Yes" button
      {
        text: "Có",
        onPress: async () => {

          // gọi api hủy đơn
          fetch(ApiCommon.rootUrl + '/api/cancel-order', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              billId: billId,
              userId: userId,
            }),
          }).then((response) => response.json())
            .then((responseJson) => {
              if (responseJson.code == 1) {
                Toast.show('Bạn đã hủy đơn hàng thành công!', {
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
          //END gọi api hủy đơn

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