import { Button, Input, NativeBaseProvider, Radio, VStack, Text, Box, FlatList, ScrollView, Center } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, Image, ActivityIndicator, SafeAreaView } from 'react-native';
import Swiper from 'react-native-swiper';
import { View } from '../components/Themed';
import Animated from 'react-native-reanimated';
import ProductList from '../components/ProductList';
import CategoryList from '../components/CategoryList';
import { StoreList } from '../components/StoreList';
import ProductSuggestList from '../components/ProductSuggestList';
import ApiCommon from '../constants/ApiCommon';
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { TabOneParamList } from '../types';
import ProductCard from '../components/ProductCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

});


export function SearchProduct() {
    const navigation = useNavigation();
    const [isProduct, setProduct] = useState(false);
    const [dataProduct, setDataproduct] = useState([]);
    const [data, setData] = useState<any[]>([]);
    const [name, setName] = useState('');
    const [isLoading, setLoading] = useState(false);
    const componentDidMount = () => {
        AsyncStorage.getItem('cart').then((cart) => {
            if (cart !== null) {
                const cartfood = JSON.parse(cart);
                setData(cartfood);

            } else {
            }
        })
            .catch((err) => {
                alert(err)
            })

    };

    const searchProduct = (name: string) => {
        setLoading(true);
        fetch(ApiCommon.rootUrl + '/api/products/search', {
            method: 'post',
            body: JSON.stringify({ productName: name }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.code == 1) {
                    setDataproduct(responseJson.listData);
                }
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {setLoading(false)});

    }
    useEffect(() => {
        componentDidMount();
        if (data.length > 0) {
            setProduct(true);
        } else {
            setProduct(false);
        }

    }, [isLoading]);

    return (
        <View style={styles.container}>
            <NativeBaseProvider>
                <Animated.View>
                    <View style={{ flexDirection: 'row' }}>
                        <Input
                            placeholder="  T??m ki???m  "
                            variant="filled"
                            bg="white"
                            py={1}
                            px={2}
                            width="85%"
                            borderColor='#ffa500'
                            onChangeText={(name) => { setName(name) }}
                            onSubmitEditing={() => { searchProduct(name) }}
                        />

                        <Button
                            style={{ alignSelf: 'flex-end' }}
                            size="sm"
                            variant="link"
                            onPress={() => navigation.navigate('Cart')}
                        >
                            <Icon name="shopping-cart" size={25} color='#ffa500' />

                            {isProduct === true &&
                                <Center
                                    p={1}
                                    rounded="full"
                                    bg="red.500"
                                    boxSize={1}
                                    position="absolute"
                                    right={0}
                                    m={2}
                                    bottom={2}
                                    left={4}
                                    _text={{
                                        color: "white",
                                        textAlign: "center",
                                        fontWeight: "700",
                                        fontSize: "xs",
                                    }}
                                >
                                </Center>
                            }

                        </Button>

                    </View>
                </Animated.View>

                {dataProduct.length > 0 &&
                    <SafeAreaView style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <FlatList
                            data={dataProduct}
                            renderItem={({ item }) => (
                                <View style={{ marginTop: 3 }}><ProductCard data={item} /></View>
                            )}
                            keyExtractor={item => item.id}
                            numColumns={3}
                        />
                    </SafeAreaView>
                }
                {dataProduct.length == 0 &&
                    <SafeAreaView style={{ alignItems: 'center', justifyContent: 'center', marginTop: '50%' }}>
                        <MaterialCommunityIcons name='text-box-search-outline' size={80} color='#ffa500' />
                        <Text marginTop={2}>Nh???p ????? t??m ki???m s???n ph???m!</Text>
                    </SafeAreaView>
                }

                {isLoading &&
                    <View>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                }
            </NativeBaseProvider>

        </View>
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
                component={SearchProduct}
                options={{ headerTitle: "T??M KI???M S???N PH???M", }}
                initialParams={data}
            />
        </TabOneStack.Navigator>
    );
}
