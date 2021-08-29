import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Center, Image, NativeBaseProvider } from 'native-base';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';

export default function MessageScreen() {
    const navigation = useNavigation();
    return (
        <NativeBaseProvider>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ width: '100%', height: 100, marginLeft: 5, marginTop: 5 }}>
                    <Text> Đang hoạt động</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('Chat') }}>
                        <View style={{ width: '15%', alignContent: 'center', alignItems: 'center', marginLeft: 5, marginTop: 5 }}>

                            <Image source={require('../assets/images/MiMartLogoGradientApp.png')} alt="image base" resizeMode="cover" width='80%' height={45} rounded="80" />
                            <Center
                                p={1}
                                rounded="full"
                                bg='#adff2f'
                                boxSize={3}
                                position="absolute"
                                right={0}
                                top={7}
                                left={9}
                                _text={{
                                    color: "white",
                                    textAlign: "center",
                                    fontWeight: "700",
                                    fontSize: "xs",
                                }}
                            >

                            </Center>
                            <Text> MiMart</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </NativeBaseProvider>
    );
}