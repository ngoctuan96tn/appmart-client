import React from "react"
import { FlatList, Center, NativeBaseProvider, Text, Box } from "native-base"
import ProductSuggestCard from "./ProductSuggestCard"
import { View } from "react-native"
export function ProductSuggestList() {
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
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ marginLeft: 5, flex: 1, fontWeight: 'bold', }}>Sản phẩm gợi ý</Text>
        <Text style={{ textAlign: 'right', flex: 1, marginRight: 5 }} onPress={() => console.log("hello world")}>Xem thêm</Text>
      </View>
      <FlatList
        horizontal={true}
        data={data}
        height={300}
        renderItem={({ item }) => (
          <ProductSuggestCard />
        )}
        keyExtractor={(item) => item.id} />
    </>
  )
}

export default () => {
  return (
    <NativeBaseProvider>
      <Box bg="white"
        shadow={2}>
        <ProductSuggestList />
      </Box>
    </NativeBaseProvider>
  )
}
