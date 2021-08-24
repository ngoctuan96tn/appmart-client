import * as React from 'react';
import { NativeBaseProvider, Text, View, Image, TextArea, Button } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import { TabOneParamList } from '../types';
import { SafeAreaView } from 'react-native';
import NumberFormat from 'react-number-format';
import { Rating, AirbnbRating } from 'react-native-ratings';
import ApiCommon from '../constants/ApiCommon';
import Toast from 'react-native-root-toast';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';


export function ProductRatting(route: any) {
    const item = route.route.params.data.route.params.item;
    const [note, setNote] = React.useState('');
    const [rate, setRate] = React.useState(0);

    const [token, setToken] = React.useState<string | null>('');
    const { getItem, setItem } = useAsyncStorage('token');
    const [retrieve, setRetrieve] = React.useState(true);

    const ratingCompleted = (rating: any) => {
        setRate(rating);
    }
    React.useEffect(() => {
        const readToken = async () => {
            const item = await getItem();
            setToken(item);
            setRetrieve(false);
        };

        if (retrieve) {
            readToken();
        }

    }, [retrieve]);

    const rattingProduct = () => {
        // gọi api đánh giá sản phẩm
        fetch(ApiCommon.rootUrl + '/api/product/ratting', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                productId: item.productId,
                ratting: rate,
                content: note
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.code == 1) {
                    setNote('');
                    setRate(0);
                    Toast.show('Gửi đánh giá thành công!', {
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
    return (
        <NativeBaseProvider>
            <SafeAreaView>
                <View style={{ flexDirection: "row", height: 120, backgroundColor: '#ffffff', marginTop: 5 }}>
                    <View width="30%" height="100%">
                        <Image source={{ uri: `data:image/jpeg;base64,${item.productImageBase64}` }} alt="image base" resizeMode="cover" height='100%' />
                    </View>
                    <View width="60%" left="10%" height="100%">
                        <Text>{item.productName}</Text>
                        <Text>Số lượng: {item.quantity}</Text>
                        <Text>
                            <NumberFormat
                                value={item.amount}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'đ'}
                                renderText={formattedValue => <Text style={{ fontWeight: 'bold', color: "#33c37d", fontSize: 20 }}>{formattedValue}</Text>} // <--- Don't forget this!
                            />
                        </Text>
                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                            <Image source={require('../assets/images/MiMartLogoGradientApp.png')} alt="image base" resizeMode="cover" width={6} height={6} />
                            <Text style={{ marginLeft: '3%', marginTop: '2%' }} width='45%'>MiMart</Text>
                        </View>
                    </View>
                </View>
                <View width='100%' height='100%' style={{ backgroundColor: '#ffffff', marginTop: 5, paddingTop: 20 }}>
                    <Rating
                        startingValue={rate}
                        onFinishRating={ratingCompleted}
                        style={{ paddingVertical: 10 }}
                    />
                    <TextArea marginX={5} marginY={10} placeholder="Mô tả đánh giá của bạn với sản phẩm này..." value={note} onChangeText={(note) => { setNote(note) }} />
                </View>
            </SafeAreaView>
            <View paddingLeft={4} paddingRight={4} paddingTop={2} style={{ position: 'absolute', bottom: 1, flexDirection: "row", flexWrap: "wrap", width: '100%', height: 100 }}>
                <Button onPress={() => rattingProduct()} width="100%" marginTop="5%">Gửi đánh giá</Button>
            </View>
        </NativeBaseProvider>
    );

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
                component={ProductRatting}
                options={{ headerTitle: "ĐÁNH GIÁ SẢN PHẨM", headerTitleAlign: 'center' }}
                initialParams={data}
            />
        </TabOneStack.Navigator>
    );
}

