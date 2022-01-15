import React, { useState } from "react";
import {
  Image, Text, NativeBaseProvider, Center, Box, Stack, Heading, Button
} from "native-base";
import { Alert, Dimensions, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CartProvider, { IProduct } from "./CartProvider";
import NumberFormat from "react-number-format";
import { ToastAndroid } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
const width = Dimensions.get('window').width;

function DanhMuc(data: any) {
  const item = data.data.data;
  const navigation = useNavigation();
  return (
    <Box
      bg="white"
      border={0.5}
      borderColor="#0ea5e9"
      rounded="lg"
      width={width/3.4}
      height="100%"
      marginLeft={2}
    >
      <TouchableOpacity onPress={() => navigation.navigate('ListProduct', {categoryId: item.id, categoryName:item.categoryName})}>
        <Image source={{ uri: `data:image/jpeg;base64,${item.categoryImageBase64}` }} alt="image base" resizeMode="cover" height={150} roundedTop="md" />
        <Text color='black' left={1}>{item.categoryName}</Text>
        
      </TouchableOpacity>
    </Box>
  );
}

export default function (data: any) {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <DanhMuc data={data} />
      </Center>
    </NativeBaseProvider>
  );
}