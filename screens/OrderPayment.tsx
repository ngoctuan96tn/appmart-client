
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

const renderScene = SceneMap({
  first: PaymentTabFirst,
  second: PaymentTabSecond,
  third: PaymentTabThird,
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

