
import * as React from 'react';
import { Dimensions, StatusBar, TouchableOpacity, Animated, Pressable } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { NativeBaseProvider, Box, View, Link, TextArea, Radio, Image, Button, Text, FlatList } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import { TabOneParamList } from '../types';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import PaymentTabFirst from '../components/PaymentTabFirst';
import PaymentTabSecond from '../components/PaymentTabSecond';
import PaymentTabThird from '../components/PaymentTabThird';

const initialLayout = { width: Dimensions.get('window').width };

export function OrderPayment(data:any) {
  const params = data.route.params.data.route.params;
  const navigation = useNavigation();
  const [index, setIndex] = React.useState(params.index);
  const [routes] = React.useState([
    { key: 'first', title: 'Địa chỉ', icon: 'location' },
    { key: 'second', title: 'Thanh toán', icon: 'credit' },
    { key: 'third', title: 'Đặt hàng', icon: 'check' },
  ]);
  const renderScene = SceneMap({
    first: () => <PaymentTabFirst data={params} />,
    second: () => <PaymentTabSecond data={params} />,
    third: () => <PaymentTabThird data={params} />,
  });

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
      <TabOneNavigator data={data}/>
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
        options={{ headerTitle: "ĐẶT HÀNG", headerTitleAlign:'center', headerLeft: null, gestureEnabled: false }}
        initialParams={data}
      />
    </TabOneStack.Navigator>
  );
}

