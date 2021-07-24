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
      marginLeft={3}
      marginRight={3}
    >
      <Image source={{ uri: "https://sample-example.nativebase.io/static/media/dawki-river.ebbf5434.png" }} alt="image base" resizeMode="cover" height={150} roundedTop="md" />
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