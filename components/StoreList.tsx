import React from "react"
import { HStack, Stack, Center, NativeBaseProvider, Text, Box, FlatList } from "native-base"
import StoreCard from "./StoreCard"
import { SafeAreaView, View } from "react-native"
export function StoreList(data: any) {
    const dataStore = data.data.listData;
    return (
        <><View style={{ flexDirection: 'row' }}>
            <Text style={{ marginLeft: 5, flex: 1, fontWeight: 'bold', }}>CỬA HÀNG</Text>
            <Text style={{ textAlign: 'right', flex: 1, marginRight: 5, fontWeight: 'bold', color: '#ffa500' }}>Xem thêm</Text>
        </View>

            <SafeAreaView style={{ flex: 1, marginTop: 10 }}>
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
            <Box bg="white"
                shadow={2}>
                <StoreList data={data} />
            </Box>
        </NativeBaseProvider>
    )
}
