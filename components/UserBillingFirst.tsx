import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { Box, FlatList, Image, View, Text, Button } from 'native-base';
import * as React from 'react';
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Toast from 'react-native-root-toast';
import NumberFormat from 'react-number-format';
import ApiCommon from '../constants/ApiCommon';
import CartProvider, { ILineItem } from './CartProvider';

export default function UserBillingFirst() {
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

            fetch(ApiCommon.rootUrl + `/api/new-order/${userLogin.id}`, { headers })
                .then((response) => response.json())
                .then((json) => setDataproduct(json))
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
        }

    }, [retrieve, userLogin]);

    if (!loading) {
        return (
            <Box bg="#f5f5f5" >
                <FlatList
                    data={dataProduct.listData}
                    ListHeaderComponent={() => (!(dataProduct.listData !== undefined && dataProduct.listData.length > 0) ?
                        <SafeAreaView style={{ alignItems: 'center', justifyContent: 'center', marginTop: '50%' }}>
                            <MaterialCommunityIcons name='cart-arrow-down' size={80} color='#ffa500' />
                            <Text marginTop={2}>Hiện chưa có đơn hàng!</Text>
                        </SafeAreaView>
                        : null)}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: '2%', backgroundColor: '#fff', paddingLeft: '2%', paddingTop: '5%', paddingBottom: '5%' }}>
                            <View style={{ width: '70%' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 14 }} >Đơn hàng số #{item.orderCode}</Text>
                                <Text style={{ fontWeight: '400', fontSize: 12 }} >Đặt ngày: {moment(item.createdDate).format("DD-MM-YYYY hh:mm")}</Text>
                            </View>
                            <View style={{ width: '27%' }}>
                                <Text style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 14 }} >Tổng tiền</Text>
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
                                            flexDirection: "row", height: 100, marginTop: '2%'
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
                                                    renderText={formattedValue => <Text style={{ fontWeight: 'bold', color: "red", fontSize: 12 }}>{formattedValue}</Text>} // <--- Don't forget this!
                                                /></Text>
                                                <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: '13%' }}>
                                                    <Image source={require('../assets/images/MiMartLogoGradientApp.png')} alt="image base" resizeMode="cover" width={6} height={6} />
                                                    <Text style={{ marginLeft: '3%', marginTop: '3%', fontWeight: 'bold', fontSize: 12 }} width='45%'>MiMart</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                    keyExtractor={(item) => item.productId}
                                />
                            </View>

                            <View style={{ width: '97%', alignItems: 'flex-end' }}>
                                <Button
                                    size="xs"
                                    colorScheme="danger"
                                    bottom={1}
                                    _text={{
                                        color: "white",
                                    }}
                                    onPress={() => handleCancel(item.billId, userLogin.id, item.orderCode)}
                                >
                                    Hủy đơn
                                </Button>
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

function handleCancel(billId: any, userId: any, orderCode: any) {
    Alert.alert(
        "Hủy đơn hàng",
        `Bạn có chắc chắn muốn hủy đơn hàng ${orderCode} ?`,
        [
            // The "Yes" button
            {
                text: "Có",
                onPress: async () => {

                    // gọi api hủy đơn
                    fetch(ApiCommon.rootUrl + '/api/cancel-order', {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            billId: billId,
                            userId: userId,
                        }),
                    }).then((response) => response.json())
                        .then((responseJson) => {
                            if (responseJson.code == 1) {
                                Toast.show('Bạn đã hủy đơn hàng thành công!', {
                                    duration: Toast.durations.LONG,
                                    position: 0,
                                    shadow: true,
                                    animation: true,
                                    hideOnPress: true,
                                    backgroundColor: '#ffffff',
                                    textColor: '#ff0000',

                                });
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                        });
                    //END gọi api hủy đơn

                },
            },
            // The "No" button
            // Does nothing but dismiss the dialog when tapped
            {
                text: "Không",
            },
        ]
    );


}
const styles = StyleSheet.create({
    line: {
        height: 0.5,
        backgroundColor: '#BDBDBD',
        marginTop: 10,
        width: '100%'
    },
});