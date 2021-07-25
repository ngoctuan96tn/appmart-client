import React, { useEffect, useState } from "react"
import { HStack, Stack, Center, NativeBaseProvider, Text, Box, FlatList, ScrollView } from "native-base"
import CategoryCard from "./CategoryCard"
import { SafeAreaView, View } from "react-native"
import ApiCommon from "../constants/ApiCommon";
import { createStackNavigator } from "@react-navigation/stack";
import { TabOneParamList } from "../types";
export function AllCategoryList() {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        if (isLoading) {
            fetch(ApiCommon.rootUrl + '/api/categories')
                .then((response) => response.json())
                .then((json) => setData(json))
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
        }
    });
    return (
        <SafeAreaView>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View style={{marginTop:3}}><CategoryCard data={item} /></View>
                )}
                keyExtractor={item => item.id}
                numColumns={3}
            />
        </SafeAreaView>
    )
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
        component={AllCategoryList}
        options={{ headerTitle: 'DANH MỤC NGÀNH HÀNG' }}
      />
    </TabOneStack.Navigator>
  );
}
