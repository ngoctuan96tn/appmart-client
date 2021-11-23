import React, { useEffect, useState } from "react"
import { HStack, Stack, Center, NativeBaseProvider, Text, Box, FlatList, ScrollView } from "native-base"
import CategoryCard from "./CategoryCard"
import { ActivityIndicator, SafeAreaView, View } from "react-native"
import ApiCommon from "../constants/ApiCommon";
import { createStackNavigator } from "@react-navigation/stack";
import { TabOneParamList } from "../types";
export function AllCategoryList() {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [limit, setLimit] = useState(18);
    const [isLoadingPaging, setLoadingPaging] = useState(false);
    useEffect(() => {
        if (isLoading) {
            fetch(ApiCommon.rootUrl + `/api/categories-paging?limit=${limit}`)
                .then((response) => response.json())
                .then((json) => setData(json))
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
        }
    });
    const fetchResult = () => {
        setLoadingPaging(true);
        const limitCalculate = limit + 6;
        setLimit(limitCalculate);
        fetch(ApiCommon.rootUrl + `/api/categories-paging?limit=${limitCalculate}`)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoadingPaging(false));
    }
    if (!isLoading) {
        return (
            <SafeAreaView>
                {isLoadingPaging &&
                <View>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
                }
                
                <FlatList
                    onEndReached={fetchResult}
                    onEndReachedThreshold={0.7}
                    data={data}
                    renderItem={({ item }) => (
                        <View style={{ marginTop: 3 }}><CategoryCard data={item} /></View>
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
                component={AllCategoryList}
                options={{ headerTitle: 'DANH MỤC NGÀNH HÀNG' }}
            />
        </TabOneStack.Navigator>
    );
}
