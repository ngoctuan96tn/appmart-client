import { FontAwesome } from '@expo/vector-icons';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Box, Center, Image, NativeBaseProvider, FlatList, ScrollView } from 'native-base';
import * as React from 'react';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import ApiCommon from '../constants/ApiCommon';

export default function MessageScreen() {
    const navigation = useNavigation();
    const [token, setToken] = useState<string | null>('');
    const { getItem, setItem } = useAsyncStorage('token');
    const [retrieve, setRetrieve] = useState(true);
    const [dataChat, setDataChat] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [userLogin, setUserLogin] = useState<any>({});

    let schedule = setTimeout(() => setLoading(true), 3000);
    React.useEffect(() => {
        const readToken = async () => {
            const item = await getItem();
            setToken(item);
            setRetrieve(false);
        };

        if (retrieve) {
            readToken();
        }
        if (retrieve === false && loading === true) {
            const headers = { 'Authorization': `Bearer ${token}` }
            fetch(ApiCommon.rootUrl + '/api/messages', { headers })
                .then((response) => response.json())
                .then((json) => setDataChat(json))
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));

            fetch(ApiCommon.rootUrl + '/api/user/login', { headers })
                .then((response) => response.json())
                .then((json) => setUserLogin(json))
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
        }

        clearTimeout(schedule);
    }, [retrieve, loading]);
    return (
        <NativeBaseProvider>
            <View style={{ flexDirection: 'row' }}>
                {userLogin.id != 1 &&
                    <View style={{ width: '100%', height: 100, marginLeft: 5, marginTop: 5 }}>
                        <Text> Đang hoạt động</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('Chat', { receiveUserId: 1, receiveUserName: 'admin' }) }}>
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
                                <Text>Admin</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                }

            </View>
            <View style={{ width: '100%' }}>
                <FlatList
                    data={dataChat.listData}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => { navigation.navigate('Chat', { receiveUserId: item.user.id, receiveUserName: item.user.userName }) }}>
                            <View style={{ flexDirection: "row", marginTop: '5%' }}>
                                <View style={{ width: '15%', alignContent: 'center', alignItems: 'center' }}>
                                    <Image source={{ uri: `data:image/jpeg;base64,${item.user.avatarHashCode}` }} alt="image base" resizeMode="cover" width='80%' height={45} rounded="80" />
                                </View>
                                <View style={{ width: '85%' }}>
                                    <Box width='100%' px={2} py={1} rounded="lg" height={55} >
                                        <Text style={{ fontWeight: 'bold' }}>{item.user.userName}</Text>
                                        <Text style={{ fontSize: 12, fontStyle: 'italic' }}>{item.lastContent}</Text>
                                    </Box>
                                </View>

                            </View>
                        </TouchableOpacity>)}
                    keyExtractor={item => item.receiveUserId.toString()}
                />
            </View>
        </NativeBaseProvider>
    );
}