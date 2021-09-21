import React, { useEffect, useState } from "react"
import { Center, NativeBaseProvider, } from "native-base"
import { ActivityIndicator, Dimensions, SafeAreaView, Text } from "react-native"

import { createStackNavigator } from "@react-navigation/stack";
import { TabOneParamList } from "../types";
const { width } = Dimensions.get('window')
export function FeedBack() {
        return (
            <SafeAreaView style={{flex:1, alignContent:'center', alignItems:'center', justifyContent:'center'}}>
                <Text style={{color:'#0ea5e9'}}> Tính năng đang phát triển !</Text>
            </SafeAreaView>

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
                component={FeedBack}
                options={{ headerTitle: "PHẢN HỒI ỨNG DỤNG" }}
            />
        </TabOneStack.Navigator>
    );
}

