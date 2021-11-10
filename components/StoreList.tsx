import React from "react"
import { HStack, Stack, Center, NativeBaseProvider, Text, Box, FlatList } from "native-base"
import StoreCard from "./StoreCard"
import { SafeAreaView, View } from "react-native"
import { useNavigation } from "@react-navigation/native";
export function StoreList(data: any) {
    const dataStore = data.data.listData;
    const navigation = useNavigation();
    return (
        <><View style={{ flexDirection: 'row', backgroundColor: '#fff' }}>
            <Text style={{ marginLeft: '3%', flex: 1, fontWeight: 'bold', }}>CỬA HÀNG</Text>
            <Text style={{ textAlign: 'right', flex: 1, marginRight: 5, fontWeight: '300', color: '#ffa500' }} onPress={() => {navigation.navigate('ListStores')}}>Xem thêm</Text>
        </View>

            <SafeAreaView style={{ flex: 1, marginTop: '5%', marginBottom:'2%', marginLeft: '2%', backgroundColor:'#fff' }}>
                <FlatList
                    data={dataStore}
                    renderItem={({ item }) => (
                        <StoreCard data={item} />
                    )}
                    numColumns={3}
                    keyExtractor={(item) => item.id.toString()} />
            </SafeAreaView>
        </>
    )
}

export default (data: any) => {
    return (
        <NativeBaseProvider>
            <Box bg="white">
                <StoreList data={data} />
            </Box>
        </NativeBaseProvider>
    )
}
