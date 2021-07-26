import React, { useEffect } from "react"
import { HStack, Stack, Center, NativeBaseProvider, Text, Box, FlatList, ScrollView } from "native-base"
import CategoryCard from "./CategoryCard"
import { SafeAreaView, View } from "react-native"
import { useNavigation } from "@react-navigation/native";
export function CategoryList(data: any) {
    const navigation = useNavigation();
    const list = data.data.data;
    return (
        <><View style={{ flexDirection: 'row' }}>
            <Text style={{ marginLeft: 5, flex: 1, fontWeight: 'bold', }}>DANH MỤC NGÀNH HÀNG</Text>
            <Text style={{ textAlign: 'right', flex: 1, marginRight: 5, fontWeight: 'bold', color: '#ffa500' }} onPress={() => navigation.navigate('AllCategory')} >Xem thêm</Text>
        </View>
            <SafeAreaView style={{ flex: 1, marginTop: 10 }}>
                <FlatList
                    data={list}
                    renderItem={({ item }) => (
                        <View style={{ marginTop: 3 }}><CategoryCard data={item} /></View>
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
