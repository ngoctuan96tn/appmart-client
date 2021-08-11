import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { Box, TextArea, View } from 'native-base';
import * as React from 'react';
import { useState } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import NumberFormat from 'react-number-format';
import ApiCommon from '../constants/ApiCommon';

export default function PaymentTabFirst() {
    const [token, setToken] = useState<string | null>('');
    const [userLogin, setUserLogin] = useState<any>({});
    const { getItem, setItem } = useAsyncStorage('token');
    const [retrieve, setRetrieve] = useState(true);
    const [loading, setLoading] = useState(true);
    const [dataCart, setDataCart] = useState<any>({});
    const [totalAmount, setTotalAmount] = useState<any>({});

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
                setDataCart(cartfood )
        
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

        if (retrieve) {
            readToken();
            getCart();
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
                <View p={4} m={4} height={120} bg="#fff" borderRadius={5} marginTop={4}>
                    <Text style={{ fontWeight: 'bold', bottom: 2 }}>Địa chỉ nhận hàng</Text>
                    <Text style={{ fontWeight: 'bold' }}>{userLogin.userName}</Text>
                    <Text>{userLogin.roomName} - {userLogin.floorName} - {userLogin.buildingName}</Text>
                    <Text>{userLogin.phone}</Text>
                </View>
                <View p={2} m={4} height={120} bg="#fff" marginTop="5%" borderRadius={5}>
                    <TextArea h='100%' placeholder="Lưu ý (ví dụ: Địa chỉ nhận hàng khác)" onChangeText={(note) => {AsyncStorage.setItem('paymentNote', note)}}/>
                    
                </View>
                <View style={{ flexDirection: 'row' }} p={2} m={4} height={35} bg="#fff" marginTop="5%" borderRadius={5}>
                    <Text style={{ width: '50%' }}>Phí vận chuyển</Text>
                    <Text style={{ width: '50%', textAlign: 'right', color: '#00bfff', fontWeight: 'bold' }}>Theo nhà cung cấp</Text>
                </View>

                <View paddingLeft={4} paddingRight={4} paddingTop={2} style={{ position: 'absolute', bottom: 1, backgroundColor: '#f8f8ff', flexDirection: "row", flexWrap: "wrap", width: '100%', height: 50 }}>
                    <Text style={{ width: '50%' }}>Tổng tiền thanh toán</Text>
                    <NumberFormat
                        value={totalAmount}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={'đ'}
                        renderText={formattedValue => <Text style={{ width: '50%', textAlign: 'right', color: '#ff0000', fontWeight: 'bold' }}>{formattedValue}</Text>} // <--- Don't forget this!
                    />
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
