import React from "react"
import { HStack, Stack, Center, NativeBaseProvider, Text, Box } from "native-base"
import CategoryCard from "./CategoryCard"
import { View } from "react-native"
export function CategoryList() {
    return (
        <><View style={{ flexDirection: 'row' }}>
            <Text style={{ marginLeft: 5, flex: 1, fontWeight: 'bold', }}>DANH MỤC NGÀNH HÀNG</Text>
            <Text style={{ textAlign: 'right', flex: 1, marginRight: 5 }}>Xem thêm</Text>
        </View>
            <Stack space={3} alignItems="center">
                {/* <Heading>HStack</Heading> */}
                <HStack space={3} alignItems="center">
                    <CategoryCard />
                    <CategoryCard />
                    <CategoryCard />
                    
                </HStack>

                <HStack space={3} alignItems="center">
                    <CategoryCard />
                    <CategoryCard />
                    <CategoryCard />
                </HStack>
            </Stack></>
    )
}

export default () => {
    return (
        <NativeBaseProvider>
            <Box bg="white"
                shadow={2}>
                <Center flex={1}>
                    <CategoryList />
                </Center>
            </Box>
        </NativeBaseProvider>
    )
}
