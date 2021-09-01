import { Feather } from "@expo/vector-icons";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Box, NativeBaseProvider, Image, Input } from "native-base";
import React, { useState, useRef } from "react";
import { Button, FlatList, ScrollView, Text } from "react-native";
import { View } from "../components/Themed";
import ApiCommon from "../constants/ApiCommon";
import { TabOneParamList } from "../types";

export function Chat(route: any) {
    const params = route.route.params.data.route.params;

    const navigation = useNavigation();
    const [token, setToken] = useState<string | null>('');
    const { getItem, setItem } = useAsyncStorage('token');
    const [retrieve, setRetrieve] = useState(true);
    const [dataChat, setDataChat] = useState<any>([]);
    const [userLogin, setUserLogin] = useState<any>({});
    const [content, setContent] = useState('');
    const scrollViewRef = useRef();
      
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
            fetch(ApiCommon.rootUrl + `/api/messages/${params.receiveUserId}`, { headers })
                .then((response) => response.json())
                .then((json) => setDataChat(json))
                .catch((error) => console.error(error));

            fetch(ApiCommon.rootUrl + '/api/user/login', { headers })
                .then((response) => response.json())
                .then((json) => setUserLogin(json))
                .catch((error) => console.error(error));
        }

    }, [retrieve, content]);

   
    const sendMessage = () => {
        fetch(ApiCommon.rootUrl + '/api/message', {
            method: 'post',
            body: JSON.stringify({
                content: content,
                receiveUserId: params.receiveUserId
            }),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.code == 1) {
                  setContent('')
                } 
            })
            .catch((error) => {
                console.log(error)
            });
    }
    return (
        <NativeBaseProvider>
            <View style={{ height: '100%' }}>
                <ScrollView
                    ref={scrollViewRef}
                    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                >
                    <FlatList
                        data={dataChat.listData}
                        renderItem={({ item }) => (
                            <View style={{ marginTop: '1%' }}>
                                {item.sendUserId == userLogin.id ?
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>

                                        <Box px={2} py={1} m={1} rounded="lg" height={35} bg='#ff8c00' borderRadius={10}>
                                            <Text style={{ fontSize: 12, fontStyle: 'italic', textAlign: 'right' }}>{item.content}</Text>
                                        </Box>
                                    </View>
                                    :
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                        <Box px={2} py={1} m={1} rounded="lg" height={35} bg='#0ea5e9' borderRadius={10} >
                                            <Text style={{ fontSize: 12, fontStyle: 'italic', textAlign: 'left' }}>{item.content}</Text>
                                        </Box>
                                    </View>
                                }

                            </View>
                        )}
                        keyExtractor={item => item.id.toString()}
                    />
                    <View style={{height:65}}></View>
                </ScrollView>
                <View style={{ position: 'absolute', bottom: 0, flexDirection: "row", flexWrap: "wrap", width: '100%', height: 65 }}>
                            
                    <Input
                        variant="rounded"
                        placeholder="Nhập tin nhắn..."
                        m={1}
                        w='80%'
                        value={content}
                        _light={{
                            placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                            placeholderTextColor: "blueGray.50",
                        }}
                        onChangeText={(content) => {setContent(content)}}
                    />
                    <Feather name='send' size={30} style={{width:'15%', paddingLeft:'3%', paddingTop:'3%'}} onPress={() => {sendMessage()}}/>

                </View>
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
    const params = data.data.route.params;
    const name = params.receiveUserName;
    return (
        <TabOneStack.Navigator>
            <TabOneStack.Screen
                name="TabOneScreen"
                component={Chat}
                options={{ headerTitle: `${name}`, headerTitleAlign: 'center' }}
                initialParams={data}
            />
        </TabOneStack.Navigator>
    );
}