import React, { useState } from "react";
import {
  Image, Text, NativeBaseProvider, Center, Box, Stack, Heading, Button
} from "native-base";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ILineItem, IProduct, addToCart, getItemFromStorage } from "./CartProvider";
function ProductCard(data: any) {
  const dataProduct = data.data.data;
  const navigation = useNavigation();
  const product: IProduct = {id: 1, price: 10000};
  let [lineItems, setLineItems] = useState<ILineItem[]>([]);

  const addCart = async () => {
    setLineItems(await getItemFromStorage());
    addToCart(product, lineItems); 
    setLineItems(await getItemFromStorage());
    console.log(lineItems);
  } 
  return (
    <Box
      bg="white"
      shadow={2}
      rounded="lg"
      width={120}
      marginLeft={2}
    >
      <TouchableOpacity onPress={() => navigation.navigate('DetailProduct', {productId: dataProduct.productId})}>
        <Image source={{ uri: `data:image/jpeg;base64,${dataProduct.productImageBase64}` }} alt="image base" resizeMode="cover" height={150} roundedTop="md" />


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
            left={70}
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
      </TouchableOpacity>
      <Button size="sm" variant='outline' borderColor='#0ea5e9' bottom={0} onPress={() => addCart()}>
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