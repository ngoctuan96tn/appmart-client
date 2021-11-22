import React from "react"
import { FlatList, Center, NativeBaseProvider, Text, Box } from "native-base"
import ProductCard from "./ProductCard"
import { right } from "styled-system"
import { SafeAreaView, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
export function ProductList(data: any) {
  const dataProduct = data.data.data;
  const navigation = useNavigation();
  return (
    <>
      <View style={{ flexDirection: 'row',  }}>
        <Text style={{ marginLeft: '2%', flex: 1,fontWeight: 'bold', fontSize:15, marginTop:'3%'}}>SẢN PHẨM PHỔ BIẾN</Text>
        <Text style={{ textAlign: 'right', flex: 1, marginRight: '2%', fontWeight: '300',  color: '#ffa500', marginTop:'3%' }} onPress={() => navigation.navigate('AllProductPopular')}>Xem thêm</Text>
      </View>
      <SafeAreaView style={{ flex: 1, marginTop:'2%' }}>
        <FlatList
          horizontal={true}
          data={dataProduct}
          height={260}
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
      <Box bg="white">
        <ProductList data={data} />
      </Box>
    </NativeBaseProvider>
  )
}
