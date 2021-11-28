import React, { useEffect, useState } from "react"
import { HStack, Stack, Center, NativeBaseProvider, Text, Box, FlatList, ScrollView } from "native-base"
import { ActivityIndicator, SafeAreaView, View } from "react-native"
import ApiCommon from "../constants/ApiCommon";
import { createStackNavigator } from "@react-navigation/stack";
import { TabOneParamList } from "../types";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
export function ListProduct(route: any) {
    const params = route.route.params.data.route.params;
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isLoadingPaging, setLoadingPaging] = useState(false);
    const [limit, setLimit] = useState(18);
    useEffect(() => {
        if (isLoading) {
            fetch(ApiCommon.rootUrl + `/api/products/category-paging/${params.categoryId}?limit=${limit}&offset=0`)
                .then((response) => response.json())
                .then((json) => setData(json))
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
        }
    });

    const fetchResult = () => {
        setLoadingPaging(true);
        const limitCalculate = limit + 6;
        const offset = limit;
        setLimit(limitCalculate);
        fetch(ApiCommon.rootUrl + `/api/products/category-paging/${params.categoryId}?limit=${limit}&offset=${offset}`)
            .then((response) => response.json())
            .then((json) => {
                console.log(data[data.length-1].productId);
                console.log(json[json.length-1].productId)
                if (data[data.length-1].productId !== json[json.length-1].productId) {
                    setData(data.concat(json))
                }
                
            })
            .catch((error) => console.error(error))
            .finally(() => setLoadingPaging(false));
    }
    if (!isLoading) {
        return (
            <SafeAreaView style={{alignItems:'center' ,justifyContent:'center', marginTop: '3%'}}>
                {isLoadingPaging &&
                    <View>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                }
                
                <FlatList
                    onEndReached={fetchResult}
                    onEndReachedThreshold={0.1}
                    data={data}
                    renderItem={({ item }) => (
                        <View style={{ marginTop: '2%', height:260 }}><ProductCard data={item} /></View>
                    )}
                    keyExtractor={item => item.id}
                    numColumns={3}
                />
                <View style={{height:20}}></View>
            </SafeAreaView>

        )
    } else {
        return (
            <View>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>

        )
    }
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
