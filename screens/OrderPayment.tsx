import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider } from "native-base";
import React, { Component } from "react";
import { SafeAreaView, Text } from "react-native";
import { TabOneParamList } from "../types";

export class OrderPayment extends Component<{}, any> {

    render() {
        return (
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Thanh toán</Text>
            </SafeAreaView>
        )
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
          component={OrderPayment}
          options={{ headerTitle: "THANH TOÁN" }}
        />
      </TabOneStack.Navigator>
    );
  }