
import * as React from 'react';
import { Dimensions, StatusBar, TouchableOpacity, Animated, Pressable } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { NativeBaseProvider, Box, View, } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import { TabOneParamList } from '../types';
import { useNavigation } from '@react-navigation/native';
import UserBillingFirst from '../components/UserBillingFirst';
import UserBillingSecond from '../components/UserBillingSecond';

const initialLayout = { width: Dimensions.get('window').width };

const renderScene = SceneMap({
  first: UserBillingFirst,
  second: UserBillingSecond,
  third: UserBillingSecond,
  four: UserBillingSecond,
});

export function UserBilling() {
  const navigation = useNavigation();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Chờ xác nhận' },
    { key: 'second', title: 'Đang giao' },
    { key: 'third', title: 'Đã giao'},
    { key: 'four', title: 'Đã hủy' },
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
                    <Pressable>
                      <Animated.Text style={{ opacity, fontWeight: 'bold' }}>{route.title}</Animated.Text>
                    </Pressable>
                  </View>
                </TouchableOpacity>
              </Box>

            );
          })}
        </Box>
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
        component={UserBilling}
        options={{ headerTitle: "ĐƠN HÀNG CỦA TÔI", headerTitleAlign:'center' }}
      />
    </TabOneStack.Navigator>
  );
}

