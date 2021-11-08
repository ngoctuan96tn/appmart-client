import React, { useEffect, useState } from "react"
import { HStack, Stack, Center, NativeBaseProvider, Text, Box, FlatList, ScrollView } from "native-base"
import { SafeAreaView, View } from "react-native"
import ApiCommon from "../constants/ApiCommon";
import { createStackNavigator } from "@react-navigation/stack";
import { TabOneParamList } from "../types";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
export function ListProduct(route: any) {
    const params = route.route.params.data.route.params;
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        if (isLoading) {
            fetch(ApiCommon.rootUrl + `/api/products/category/${params.categoryId}`)
                .then((response) => response.json())
                .then((json) => setData(json))
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
        }
    });
    return (
        <SafeAreaView style={{alignItems:'center' ,justifyContent:'center', marginTop: '3%'}}>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View style={{ marginTop: '2%', height:300 }}><ProductCard data={item} /></View>
                )}
                keyExtractor={item => item.id}
                numColumns={3}
            />
        </SafeAreaView>

    )
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
    return (
        <TabOneStack.Navigator>
            <TabOneStack.Screen
                name="TabOneScreen"
                component={ListProduct}
                options={{ headerTitle: data.data.route.params.categoryName }}
                initialParams={data}
            />
        </TabOneStack.Navigator>
    );
}
