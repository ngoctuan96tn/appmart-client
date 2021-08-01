import React, { useEffect, useState } from "react"
import { Center, NativeBaseProvider, Text, Box, FlatList, ScrollView, Image, Button } from "native-base"
import { ActivityIndicator, SafeAreaView, ToastAndroid, View } from "react-native"
import ApiCommon from "../constants/ApiCommon";
import { createStackNavigator } from "@react-navigation/stack";
import { TabOneParamList } from "../types";
import { Rating, AirbnbRating } from 'react-native-ratings';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import ProductSimilarSuggestList from "../components/ProductSimilarSuggestList";
import { addToCart, getItemFromStorage, IProduct } from "../components/CartProvider";
import NumberFormat from "react-number-format";
export function DetailProduct(route: any) {

    const productId = route.route.params.data.route.params.productId;
    console.log(productId);
    const [dataProduct, setDataproduct] = useState([]);
    const [productDetail, setProductDetail] = useState<any>({});
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        if (isLoading) {
            fetch(ApiCommon.rootUrl + '/api/products/popular')
                .then((response) => response.json())
                .then((json) => setDataproduct(json))
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));

            fetch(ApiCommon.rootUrl + `/api/products/${productId}`)
                .then((response) => response.json())
                .then((json) => setProductDetail(json))
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
        }
    }, []);

    const price = productDetail.discount > 0 ? productDetail.unitPrice - (productDetail.unitPrice * productDetail.discount / 100) : productDetail.unitPrice;
    const product: IProduct = { id: productDetail.productId, name: productDetail.productName, image: productDetail.productImageBase64, price: price };

    const addCart = async () => {
        const lineItems = await getItemFromStorage();
        addToCart(product, lineItems);
        ToastAndroid.showWithGravityAndOffset('Đã thêm sản phẩm vào giỏ hàng!',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 0, 50);
    }

    if (!isLoading) {
        return (
            <SafeAreaView>
                <ScrollView>
                    <Image source={{ uri: `data:image/jpeg;base64,${productDetail.productImageBase64}` }} alt="image base" resizeMode="cover" height={350} roundedTop="md" />
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', top: 5 }}>{productDetail.productName}</Text>
                    {productDetail.discount > 0 &&
                        <View>
                            <NumberFormat
                                value={productDetail.unitPrice}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={' đồng'}
                                renderText={formattedValue => <Text style={{ textAlign: 'center', fontWeight: 'bold', top: 5, color: 'black', textDecorationLine: 'line-through' }}>{formattedValue}</Text>} // <--- Don't forget this!
                            />
                            <NumberFormat
                                value={productDetail.unitPrice - (productDetail.unitPrice * productDetail.discount / 100)}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={' đồng'}
                                renderText={formattedValue => <Text style={{ textAlign: 'center', fontWeight: 'bold', top: 5, color: 'red' }}>{formattedValue}      -{productDetail.discount}%</Text>} // <--- Don't forget this!
                            />
                        </View>
                    }

                    {productDetail.discount == 0 &&
                        <View>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', top: 5, color: 'red', }}>{productDetail.unitPrice} đồng</Text>
                        </View>
                    }
                    <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: '5%', marginLeft: '4%' }}>
                        <Image source={require('../assets/images/MiMartLogoGradientApp.png')} alt="image base" resizeMode="cover" width='12%' height={45} roundedTop="md" />
                        <Text style={{ marginLeft: '1%', marginTop: '3%' }} width='50%'>MiMart</Text>
                        <Button borderColor='#e27741' size="sm" variant="outline" colorScheme="secondary" onPress={() => console.log("hello world")}>
                            Đến cửa hàng
                        </Button>

                    </View>
                    <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: '5%', backgroundColor: '#fff' }}>
                        <View style={{ width: '50%' }}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'red' }} >{productDetail.quantity}</Text>
                            <Text style={{ textAlign: 'center' }} >Sản phẩm</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'red' }} >0</Text>
                            <Text style={{ textAlign: 'center' }} >Đánh giá</Text>
                        </View>

                    </View>

                    <View style={{ marginTop: '5%', backgroundColor: '#fff' }}>
                        <Text fontWeight='bold'>Chi tiết sản phẩm</Text>
                        <Text>{productDetail.description}</Text>
                    </View>

                    <View style={{ marginTop: '5%', backgroundColor: '#fff' }}>
                        <Text marginLeft='2%' fontWeight='bold'>Đánh giá và nhận xét</Text>
                        <Text marginLeft='2%'>
                            <Rating
                                type='star'
                                ratingCount={5}
                                imageSize={16}
                                startingValue={0}
                            /> 0.0/5 (0 đánh giá)</Text>
                    </View>

                    <View style={{ marginTop: '5%', backgroundColor: '#fff' }}>
                        <ProductSimilarSuggestList data={dataProduct} />
                    </View>

                    <View style={{ height: 20 }}></View>
                </ScrollView>
                <View style={{ flex: 1 }}>
                    <View style={{ position: 'absolute', bottom: 0, backgroundColor: '#f8f8ff', flexDirection: "row", flexWrap: "wrap", justifyContent: 'center', width: '100%', height: 50 }}>
                        <Button borderColor='#f8f8ff' borderRadius={0} size="sm" variant="outline" onPress={() => console.log("hello world")} width='33%'>
                            <MaterialCommunityIcons name="message-processing-outline" color='#008000' size={22} />
                        </Button>
                        <View style={{ height: '100%', width: 1, backgroundColor: '#909090', }}></View>
                        <Button borderColor='#f8f8ff' borderRadius={0} size="sm" variant="outline" onPress={() => addCart()} width='33%'>
                            <FontAwesome name='cart-plus' color='#0ea5e9' size={22} />
                        </Button>
                        <View style={{ height: '100%', width: 1, backgroundColor: '#909090', }}></View>
                        <Button borderColor='#f8f8ff' borderRadius={0} size="sm" onPress={() => console.log("hello world")} width='33%'>
                            Thanh toán
                        </Button>
                    </View>
                </View>
            </SafeAreaView>

        );
    } else {
        return (
            <View>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
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
                component={DetailProduct}
                options={{ headerTitle: "CHI TIẾT SẢN PHẨM" }}
                initialParams={data}
            />
        </TabOneStack.Navigator>
    );
}

