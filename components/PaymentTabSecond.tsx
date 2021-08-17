import { Entypo, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Box, Button, Radio, TextArea, View } from 'native-base';
import * as React from 'react';
import { useState } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import NumberFormat from 'react-number-format';
import ApiCommon from '../constants/ApiCommon';

export default function PaymentTabSecond(data: any) {
    const [retrieve, setRetrieve] = useState(true);
    const [loading, setLoading] = useState(true);
    const [dataCart, setDataCart] = useState<any>({});
    const [totalAmount, setTotalAmount] = useState<any>({});
    const navigation = useNavigation();

    React.useEffect(() => {
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
                    setTotalAmount(sum);
                    setRetrieve(false);
                } else {
                    console.log('1')
                }
            })
                .catch((err) => {
                    alert(err)
                })

        }

        if (retrieve) {
            getCart();
        }

    }, [retrieve]);
    if (!retrieve) {
        return (
            <Box flex={1} bg="#f5f5f5">
                <View p={4} height={200} bg="#fff" borderRadius={5} marginTop={4}>
                    <Text style={{ fontWeight: 'bold', bottom: 2 }}>Phương thức thanh toán</Text>
                    <Radio.Group
                        name="paymentMethodRadio"
                        value="1"
                        onChange={(nextValue) => {
                            console.log(nextValue)
                        }}
                    >
                        <Radio value="1" my={1}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ width: '50%', marginLeft: 5 }}>Thanh toán khi nhận hàng</Text>
                                <Text style={{ width: '50%', textAlign: 'center', }}><MaterialCommunityIcons name="cash-multiple" color="#00bfff" size={20} /></Text>
                            </View>
                        </Radio>
                        <Radio value="2" my={1} isDisabled={true}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ width: '50%', marginLeft: 5 }}>Thẻ tín dụng/Ghi nợ</Text>
                                <Text style={{ width: '50%', textAlign: 'center', color: '#00bfff', fontWeight: 'bold' }}><FontAwesome name="cc-visa" color="#00bfff" size={20} /></Text>
                            </View>
                        </Radio>
                        <Radio value="3" my={1} isDisabled={true}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ width: '50%', marginLeft: 5 }}>Ví điện tử</Text>
                                <Text style={{ width: '50%', textAlign: 'center', color: '#00bfff', fontWeight: 'bold' }}><Entypo name="wallet" color="#00bfff" size={20} /></Text>
                            </View>
                        </Radio>
                    </Radio.Group>
                </View>
                <View paddingLeft={4} paddingRight={4} paddingTop={2} style={{ position: 'absolute', bottom: 1, backgroundColor: '#f8f8ff', flexDirection: "row", flexWrap: "wrap", width: '100%', height: 100 }}>
                    <Text style={{ width: '50%' }}>Tổng tiền thanh toán</Text>
                    <NumberFormat
                        value={totalAmount}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={'đ'}
                        renderText={formattedValue => <Text style={{ width: '50%', textAlign: 'right', color: '#ff0000', fontWeight: 'bold' }}>{formattedValue}</Text>} // <--- Don't forget this!
                    />
                    <Button onPress={() => navigation.push('OrderPayment',{ index: 2, note: data.data.note })} width="100%" marginTop="5%">Xác nhận</Button>
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