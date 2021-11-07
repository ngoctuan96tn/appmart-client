import React from "react";
import {
  Image, Text, NativeBaseProvider, Center, Box, Stack, Heading, Button
} from "native-base";
import { ToastAndroid, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CartProvider, { IProduct } from "./CartProvider";
import NumberFormat from "react-number-format";
import { FontAwesome } from "@expo/vector-icons";
function ProductSuggestCard(data: any) {
  const dataProduct = data.data.data;
  const productImage = dataProduct.productImageBase64[0];
  const navigation = useNavigation();

  const price = dataProduct.discount > 0 ? dataProduct.unitPrice - (dataProduct.unitPrice * dataProduct.discount / 100) : dataProduct.unitPrice;
  const product: IProduct = { id: dataProduct.productId, name: dataProduct.productName, image: productImage, price: price };

  const addCart = async () => {
    const lineItems = await CartProvider.getItemFromStorage();
    CartProvider.addToCart(product, lineItems);
  }

  return (
    <Box
      bg="white"
      shadow={2}
      rounded="lg"
      width={120}
      height="100%"
      marginLeft={2}
    >
      <TouchableOpacity onPress={() => navigation.push('DetailProduct', { productId: dataProduct.productId })}>
        <Image source={{ uri: `data:image/jpeg;base64,${productImage}` }} alt="image base" resizeMode="cover" height={150} roundedTop="md" />
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
            <Text color="#fff">{dataProduct.discount}%</Text>
          </Center>
        }
        <Text color='black' left={1} fontWeight='200'>{dataProduct.productName}</Text>
        <NumberFormat
          value={dataProduct.unitPrice}
          displayType={'text'}
          thousandSeparator={true}
          suffix={'đ'}
          renderText={formattedValue => <Text color='red.500' left={1} fontSize={13}>{formattedValue}</Text>} // <--- Don't forget this!
        />
      </TouchableOpacity>
      <View style={{ position: 'absolute', bottom: 1, }}>
        <Button size="xs" variant='outline' borderColor='#0ea5e9' bottom={0} marginTop='10%' onPress={() => addCart()} marginLeft="6%" marginRight="6%" marginBottom="3%">
          <Text fontSize={13} color='#0ea5e9'><FontAwesome name="cart-plus" size={13} />  Chọn mua</Text>
        </Button>
      </View>
    </Box>
  );
}

export default function (data: any) {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <ProductSuggestCard data={data} />
      </Center>
    </NativeBaseProvider>
  );
}