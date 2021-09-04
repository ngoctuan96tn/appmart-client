import React, { useEffect, useState } from "react"
import { HStack, Stack, Center, NativeBaseProvider, Text, Box, FlatList, ScrollView } from "native-base"
import { SafeAreaView, View } from "react-native"
import ApiCommon from "../constants/ApiCommon";
import { createStackNavigator } from "@react-navigation/stack";
import { TabOneParamList } from "../types";
import StoreCard from "../components/StoreCard";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
export function ListStores(route: any) {
    const params = route.route.params.data.route.params;
    const [token, setToken] = useState<string | null>('');
    const { getItem, setItem } = useAsyncStorage('token');
    const [retrieve, setRetrieve] = useState(true);
    const [dataStore, setDataStore] = useState<any>([]);
    useEffect(() => {
        const readToken = async () => {
            const item = await getItem();
            setToken(item);
            setRetrieve(false);
          };
      
          if (retrieve) {
            readToken();
          }
          if (retrieve === false) {
            const headers = { 'Authorization': `Bearer ${token}` }
            fetch(ApiCommon.rootUrl + '/api/stores', { headers })
              .then((response) => response.json())
              .then((json) => setDataStore(json))
              .catch((error) => console.error(error));
          }
    });
    return (
        <SafeAreaView style={{alignItems:'center' ,justifyContent:'center'}}>
            <FlatList
                data={dataStore.listData}
                renderItem={({ item }) => (
                    <View style={{ marginTop: 3 }}><StoreCard data={item} /></View>
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
                component={ListStores}
                options={{ headerTitle: "DANH SÁCH CỬA HÀNG" }}
                initialParams={data}
            />
        </TabOneStack.Navigator>
    );
}
