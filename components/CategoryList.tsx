import React, { useEffect } from "react"
import { HStack, Stack, Center, NativeBaseProvider, Text, Box, FlatList, ScrollView } from "native-base"
import CategoryCard from "./CategoryCard"
import { SafeAreaView, View } from "react-native"
import { useNavigation } from "@react-navigation/native";
export function CategoryList(data: any) {
    const navigation = useNavigation();
    const list = data.data.data;
    return (
        <><View style={{ flexDirection: 'row', marginTop:'2%' }}>
            <Text style={{ marginLeft: '3%', fontWeight: 'bold', fontSize:15, width:'60%' }}>DANH MỤC NGÀNH HÀNG</Text>
            <Text style={{ textAlign: 'right', width:'35%', marginRight: '1%', fontWeight: '300', color: '#ffa500' }} onPress={() => navigation.navigate('AllCategory')} >Xem thêm</Text>
        </View>
            <SafeAreaView style={{ flex: 1, marginTop: '2%', marginLeft:'2%', marginBottom:'5%' }}>
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
            <Box bg="white">
                <CategoryList data={data} />
            </Box>
        </NativeBaseProvider>
    )
}
