import React from "react"
import { FlatList, Center, NativeBaseProvider, Text } from "native-base"
import ProductCard from "./ProductCard"
import { right } from "styled-system"
import { View } from "react-native"
export function ProductList() {
  const data = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d73",
      title: "Four Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d74",
      title: "Five Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d75",
      title: "Six Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d76",
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d77",
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d78",
      title: "Third Item",
    },
  ]

  return (
    <>
    <View style={{flexDirection: 'row'}}>
      <Text style={{marginLeft:5, flex:1}}>Sản phẩm phổ biến</Text>
      <Text style={{textAlign: 'right', flex:1, marginRight:5}}>Xem thêm</Text>
    </View>
      <FlatList
        horizontal={true}
        data={data}
        height={250}
        renderItem={({ item }) => (
          <ProductCard />
        )}
        keyExtractor={(item) => item.id} />
        </>
  )
}

export default () => {
  return (
    <NativeBaseProvider>
        <ProductList />
    </NativeBaseProvider>
  )
}
