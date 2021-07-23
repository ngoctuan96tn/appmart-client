import React from "react";
import {
  Image, Text, NativeBaseProvider, Center, Box, Stack, Heading, Button
} from "native-base";
function CategoryCard() {
  return (
    <Box
      bg="white"
      shadow={2}
      rounded="lg"
      width={120}
      marginLeft={1}
      marginRight={1}
    >
      <Image source={{ uri: "https://sample-example.nativebase.io/static/media/dawki-river.ebbf5434.png" }} alt="image base" resizeMode="cover" height={150} roundedTop="md" />
      <Text color='black' left={1}>Mi Mart</Text>
    </Box>
  );
}

export default function () {
  return (
    <NativeBaseProvider>
        <CategoryCard />
    </NativeBaseProvider>
  );
}