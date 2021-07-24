import React from "react"
import { HStack, Stack, Center, NativeBaseProvider, Text, Box } from "native-base"
import StoreCard from "./StoreCard"
import { View } from "react-native"
export function StoreList() {
    return (
        <><View style={{ flexDirection: 'row' }}>
            <Text style={{ marginLeft: 5, flex: 1, fontWeight: 'bold', }}>CỬA HÀNG</Text>
            <Text style={{ textAlign: 'right', flex: 1, marginRight: 5 }}>Xem thêm</Text>
        </View>
            <StoreCard />
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
