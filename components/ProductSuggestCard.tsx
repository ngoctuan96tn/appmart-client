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
  const product: IProduct = { id: dataProduct.productId, name: dataProduct.productName, price: price, pQuantity: dataProduct.quantity };

  const addCart = async () => {
    const lineItems = await CartProvider.getItemFromStorage();
    CartProvider.addToCart(product, lineItems);
  }
  return (
    <Box
      bg="white"
      border={0.5}
      borderColor="#0ea5e9"
      rounded="lg"
      width={120}
      height="100%"
      marginLeft={2}
    >
      <TouchableOpacity onPress={() => navigation.navigate('DetailProduct', { productId: dataProduct.productId })}>
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
        <Text color='black' left={1} fontWeight='200' fontSize={12}>{((dataProduct.productName).length > 30) ?
          (((dataProduct.productName).substring(0, 27)) + '...') :
          dataProduct.productName} </Text>
        <NumberFormat
          value={dataProduct.unitPrice}
          displayType={'text'}
          thousandSeparator={true}
          suffix={'đ'}
          renderText={formattedValue => <Text color='red.500' fontWeight='300' fontSize={13} left={1}>{formattedValue}</Text>} // <--- Don't forget this!
        />
      </TouchableOpacity>
      <View style={{ position: 'absolute', bottom: 1, alignSelf:'center'}}>
        {dataProduct.quantity > 0 ?
          <Button size="xs" variant='outline' borderColor='#0ea5e9' bottom={0} marginTop='10%' onPress={() => addCart()} marginLeft="18%" marginBottom="3%">
            <Text fontSize={13} color='#0ea5e9'><FontAwesome name="cart-plus" size={13} />  Mua</Text>
          </Button>
        :
          <Button size="xs" variant='outline' borderColor='#ff0000' bottom={0} marginTop='10%' >
            <Text fontSize={13} color='#ff0000'>Hết hàng</Text>
          </Button>
        }
        
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