import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Box, FlatList, Image } from 'native-base';
import * as React from 'react';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import NumberFormat from 'react-number-format';
import ApiCommon from '../constants/ApiCommon';


export default function UserBillingFourth() {
    const [token, setToken] = React.useState<string | null>('');
    const [userLogin, setUserLogin] = React.useState<any>({});
    const { getItem, setItem } = useAsyncStorage('token');
    const [retrieve, setRetrieve] = React.useState(true);
    const [loading, setLoading] = React.useState(true);
    const [dataProduct, setDataproduct] = React.useState<any>([]);


    const navigation = useNavigation();
    React.useEffect(() => {
        const readToken = async () => {
            const item = await getItem();
            setToken(item);
            setRetrieve(false);
        };

        if (retrieve) {
            readToken();
        }
        if (retrieve === false) {
            const headers = { 'Authorization': `Bearer ${token}` }
            fetch(ApiCommon.rootUrl + '/api/user/login', { headers })
                .then((response) => response.json())
                .then((json) => setUserLogin(json))
                .catch((error) => console.error(error))

            fetch(ApiCommon.rootUrl + `/api/cancel-order/${userLogin.id}`, { headers })
                .then((response) => response.json())
                .then((json) => setDataproduct(json))
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
        }

    }, [retrieve, userLogin]);

    if (!loading) {
        return (
            <Box bg="#f5f5f5">
                <FlatList
                    data={dataProduct.listData}
                    ListHeaderComponent={() => (!(dataProduct.listData !== undefined && dataProduct.listData.length > 0) ?
                        <SafeAreaView style={{ alignItems: 'center', justifyContent: 'center', marginTop: '50%' }}>
                            <MaterialCommunityIcons name='cart-arrow-down' size={80} color='#ffa500' />
                            <Text marginTop={2}>Hiện chưa có đơn hàng!</Text>
                        </SafeAreaView>
                        : null)}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: '5%', backgroundColor: '#fff', paddingLeft: '2%' }}>
                            <View style={{ width: '70%' }}>
                                <Text style={{ fontWeight: 'bold' }} >Đơn hàng số #{item.orderCode}</Text>
                                <Text >Đặt ngày: {item.createdDate}</Text>
                            </View>
                            <View style={{ width: '29%' }}>
                                <Text style={{ textAlign: 'right', fontWeight: 'bold', }} >Tổng tiền</Text>
                                <NumberFormat
                                    value={item.totalAmount}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'đ'}
                                    renderText={formattedValue => <Text style={{ textAlign: 'right', fontWeight: 'bold', color: 'red' }}>{formattedValue}</Text>} // <--- Don't forget this!
                                />

                            </View>

                            <View style={{ width: '99%' }}>
                                <FlatList
                                    data={item.productList}
                                    renderItem={({ item }) => (
                                        <View style={{
                                            flexDirection: "row", height: 100, marginTop: '2%', shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 2,
                                            },
                                            shadowOpacity: 0.25,
                                            shadowRadius: 3.84,
                                        }}>
                                            <View width="30%" height="100%">
                                                <Image source={{ uri: `data:image/jpeg;base64,${item.productImageBase64}` }} alt="image base" resizeMode="cover" height='100%' />
                                            </View>
                                            <View width="55%" left="10%" height="100%">
                                                <Text>{item.productName}</Text>
                                                <Text>Số lượng: {item.quantity}</Text>
                                                <Text><NumberFormat
                                                    value={item.amount}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'đ'}
                                                    renderText={formattedValue => <Text style={{ fontWeight: 'bold', color: "#33c37d", fontSize: 20 }}>{formattedValue}</Text>} // <--- Don't forget this!
                                                /></Text>
                                                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                                    <Image source={require('../assets/images/MiMartLogoGradientApp.png')} alt="image base" resizeMode="cover" width={6} height={6} />
                                                    <Text style={{ marginLeft: '3%', marginTop: '3%' }} width='45%'>MiMart</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                    keyExtractor={(item) => item.productId}
                                />
                            </View>
                        </View>
                    )}
                    keyExtractor={(item) => item.billId.toString()}
                />
            </Box>
        );
    } else {
        return (
            <View>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
}
