
import * as React from 'react';
import { Dimensions, StatusBar, TouchableOpacity, Animated, Pressable } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { NativeBaseProvider, Box, View, Link, TextArea, Radio, Image, Button, Text, FlatList } from 'native-base';
import Constants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';
import { TabOneParamList } from '../types';
import { Entypo, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

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
  }
  ,
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d79",
    title: "Third Item",
  }
]

const FirstRoute = () => (
  <Box flex={1} bg="#f5f5f5">
    <View p={4} m={4} height={120} bg="#fff" borderRadius={5} marginTop={4}>
      <Text style={{ fontWeight: 'bold', bottom: 2 }}>Địa chỉ nhận hàng</Text>
      <Text style={{ fontWeight: 'bold' }}>Nguyễn Đình Vũ</Text>
      <Text>Số 5, Ngõ 2, Kiều Mai, Bắc Từ Liêm, Hà Nội</Text>
      <Text>0388339460</Text>
    </View>
    <View p={2} m={4} height={120} bg="#fff" marginTop="5%" borderRadius={5}>
      <TextArea h='100%' placeholder="Lưu ý (ví dụ: Địa chỉ nhận hàng khác)" />
    </View>
    <View style={{ flexDirection: 'row' }} p={2} m={4} height={35} bg="#fff" marginTop="5%" borderRadius={5}>
      <Text style={{ width: '50%' }}>Phí vận chuyển</Text>
      <Text style={{ width: '50%', textAlign: 'right', color: '#00bfff', fontWeight: 'bold' }}>Theo nhà cung cấp</Text>
    </View>

    <View paddingLeft={4} paddingRight={4} paddingTop={2} style={{ position: 'absolute', bottom: 1, backgroundColor: '#f8f8ff', flexDirection: "row", flexWrap: "wrap", width: '100%', height: 50 }}>
      <Text style={{ width: '50%' }}>Tổng tiền thanh toán</Text>
      <Text style={{ width: '50%', textAlign: 'right', color: '#ff0000', fontWeight: 'bold' }}>5000đ</Text>
    </View>
  </Box>
);

const SecondRoute = () => (
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
    <View paddingLeft={4} paddingRight={4} paddingTop={2} style={{ position: 'absolute', bottom: 1, backgroundColor: '#f8f8ff', flexDirection: "row", flexWrap: "wrap", width: '100%', height: 50 }}>
      <Text style={{ width: '50%' }}>Tổng tiền thanh toán</Text>
      <Text style={{ width: '50%', textAlign: 'right', color: '#ff0000', fontWeight: 'bold' }}>5000đ</Text>
    </View>
  </Box>
);

const ThirdRoute = () => (
  <Box flex={1} bg="#f5f5f5">
    <ScrollView>
      <View p={4} height={120} bg="#fff" borderRadius={5} marginTop={4}>
        <Text style={{ fontWeight: 'bold', bottom: 2 }}>Địa chỉ nhận hàng</Text>
        <Text style={{ fontWeight: 'bold' }}>Nguyễn Đình Vũ</Text>
        <Text>Số 5, Ngõ 2, Kiều Mai, Bắc Từ Liêm, Hà Nội</Text>
        <Text>0388339460</Text>
      </View>

      <View p={4} height={120} bg="#fff" borderRadius={5}>
        <Text style={{ fontWeight: 'bold', bottom: 2 }}>Phương thức thanh toán</Text>
        <Text>Thanh toán khi nhận hàng</Text>
      </View>

      <View p={4} bg="#fff" borderRadius={5} width="100%">
        <Text style={{ fontWeight: 'bold', bottom: 2 }}>Sản phẩm</Text>

        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={{
              flexDirection: "row", height: 80, marginTop: '2%', shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}>
              <View width="30%" height="100%">
                <Image source={{ uri: "https://sample-example.nativebase.io/static/media/dawki-river.ebbf5434.png" }} alt="image base" resizeMode="cover" height='100%' />
              </View>
              <View width="55%" left="10%" height="100%">
                <Text>Thịt lợn</Text>
                <Text>450000</Text>
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
      <Text style={{ width: '50%', textAlign: 'right', color: '#ff0000', fontWeight: 'bold' }}>5000đ</Text>
      <Button onPress={() => console.log("hello world")} width="100%" marginTop="5%">ĐẶT HÀNG</Button>
    </View>
  </Box>
);

const initialLayout = { width: Dimensions.get('window').width };

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

export function OrderPayment() {
  const navigation = useNavigation();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Địa chỉ', icon: 'location' },
    { key: 'second', title: 'Thanh toán', icon: 'credit' },
    { key: 'third', title: 'Đặt hàng', icon: 'check' },
  ]);

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
                <TouchableOpacity onPress={() => {
                  console.log(i);
                  setIndex(i);
                }}>
                  <View alignItems='center'>
                    <Entypo name={route.icon} size={20} style={{ borderWidth: 1, borderRadius: 50, width: 50, height: 50, textAlign: 'center', paddingTop: 15 }} />
                    <Pressable>
                      <Animated.Text style={{ opacity, fontWeight: 'bold' }}>{route.title}</Animated.Text>
                    </Pressable>
                  </View>
                </TouchableOpacity>
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
        component={OrderPayment}
        options={{ headerTitle: "ĐẶT HÀNG" }}
      />
    </TabOneStack.Navigator>
  );
}

