import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, NativeBaseProvider, View } from 'native-base';
import { ControlledPropUpdatedSelectedItem } from 'native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types';
import * as React from 'react';
import { Text } from 'react-native';
import { TabOneParamList } from '../types';

export function OrderPaymentSuccess(route: any) {
    const params = route.route.params.data.route.params;
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View alignItems='center' >
                <Entypo name='check' size={40} color='#fff' style={{ backgroundColor: '#008000', borderWidth: 1, borderRadius: 70, width: 70, height: 70, textAlign: 'center', paddingTop: 15 }} />
            </View>
            <Text style={{ fontWeight: 'bold', marginTop: '2%' }}>Cảm ơn bạn đã mua hàng</Text>
            <Text>Mã đơn hàng của bản là <Text style={{ fontWeight: 'bold' }}>{params.orderCode}</Text></Text>
            <Text>Bạn có thể theo dõi và quản lý đơn hàng của bạn tại mục</Text>
            <Text>Cá nhân &gt; <Text style={{ color: '#00bfff' }}>Đơn hàng của tôi</Text></Text>


            <View paddingLeft={4} paddingRight={4} paddingTop={2} style={{ position: 'absolute', bottom: 1, flexDirection: "row", flexWrap: "wrap", width: '100%', height: 100 }}>
                <Button
                    width="100%"
                    size="lg"
                    variant="solid"
                    colorScheme="secondary"
                    onPress={() => navigation.navigate('Main')}
                >
                    Tiếp tục mua sắm
                </Button>
            </View>
        </View>

    );
}


export default (data: any) => {
    return (
        <NativeBaseProvider>
            <TabOneNavigator data={data}/>
        </NativeBaseProvider>
    )
}

const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator(data: any) {
    return (
        <TabOneStack.Navigator>
            <TabOneStack.Screen
                name="TabOneScreen"
                component={OrderPaymentSuccess}
                options={{ headerTitle: "ĐẶT HÀNG THÀNH CÔNG", headerLeft: null, gestureEnabled: false, headerTitleAlign:'center'}}
                initialParams={data}
            />
        </TabOneStack.Navigator>
    );
}