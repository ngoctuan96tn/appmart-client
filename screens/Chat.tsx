import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { Text } from "react-native";
import { View } from "../components/Themed";
import { TabOneParamList } from "../types";

export function Chat(route: any) {
    return(
        <View>
            <Text>chat</Text>
        </View>
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
    const name = 'MiMart'
    return (
        <TabOneStack.Navigator>
            <TabOneStack.Screen
                name="TabOneScreen"
                component={Chat}
                options={{ headerTitle: `${name}`, headerTitleAlign:'center' }}
                initialParams={data}
            />
        </TabOneStack.Navigator>
    );
}