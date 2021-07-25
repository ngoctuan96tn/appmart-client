import React from "react"
import { FlatList, Center, NativeBaseProvider, Text, Box } from "native-base"
import ProductCard from "./ProductCard"
import { right } from "styled-system"
import { SafeAreaView, View } from "react-native"
export function ProductList(data: any) {
  const dataProduct = data.data.data;
  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ marginLeft: 5, flex: 1, fontWeight: 'bold' }}>SẢN PHẨM PHỔ BIẾN</Text>
        <Text style={{ textAlign: 'right', flex: 1, marginRight: 5, fontWeight: 'bold', color: '#ffa500' }}>Xem thêm</Text>
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          horizontal={true}
          data={dataProduct}
          height={300}
          renderItem={({ item }) => (
            <ProductCard data={item} />
          )}
          keyExtractor={(item) => item.productId.toString()} />
      </SafeAreaView>
    </>
  )
}

export default (data: any) => {
  return (
    <NativeBaseProvider>
      <Box bg="white"
        shadow={2}>
        <ProductList data={data} />
      </Box>
    </NativeBaseProvider>
  )
}
