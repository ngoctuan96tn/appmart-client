import React, { useEffect, useState } from "react"
import { HStack, Stack, Center, NativeBaseProvider, Text, Box, FlatList, ScrollView } from "native-base"
import CategoryCard from "./CategoryCard"
import { ActivityIndicator, SafeAreaView, View } from "react-native"
import ApiCommon from "../constants/ApiCommon";
import { createStackNavigator } from "@react-navigation/stack";
import { TabOneParamList } from "../types";
import ProductCard from "./ProductCard";
export function AllProductPopular() {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        if (isLoading) {
            fetch(ApiCommon.rootUrl + '/api/products/allpopular')
                .then((response) => response.json())
                .then((json) => setData(json))
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
        }
    });
    if (!isLoading) {
        return (
            <SafeAreaView>
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <View style={{ marginTop: 3, height: 260 }}><ProductCard data={item} /></View>
                    )}
                    keyExtractor={item => item.id}
                    numColumns={3}
                />
            </SafeAreaView>
        )
    } else {
        return (
            <View>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          );
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
        component={AllProductPopular}
        options={{ headerTitle: 'SẢN PHẨM PHỔ BIẾN' }}
      />
    </TabOneStack.Navigator>
  );
}