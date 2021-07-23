import React from "react";
import { VStack, HStack, Avatar, Image, Text, NativeBaseProvider,
AspectRatio, Center, Box, Stack, Heading } from "native-base";

function ProductCard(){
 return(
    <Box
      bg="white"
      shadow={2}
      rounded="lg"
      width={150}
      marginLeft={3}
    >
      <Image source={{uri: "https://sample-example.nativebase.io/static/media/dawki-river.ebbf5434.png"}} alt="image base" resizeMode="cover" height={150} roundedTop="md" />
      <Text bold position="absolute" color="white" top={0} m={[4, 4, 8]}>
        NEWS
      </Text>
      <Stack space={4} p={[4, 4, 8]}>
        <Heading size={["md", "lg", "md"]} noOfLines={2} >
          Thịt
        </Heading>
      </Stack>
      </Box>
    );
}

export default function () {
  return (
  <NativeBaseProvider>
    <Center flex={1}>
      <ProductCard/>
    </Center>
  </NativeBaseProvider>
  );
}