import React, { useEffect, useState } from "react"
import { Center, NativeBaseProvider, Text, Box, FlatList, ScrollView, Image, Button, View } from "native-base"
import { ActivityIndicator, Dimensions, SafeAreaView, ToastAndroid, } from "react-native"
import ApiCommon from "../constants/ApiCommon";
import { createStackNavigator } from "@react-navigation/stack";
import { TabOneParamList } from "../types";
import { Rating, AirbnbRating } from 'react-native-ratings';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import ProductSimilarSuggestList from "../components/ProductSimilarSuggestList";
import CartProvider, { IProduct } from "../components/CartProvider";
import NumberFormat from "react-number-format";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
const { width } = Dimensions.get('window')
export function DetailProduct(route: any) {
    const navigation = useNavigation();
    const productId = route.route.params.data.route.params.productId;
    const [dataProduct, setDataproduct] = useState([]);
    const [productDetail, setProductDetail] = useState<any>({});
    const [dataComment, setDataComment] = useState<any>({});
    const [dataStore, setDataStore] = useState<any>({});
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
                .then((json) => {
                    setProductDetail(json);
                    fetch(ApiCommon.rootUrl + `/api/store/${json.storeId}`)
                        .then((response) => response.json())
                        .then((json) => {
                            if (json.listData.length > 0) {
                                setDataStore(json.listData[0]);
                            }
                        })
                        .catch((error) => console.error(error))
                        .finally(() => setLoading(false));
                })
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));

            fetch(ApiCommon.rootUrl + `/api/product/${productId}/rattings`)
                .then((response) => response.json())
                .then((json) => { setDataComment(json); })
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
        }

    }, []);

    const price = productDetail.discount > 0 ? productDetail.unitPrice - (productDetail.unitPrice * productDetail.discount / 100) : productDetail.unitPrice;
    const product: IProduct = { id: productDetail.productId, name: productDetail.productName, image: productDetail.productImageBase64, price: price };

    const addCart = async () => {
        const lineItems = await CartProvider.getItemFromStorage();
        CartProvider.addToCart(product, lineItems);
    }

    const payment = async () => {
        await addCart();
        navigation.navigate('Cart');
    }

    if (!isLoading) {
        return (
            <SafeAreaView>
                <ScrollView>
                    <View>
                        <FlatList
                            horizontal={true}
                            data={productDetail.productImageBase64}
                            renderItem={({ item }) => (
                                // <Image source={{ uri: `data:image/jpeg;base64,${item}` }} alt="image base" resizeMode="cover" height={350} roundedTop="md" />
                                <Image
                                    source={{
                                        uri: `data:image/jpeg;base64,${item}`,
                                    }}
                                    height={350}
                                    width={width}
                                    flex={1}
                                    alt="Ảnh sản phẩm"
                                    size={"xl"}
                                />
                            )}
                            keyExtractor={(item) => item.id} />
                    </View>

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
                        <Image source={{ uri: `data:image/jpeg;base64,${dataStore.image}` }} alt="image base" resizeMode="cover" width='12%' height={45} roundedTop="md" />
                        <Text style={{ marginLeft: '1%', marginTop: '3%' }} width='50%'>{dataStore.name}</Text>
                        <Button borderColor='#e27741' size="sm" variant="outline" colorScheme="secondary" onPress={() => navigation.navigate('DetailStore', { storeId: dataStore.id })}>
                            Đến cửa hàng
                        </Button>

                    </View>
                    <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: '5%', backgroundColor: '#fff', paddingTop: '3%', paddingBottom: '3%' }}>
                        <View style={{ width: '50%' }}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'red' }} >{dataStore.totalProduct}</Text>
                            <Text style={{ textAlign: 'center' }} fontSize={13}>Sản phẩm</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'red' }} >{dataStore.totalComment}</Text>
                            <Text style={{ textAlign: 'center' }} fontSize={13}>Đánh giá</Text>
                        </View>

                    </View>

                    <View style={{ marginTop: '2%', backgroundColor: '#fff', padding: '3%' }}>
                        <Text fontWeight='bold'>Chi tiết sản phẩm</Text>
                        <Text style={{ marginTop: '2%', textAlign: 'justify' }} fontWeight='300' fontSize={13}>{productDetail.description}</Text>
                    </View>

                    <View style={{ marginTop: '2%', backgroundColor: '#fff', paddingTop: '3%', paddingBottom: '3%' }}>
                        <Text marginLeft='2%' fontWeight='bold'>Đánh giá và nhận xét</Text>
                        <Text marginLeft='2%' marginTop='2%' fontSize={13}>
                            <Rating
                                type='star'
                                ratingCount={5}
                                imageSize={16}
                                startingValue={productDetail.rating ? productDetail.rating : 0}
                            /> {productDetail.rating ? productDetail.rating : 0}/5 ({productDetail.countRate ? productDetail.countRate : 0} đánh giá)</Text>
                        <FlatList
                            data={dataComment.listData}
                            renderItem={({ item }) => (
                                <View style={{
                                    flexDirection: "row", height: 80, marginTop: '2%', shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                }}>
                                    <View width="20%" height="100%" alignItems='center'>
                                        <Image source={{ uri: `data:image/jpeg;base64,${item.user.avatarHashCode}` }} borderRadius={50} alt="image base" resizeMode="cover" width='80%' height='80%' />
                                    </View>
                                    <View width="60%" left="10%" height="100%">
                                        <Text style={{ fontWeight: 'bold' }}>{item.user.userName}</Text>
                                        <Text>
                                            <Rating
                                                type='star'
                                                ratingCount={5}
                                                imageSize={16}
                                                startingValue={item.ratting ? item.ratting : 0}
                                            />
                                        </Text>
                                        <Text>{item.content}</Text>
                                        <Text style={{ fontWeight: '400', fontSize: 12 }}>{moment(item.createDate).format("DD-MM-YYYY hh:mm")}</Text>
                                    </View>
                                </View>
                            )}
                            keyExtractor={item => item.id.toString()}
                        />
                    </View>

                    <View style={{ marginTop: '2%', backgroundColor: '#fff' }}>
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
                        <Button borderColor='#f8f8ff' borderRadius={0} size="sm" onPress={() => { payment() }} width='33%'>
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

