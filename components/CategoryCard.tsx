import React from "react";
import {
  Image, Text, NativeBaseProvider, Center, Box, Stack, Heading, Button
} from "native-base";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
function CategoryCard(data: any) {
  const item = data.data.data;
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('ListProduct', {categoryId: item.id, categoryName:item.categoryName})}>
    <Box
      bg="white"
      border={1}
      borderColor="#0ea5e9"
      rounded="lg"
      width={120}
      height="96%"
      marginLeft={2}
      marginTop="5%"
    >
      <Image source={{ uri: `data:image/jpeg;base64,${item.categoryImageBase64}` }} alt="image base" resizeMode="cover" height={150} roundedTop="md" />
      <Text color='black' left={1}>{item.categoryName}</Text>
    </Box>
    </TouchableOpacity>
  );
}

export default function (data: any) {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <CategoryCard data={data} />
      </Center>
    </NativeBaseProvider>
  );
}