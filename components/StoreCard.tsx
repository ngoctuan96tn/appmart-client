import React from "react";
import {
  Image, Text, NativeBaseProvider, Center, Box, Stack, Heading, Button
} from "native-base";
import { TouchableOpacity } from "react-native";
function CategoryCard(data: any) {
  const store = data.data.data;
  return (
    <TouchableOpacity onPress={() => console.log('hello')}>
      <Box
        bg="white"
        shadow={2}
        rounded="lg"
        width={120}
        marginLeft={1}
        marginRight={1}
      >
        <Image source={{ uri: `data:image/jpeg;base64,${store.image}` }} alt="image base" resizeMode="cover" height={150} roundedTop="md" />
        <Text color='black' left={1}>{store.name}</Text>
      </Box>
    </TouchableOpacity>
  );
}

export default function (data: any) {
  return (
    <NativeBaseProvider>
      <CategoryCard data={data} />
    </NativeBaseProvider>
  );
}