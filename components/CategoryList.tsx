import React, { useEffect } from "react"
import { HStack, Stack, Center, NativeBaseProvider, Text, Box, FlatList, ScrollView } from "native-base"
import CategoryCard from "./CategoryCard"
import { SafeAreaView, View } from "react-native"
export function CategoryList(data: any) {
    const list = data.data.data;
    return (
        <><View style={{ flexDirection: 'row' }}>
            <Text style={{ marginLeft: 5, flex: 1, fontWeight: 'bold', }}>DANH MỤC NGÀNH HÀNG</Text>
            <Text style={{ textAlign: 'right', flex: 1, marginRight: 5 }}>Xem thêm</Text>
        </View>
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    data={list}
                    renderItem={({ item }) => (
                        <CategoryCard data={item} />
                    )}
                    keyExtractor={item => item.id.toString()}
                    numColumns={3}
                />
            </SafeAreaView>
        </>
    )
}

export default (data: any) => {
    return (
        <NativeBaseProvider>
            <Box bg="white"
                shadow={2}>
                <CategoryList data={data} />
            </Box>
        </NativeBaseProvider>
    )
}
