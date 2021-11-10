import React from "react"
import { FlatList, Center, NativeBaseProvider, Text, Box } from "native-base"
import ProductSuggestCard from "./ProductSuggestCard"
import { SafeAreaView, View } from "react-native"
export function ProductSuggestList(data: any) {
  const itemList = data.data.data;

  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ marginLeft: 5, flex: 1, fontWeight: '300', marginTop:'3%'}}>SẢN PHẨM GỢI Ý</Text>
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          horizontal={true}
          data={itemList}
          height={300}
          renderItem={({ item }) => (
            <ProductSuggestCard data={item} />
          )}
          keyExtractor={(item) => item.productId.toString()} />
      </SafeAreaView>
    </>
  )
}

export default (data: any) => {
  return (
    <NativeBaseProvider>
      <Box bg="white">
        <ProductSuggestList data={data} />
      </Box>
    </NativeBaseProvider>
  )
}
