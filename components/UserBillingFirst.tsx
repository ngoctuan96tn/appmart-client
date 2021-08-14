import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Box, FlatList, Image, View, Text, Button } from 'native-base';
import * as React from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
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
        }

    }, [retrieve, userLogin]);

    if (!retrieve) {
        return (
            <Box bg="#f5f5f5">
                <FlatList
                    data={dataProduct.listData}
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
                    keyExtractor={(item) => item.billId}
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

function handlePayment(note: any, dataCart: any, userLogin: any, token: any, navigation: any) {
    const productArr: IProductBill[] = [];
    dataCart.forEach(function (data: any) {
        const productBill: IProductBill = {
            productId: data.product.id,
            quantity: data.quantity,
            price: data.product.price,
            amount: data.product.price * data.quantity,

        };
        productArr.push(productBill);
    });

    const bill: IBilling = {
        userId: userLogin.id,
        buildingId: 1,
        note: note,
        productList: productArr,
    };
    console.log(bill);

    fetch(ApiCommon.rootUrl + '/api/order-payment', {
        method: 'post',
        body: JSON.stringify(bill),
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    }).then((response) => response.json())
        .then((responseJson) => {

            const orderCode = responseJson.listData[0].orderCode;
            console.log(orderCode);
            if (responseJson.code == 1) {
                AsyncStorage.removeItem('paymentNote');
                CartProvider.clearCart();

                Toast.show('Đặt hàng thành công!', {
                    duration: Toast.durations.LONG,
                    position: 0,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    backgroundColor: '#ffffff',
                    textColor: '#000000',

                });
                navigation.navigate('OrderPaymentSuccess', { orderCode: orderCode });
            } else {
                Toast.show('Đặt hàng thất bại. Vui lòng thử lại!', {
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
}


export interface IBilling {
    userId: number;
    buildingId: number;
    note: string;
    productList: IProductBill[]
}

export interface IProductBill {
    productId: number;
    quantity: number,
    price: number,
    amount: number;
}