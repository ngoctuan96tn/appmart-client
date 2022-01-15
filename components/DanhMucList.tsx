import React from "react"
import { FlatList, Center, NativeBaseProvider, Text, Box } from "native-base"
import ProductCard from "./ProductCard"
import { right } from "styled-system"
import { SafeAreaView, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import DanhMuc from "./DanhMuc"
import CategoryCard from "./CategoryCard"
export function DanhMucList(data: any) {
  const list = data.data.data;
  console.log("list",list);
  
  const navigation = useNavigation();
  return (
    <>
      <View style={{ flexDirection: 'row',  }}>
        <Text style={{ marginLeft: '2%', flex: 1,fontWeight: 'bold', fontSize:15, marginTop:'3%'}}>DANH MỤC NGÀNH HÀNG</Text>
        <Text style={{ textAlign: 'right', flex: 1, marginRight: '2%', fontWeight: '300',  color: '#ffa500', marginTop:'3%' }} onPress={() => navigation.navigate('AllCategory')}>Xem thêm</Text>
      </View>
      <SafeAreaView style={{ flex: 1, marginTop:'2%' }}>
        <FlatList
          horizontal={true}
          data={list}
          height={200}
          renderItem={({ item }) => (
            <DanhMuc data={item} />
          )}
          keyExtractor={(item) => item.id} />
      </SafeAreaView>
    </>
  )
}

export default (data: any) => {
  return (
    <NativeBaseProvider>
      <Box bg="white">
        <DanhMucList data={data} />
      </Box>
    </NativeBaseProvider>
  )
}
