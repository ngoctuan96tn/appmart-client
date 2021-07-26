import React from "react";
import {
  Image, Text, NativeBaseProvider, Center, Box, Stack, Heading, Button
} from "native-base";
function CategoryCard(data: any) {
  const item = data.data.data;
  return (
    <Box
      bg="white"
      shadow={2}
      rounded="lg"
      width={120}
      marginLeft={2}
    >
      <Image source={{ uri: `data:image/jpeg;base64,${item.categoryImageBase64}` }} alt="image base" resizeMode="cover" height={150} roundedTop="md" />
      <Text color='black' left={1}>{item.categoryName}</Text>
    </Box>
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