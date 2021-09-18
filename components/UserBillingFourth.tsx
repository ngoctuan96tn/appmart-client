import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { View, Text, Box, FlatList, Image } from 'native-base';
import * as React from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
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
                        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: '2%', backgroundColor: '#fff', paddingLeft: '2%', paddingTop:'5%', paddingBottom:'5%' }}>
                            <View style={{ width: '70%' }}>
                                <Text style={{ fontWeight: 'bold',fontSize: 14  }}>Đơn hàng số #{item.orderCode}</Text>
                                <Text style={{ fontWeight: '400', fontSize: 12 }}>Đặt ngày: {moment(item.createdDate).format("DD-MM-YYYY hh:mm")}</Text>
                            </View>
                            <View style={{ width: '27%' }}>
                                <Text style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 14}} >Tổng tiền</Text>
                                <NumberFormat
                                    value={item.totalAmount}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'đ'}
                                    renderText={formattedValue => <Text style={{ textAlign: 'right', fontWeight: '400', color: 'red', fontSize: 12 }}>{formattedValue}</Text>} // <--- Don't forget this!
                                />

                            </View>
                            <View style={styles.line} />
                            <View style={{ width: '99%' }}>
                                <FlatList
                                    data={item.productList}
                                    renderItem={({ item }) => (
                                        <View style={{
                                            flexDirection: "row", height: 100, marginTop: '2%',
                                        }}>
                                            <View width="25%" height="100%">
                                                <Image source={{ uri: `data:image/jpeg;base64,${item.productImageBase64}` }} alt="image base" resizeMode="cover" height='100%' />
                                            </View>
                                            <View width="60%" left="10%" height="100%">
                                                <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{item.productName}</Text>
                                                <Text style={{ fontWeight: '400', fontSize: 12 }}>Số lượng: {item.quantity}</Text>
                                                <Text><NumberFormat
                                                    value={item.amount}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'đ'}
                                                    renderText={formattedValue => <Text style={{ fontWeight: 'bold', color: "red",  fontSize: 12}}>{formattedValue}</Text>} // <--- Don't forget this!
                                                /></Text>
                                                <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop:'13%' }}>
                                                    <Image source={require('../assets/images/MiMartLogoGradientApp.png')} alt="image base" resizeMode="cover" width={6} height={6} />
                                                    <Text style={{ marginLeft: '3%', marginTop: '3%', fontWeight: 'bold', fontSize: 12 }} width='45%'>MiMart</Text>
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

const styles = StyleSheet.create({
    line: {
        height: 0.5,
        backgroundColor: '#BDBDBD',
        marginTop: 10,
        width: '100%'
    },
});