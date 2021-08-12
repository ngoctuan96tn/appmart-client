import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Box, FlatList, Image, View, Text, Button } from 'native-base';
import * as React from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import Toast from 'react-native-root-toast';
import NumberFormat from 'react-number-format';
import ApiCommon from '../constants/ApiCommon';
import { ILineItem } from './CartProvider';

export default function PaymentTabThird() {
    const [token, setToken] = React.useState<string | null>('');
    const [userLogin, setUserLogin] = React.useState<any>({});
    const { getItem, setItem } = useAsyncStorage('token');
    const [retrieve, setRetrieve] = React.useState(true);
    const [loading, setLoading] = React.useState(true);
    const [dataCart, setDataCart] = React.useState<any>({});
    const [totalAmount, setTotalAmount] = React.useState<any>({});
    const [note, setNote] = React.useState<string | null>('');
    
    const navigation = useNavigation();
    React.useEffect(() => {
        const readToken = async () => {
            const item = await getItem();
            setToken(item);
            setRetrieve(false);
        };

        const getCart = () => {
            AsyncStorage.getItem('cart').then((cart) => {
                if (cart !== null) {
                    // We have data!!
                    const cartfood = JSON.parse(cart)
                    setDataCart(cartfood)

                    //tính tổng tiền giỏ hàng
                    let sum = 0;
                    cartfood?.forEach(
                        (item: { quantity: number; product: { price: number; }; }) =>
                            (sum += item.quantity * item.product.price));
                    setTotalAmount(sum)
                } else {
                    console.log('1')
                }
            })
                .catch((err) => {
                    alert(err)
                })

        }

        const getNote = () => {
            AsyncStorage.getItem('paymentNote').then((note) => {
                if (note !== null) {
                    setNote(JSON.stringify(note));
                } else {
                    setNote("");
                }
            });
        }

        if (retrieve) {
            readToken();
            getCart();
            getNote();
        }
        if (retrieve === false) {
            const headers = { 'Authorization': `Bearer ${token}` }
            fetch(ApiCommon.rootUrl + '/api/user/login', { headers })
                .then((response) => response.json())
                .then((json) => setUserLogin(json))
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
        }

    }, [retrieve]);
    if (!loading) {
        return (
            <Box flex={1} bg="#f5f5f5">
                <ScrollView>
                    <View p={4} height={120} bg="#fff" borderRadius={5} marginTop={4}>
                        <Text style={{ fontWeight: 'bold', bottom: 2 }}>Địa chỉ nhận hàng</Text>
                        <Text style={{ fontWeight: 'bold' }}>{userLogin.userName}</Text>
                        <Text>{userLogin.roomName} - {userLogin.floorName} - {userLogin.buildingName}</Text>
                        <Text>{userLogin.phone}</Text>
                    </View>

                    <View p={4} height={120} bg="#fff" borderRadius={5}>
                        <Text style={{ fontWeight: 'bold', bottom: 2 }}>Phương thức thanh toán</Text>
                        <Text>Thanh toán khi nhận hàng</Text>
                    </View>

                    <View p={4} bg="#fff" borderRadius={5} width="100%">
                        <Text style={{ fontWeight: 'bold', bottom: 2 }}>Sản phẩm</Text>

                        <FlatList
                            data={dataCart}
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
                                        <Image source={{ uri: `data:image/jpeg;base64,${item.product.image}` }} alt="image base" resizeMode="cover" height='100%' />
                                    </View>
                                    <View width="55%" left="10%" height="100%">
                                        <Text>{item.product.name}</Text>
                                        <Text>{item.quantity}</Text>
                                        <Text><NumberFormat
                                            value={item.product.price * item.quantity}
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
                            keyExtractor={(item) => item.id}
                        />

                    </View>
                    <View style={{ height: 100 }}></View>
                </ScrollView>



                <View paddingLeft={4} paddingRight={4} paddingTop={2} style={{ position: 'absolute', bottom: 1, backgroundColor: '#f8f8ff', flexDirection: "row", flexWrap: "wrap", width: '100%', height: 100 }}>
                    <Text style={{ width: '50%' }}>Tổng tiền thanh toán</Text>
                    <NumberFormat
                        value={totalAmount}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={'đ'}
                        renderText={formattedValue => <Text style={{ width: '50%', textAlign: 'right', color: '#ff0000', fontWeight: 'bold' }}>{formattedValue}</Text>} // <--- Don't forget this!
                    />
                    <Button onPress={() => handlePayment(note, dataCart, userLogin, token, navigation)} width="100%" marginTop="5%">ĐẶT HÀNG</Button>
                </View>
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
            console.log(responseJson);
            if (responseJson.code == 1) {
                AsyncStorage.removeItem('paymentNote');
                AsyncStorage.removeItem('cart');

                Toast.show('Đặt hàng thành công!', {
                    duration: Toast.durations.LONG,
                    position: 0,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    backgroundColor: '#ffffff',
                    textColor: '#000000',
    
                });
                navigation.navigate('Main');
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