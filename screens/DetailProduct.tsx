import React, { useEffect, useState } from "react"
import { Center, NativeBaseProvider, Text, Box, FlatList, ScrollView, Image, Button } from "native-base"
import { SafeAreaView, View } from "react-native"
import ApiCommon from "../constants/ApiCommon";
import { createStackNavigator } from "@react-navigation/stack";
import { TabOneParamList } from "../types";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import ProductSuggestList from "../components/ProductSuggestList";
import { Rating, AirbnbRating } from 'react-native-ratings';
import Animated from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
export function DetailProduct() {

    const [dataProduct, setDataproduct] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            fetch(ApiCommon.rootUrl + '/api/products/popular')
                .then((response) => response.json())
                .then((json) => setDataproduct(json))
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
        }
    });

    return (
        <SafeAreaView>
            <ScrollView>
                <Image source={{ uri: "https://sample-example.nativebase.io/static/media/dawki-river.ebbf5434.png" }} alt="image base" resizeMode="cover" height={350} roundedTop="md" />
                <Text style={{ textAlign: 'center', fontWeight: 'bold', top: 5 }}>100 gram Thịt lợn</Text>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', top: 5, color: 'red' }}>20000 đồng</Text>

                <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: '5%', marginLeft: '4%' }}>
                    <Image source={require('../assets/images/MiMartLogoGradientApp.png')} alt="image base" resizeMode="cover" width='12%' height={45} roundedTop="md" />
                    <Text style={{ marginLeft: '1%', marginTop: '3%' }} width='50%'>MiMart</Text>
                    <Button borderColor='#e27741' size="sm" variant="outline" colorScheme="secondary" onPress={() => console.log("hello world")}>
                        Đến cửa hàng
                    </Button>

                </View>
                <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: '5%', backgroundColor: '#fff' }}>
                    <View style={{ width: '50%' }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'red' }} >1669</Text>
                        <Text style={{ textAlign: 'center' }} >Sản phẩm</Text>
                    </View>
                    <View style={{ width: '50%' }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'red' }} >3</Text>
                        <Text style={{ textAlign: 'center' }} >Đánh giá</Text>
                    </View>

                </View>

                <View style={{ marginTop: '5%', backgroundColor: '#fff' }}>
                    <Text fontWeight='bold'>Chi tiết sản phẩm</Text>
                    <Text>#SET_NGUYÊN_LIỆU_NẤU_TRÀ_SỮA_TRÂN_CHÂU tại gia chỉ tốn 15 phút với đầy đủ 3 loại 👏👏👏 SET 25-30ly
                        🍹 Trà sữa Phúc Long 🧝‍♀️
                        🍹Trà sữa Thái Đỏ 🌺
                        🍹 Trà Sữa Thái Xanh 🍀
                        CÔNG THỨC GIA TRUYỀN CHUẨN VỊ Ở QUÁN đảm bảo tiêu chí NHANH-GỌN-NGON HÂN HẠNH PHỤC VỤ chị em với #trà_sữa thơm ngon, đậm vị trà, không pha hoá chất và #trân_châu dai dai, thơm thơm, bùi bùi 🍃🍃🍃
                        Set Nguyên liệu TRÀ SỮA TRÂN CHÂU nấu được 4.5-5 lít trà sữa :
                        👉1 Gói Trà xịn xò
                        👉1 Gói Kem béo
                        👉1 Gói Trân Châu Đen siêu dai
                        👉1 Gói trân châu trắng
                        Bếp gửi kèm CÔNG THỨC GIA TRUYỀN trong mỗi set, đảm bảo chị em sẽ thành công mà không tốn thời gian 🥰🥰🥰
                        HSD: 1 năm kể từ ngày sản xuất.
                        Xuất xứ: Việt Nam
                        Inbox #Bếp ngay để nhận thông tin chi tiết 🌎 hoặc:
                        ☎️ HOTLINE: ‭078 7384685
                        📬 ZALO : 0705882787 (sỉ ib zalo để Bếp hỗ trợ tư vấn kĩ hơn ạ)
                        Hoặc để lại bình luận bên dưới #Bếp sẽ tư vấn ngay.
                        #Trasua #Trasuatranchau #Tranchau #Bepcuame #Milktea #Cooking #trasuathaixanh #trasuathaido #trasuaolong #phuclong #trà_sữa #nguyên_liệu_làm_trà_sữa #hồng_trà #trà_đen #trà_sữa_tự_pha #bột_trà_sữa #nguyên_liệu_trà_sữa #trà_sữa_đài_loan #trà_sữa_thái #set_làm_trà_sữa #trà_phúc_long #trà_thái_xanh #trà_cozy #trà_đen_phúc_long #phúc_long #set_trà_thái #hồng_trà_sữa #nguyên_liệu_nấu_trà_sữa</Text>
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
                    <ProductSuggestList data={dataProduct} />
                </View>

                <View style={{ height:20 }}></View>
            </ScrollView>
            <View style={{ flex: 1 }}>
                <View style={{ position: 'absolute', bottom: 0, backgroundColor: '#f8f8ff', flexDirection: "row", flexWrap: "wrap", justifyContent: 'center', width: '100%', height:50 }}>
                    <Button borderColor='#f8f8ff' borderRadius={0} size="sm" variant="outline" onPress={() => console.log("hello world")} width='33%'>
                        <MaterialCommunityIcons name="message-processing-outline" color='#008000' size={22} />
                    </Button>
                    <View style={{ height: '100%', width: 1, backgroundColor: '#909090', }}></View>
                    <Button borderColor='#f8f8ff' borderRadius={0} size="sm" variant="outline" onPress={() => console.log("hello world")} width='33%'>
                        <FontAwesome name='cart-plus' color='#0ea5e9' size={22}/>
                    </Button>
                    <View style={{ height: '100%', width: 1, backgroundColor: '#909090', }}></View>
                    <Button borderColor='#f8f8ff' borderRadius={0} size="sm" onPress={() => console.log("hello world")} width='33%'>
                        Thanh toán
                    </Button>
                </View>
            </View>
        </SafeAreaView>

    )
}

export default () => {
    return (
        <NativeBaseProvider>
            <TabOneNavigator />
        </NativeBaseProvider>
    )
}


const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
    return (
        <TabOneStack.Navigator>
            <TabOneStack.Screen
                name="TabOneScreen"
                component={DetailProduct}
                options={{ headerTitle: "CHI TIẾT SẢN PHẨM" }}
            />
        </TabOneStack.Navigator>
    );
}

