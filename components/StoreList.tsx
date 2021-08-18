import React from "react"
import { HStack, Stack, Center, NativeBaseProvider, Text, Box } from "native-base"
import StoreCard from "./StoreCard"
import { SafeAreaView, View } from "react-native"
export function StoreList() {
    return (
        <><View style={{ flexDirection: 'row' }}>
            <Text style={{ marginLeft: 5, flex: 1, fontWeight: 'bold', }}>CỬA HÀNG</Text>
            <Text style={{ textAlign: 'right', flex: 1, marginRight: 5, fontWeight: 'bold', color: '#ffa500' }}>Xem thêm</Text>
        </View>
        <SafeAreaView style={{ flex: 1, marginTop: 10 }}>
            <StoreCard />
        </SafeAreaView>    
        </>
    )
}

export default () => {
    return (
        <NativeBaseProvider>
            <Box bg="white"
                shadow={2}>
                <StoreList />
            </Box>
        </NativeBaseProvider>
    )
}
