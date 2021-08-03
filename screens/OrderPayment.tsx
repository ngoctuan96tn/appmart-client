// import { createStackNavigator } from "@react-navigation/stack";
// import { NativeBaseProvider } from "native-base";
// import React, { Component } from "react";
// import { SafeAreaView, Text } from "react-native";
// import { TabOneParamList } from "../types";

// export class OrderPayment extends Component<{}, any> {

//     render() {
//         return (
//             <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//                 <Text>Thanh toán</Text>
//             </SafeAreaView>
//         )
//     }
// }

// export default () => {
//     return (
//       <NativeBaseProvider>
//         <TabOneNavigator />
//       </NativeBaseProvider>
//     )
//   }
  
//   const TabOneStack = createStackNavigator<TabOneParamList>();
  
//   function TabOneNavigator() {
//     return (
//       <TabOneStack.Navigator>
//         <TabOneStack.Screen
//           name="TabOneScreen"
//           component={OrderPayment}
//           options={{ headerTitle: "THANH TOÁN" }}
//         />
//       </TabOneStack.Navigator>
//     );
//   }




import * as React from 'react';
import { View, StyleSheet, Dimensions, StatusBar,TouchableOpacity,Animated, Pressable} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import {NativeBaseProvider,Box, Text} from 'native-base';
import Constants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';
import { TabOneParamList } from '../types';

const FirstRoute = () => (
  <Box flex={1} bg="pink.400" />
);

const SecondRoute = () => (
  <Box flex={1} bg="violet.400"  />
);

const ThirdRoute = () => (
  <Box flex={1} bg="red.400"  />
);

const initialLayout = { width: Dimensions.get('window').width };

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

export function OrderPayment() {




  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
    { key: 'third', title: 'Third' },
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
             flex = {1}
              alignItems= 'center'
              p= {2}
             >
            <Pressable

              onPress={() => {
                console.log(i);
                setIndex(i);}}>
               <Animated.Text style={{ opacity }}>{route.title}</Animated.Text>
            </Pressable>
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
      style={{marginTop: StatusBar.currentHeight}}
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

