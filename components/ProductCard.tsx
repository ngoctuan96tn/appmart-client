import React from "react";
import {
  Image, Text, NativeBaseProvider, Center, Box, Stack, Heading, Button
} from "native-base";
function ProductCard(data: any) {
  const dataProduct = data.data.data;
  return (
    <Box
      bg="white"
      shadow={2}
      rounded="lg"
      width={165}
      marginLeft={3}
    >
      <Image source={{ uri: "https://sample-example.nativebase.io/static/media/dawki-river.ebbf5434.png" }} alt="image base" resizeMode="cover" height={150} roundedTop="md" />


      {dataProduct.discount > 0 &&

        <Center
          p={1}
          rounded="full"
          bg="red.500"
          boxSize={10}
          position="absolute"
          right={0}
          m={2}
          top={0}
          left={100}
          _text={{
            color: "white",
            textAlign: "center",
            fontWeight: "700",
            fontSize: "xs",
          }}
        >
          <Text>{dataProduct.discount}%</Text>
        </Center>
      }

      <Text color='black' left={1}>{dataProduct.productName}</Text>
      <Text color='red.500'>{dataProduct.unitPrice}</Text>
      <Button size="sm" variant='outline' bottom={0} onPress={() => console.log("hello world")}>
        <Text>Chọn mua</Text>
      </Button>
    </Box>
  );
}

export default function (data: any) {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <ProductCard data={data} />
      </Center>
    </NativeBaseProvider>
  );
}