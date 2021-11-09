import React, { useEffect, useState } from "react"
import { HStack, Stack, Center, NativeBaseProvider, Text, Box, FlatList, Image, Button } from "native-base"
import { ActivityIndicator, SafeAreaView, View } from "react-native"
import ApiCommon from "../constants/ApiCommon";
import { createStackNavigator } from "@react-navigation/stack";
import { TabOneParamList } from "../types";
import { Rating } from "react-native-ratings";
import ProductCard from "../components/ProductCard";
import { ScrollView } from "react-native-gesture-handler";
export function DetailStore(route: any) {
    const params = route.route.params.data.route.params;
    const [data, setData] = useState<any>({});
    const [isLoading, setLoading] = useState(true);
    const [dataProduct, setDataProduct] = useState([]);
    useEffect(() => {
        if (isLoading) {
            fetch(ApiCommon.rootUrl + `/api/store/${params.storeId}`)
                .then((response) => response.json())
                .then((json) => {
                    if (json.listData.length > 0) {
                        setData(json.listData[0]);
                    }
                })
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));


            fetch(ApiCommon.rootUrl + `/api/products/store/${params.storeId}`)
                .then((response) => response.json())
                .then((json) => setDataProduct(json))
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));

        }
    });

    return (
        <SafeAreaView style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: '5%', marginLeft: '4%' }}>
                <Image source={{ uri: `data:image/jpeg;base64,${data.image}` }} alt="image base" resizeMode="cover" width='12%' height={45} roundedTop="md" />
                <Text style={{ marginLeft: '1%', marginTop: '3%' }} width='50%'>{data.name}</Text>
                <Button borderColor='#e27741' size="sm" variant="outline" colorScheme="secondary" onPress={() => console.log("hello world")}>
                    {data.phoneNumber}
                </Button>

            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: '5%', backgroundColor: '#fff', paddingTop: '3%', paddingBottom: '3%' }}>
                <View style={{ width: '33%' }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'red' }} >{data.totalProduct}</Text>
                    <Text style={{ textAlign: 'center' }} >Sản phẩm</Text>
                </View>
                <View style={{ width: '33%' }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'red' }} >{data.totalComment}</Text>
                    <Text style={{ textAlign: 'center' }} >Đánh giá</Text>
                </View>
                <View style={{ width: '33%' }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'red' }} >{((data.rating == undefined) || (data.rating == null)) ? 0 : data.rating}</Text>
                    <Text style={{ alignSelf: 'center' }} >
                        <Rating
                            type='star'
                            ratingCount={5}
                            imageSize={16}
                            startingValue={data.rating ? data.rating : 5}
                        />
                    </Text>
                </View>

            </View>

            <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: '1%', backgroundColor: '#fff', paddingTop: '5%', paddingBottom: '5%' }}>
                <View style={{ width: '20%' }}>
                    <Text style={{ fontWeight: 'bold', marginLeft: '10%' }} >Địa chỉ: </Text>
                </View>
                <View style={{ width: '80%' }}>
                    <Text  >{data.address}</Text>
                </View>
                <View style={{ width: '20%', marginTop:'3%' }}>
                    <Text style={{ fontWeight: 'bold', marginLeft: '10%' }} >Mô tả: </Text>
                </View>
                <View style={{ width: '80%', marginTop:'3%' }}>
                    <Text >{data.description}</Text>
                </View>
            </View>

            <ScrollView style={{ marginTop: '3%' }}>
                <FlatList
                    data={dataProduct}
                    renderItem={({ item }) => (
                        <View style={{ marginTop: 3, height:300 }}><ProductCard data={item} /></View>
                    )}
                    keyExtractor={item => item.productId.toString()}
                    numColumns={3}
                />
            </ScrollView>
        </SafeAreaView>

    )
}

export default (data: any) => {
    return (
        <NativeBaseProvider>
            <TabOneNavigator data={data} />
        </NativeBaseProvider>
    )
}

const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator(data: any) {
    return (
        <TabOneStack.Navigator>
            <TabOneStack.Screen
                name="TabOneScreen"
                component={DetailStore}
                options={{ headerTitle: "CỬA HÀNG" }}
                initialParams={data}
            />
        </TabOneStack.Navigator>
    );
}
