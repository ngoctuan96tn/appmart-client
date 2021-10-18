import React from "react";
import {
  Image, Text, NativeBaseProvider, Center, Box, Stack, Heading, Button
} from "native-base";
import { Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";

const width = Dimensions.get('window').width;
function CategoryCard(data: any) {
  const store = data.data.data;
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('DetailStore', {storeId: store.id})}>
      <Box
        bg="white"
        shadow={2}
        rounded="lg"
        width={width/3.4}
        marginLeft={1}
        marginRight={1}
      >
        <Image source={{ uri: `data:image/jpeg;base64,${store.image}` }} alt="image base" resizeMode="cover" height={150} roundedTop="md" />
        <Text color='black' left={1} bottom='1%' style={{textAlign: 'center'}}>{store.name}</Text>
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