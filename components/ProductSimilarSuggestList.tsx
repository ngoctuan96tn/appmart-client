import React from "react"
import { FlatList, Center, NativeBaseProvider, Text, Box } from "native-base"
import ProductSuggestCard from "./ProductSuggestCard"
import { SafeAreaView, View } from "react-native"
import ProductSimilarCard from "./ProductSimilarCard";
export function ProductSuggestList(data: any) {
  const itemList = data.data.data;

  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ marginLeft: 5, flex: 1, fontWeight: 'bold', marginTop:'3%'}}>SẢN PHẨM LIÊN QUAN</Text>
      </View>
      <SafeAreaView style={{ flex: 1 , marginTop:'2%' }}>
        <FlatList
          horizontal={true}
          data={itemList}
          height={260}
          renderItem={({ item }) => (
            <ProductSimilarCard data={item} />
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
