import { Feather } from "@expo/vector-icons";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Box, NativeBaseProvider, Image, Input, KeyboardAvoidingView } from "native-base";
import React, { useState, useRef } from "react";
import { ActivityIndicator, Button, FlatList, Platform, ScrollView, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, TextInput } from "react-native";
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
    const [userReceive, setUserReceive] = useState<any>({});
    const [content, setContent] = useState('');
    const scrollViewRef = useRef();
    const [loading, setLoading] = useState(true);
    const [reLoading, setReLoading] = useState(false);

    let schedule = setTimeout(() => setReLoading(true), 3000);

    React.useEffect(() => {
        const readToken = async () => {
            const item = await getItem();
            setToken(item);
            setRetrieve(false);
        };

        if (retrieve) {
            readToken();
        }
        if (retrieve === false && reLoading == false) {
            const headers = { 'Authorization': `Bearer ${token}` }
            fetch(ApiCommon.rootUrl + `/api/messages/${params.receiveUserId}`, { headers })
                .then((response) => response.json())
                .then((json) => setDataChat(json))
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));;

            fetch(ApiCommon.rootUrl + '/api/user/login', { headers })
                .then((response) => response.json())
                .then((json) => setUserLogin(json))
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));;

            fetch(ApiCommon.rootUrl + `/api/user/${params.receiveUserId}`)
                .then((response) => response.json())
                .then((json) => setUserReceive(json))
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
        }

        if (reLoading == true) {
            const headers = { 'Authorization': `Bearer ${token}` }
            fetch(ApiCommon.rootUrl + `/api/messages/${params.receiveUserId}`, { headers })
                .then((response) => response.json())
                .then((json) => setDataChat(json))
                .catch((error) => console.error(error))
                .finally(() => setReLoading(false));
        }

        clearTimeout(schedule);

    }, [retrieve, content, reLoading]);


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
    if (!loading) {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
            <NativeBaseProvider>
                <View style={{ height: '100%', padding: '3%' }}>
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
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                            <Image
                                                size={35}
                                                resizeMode={"contain"}
                                                borderRadius={100}
                                                source={{
                                                    uri: `data:image/jpeg;base64,${userReceive.avatarHashCode}`,
                                                }}
                                                alt="user image"
                                            />
                                            <Box px={2} py={1} m={1} rounded="lg" height={35} bg='#0ea5e9' borderRadius={10} >
                                                <Text style={{ fontSize: 12, fontStyle: 'italic', textAlign: 'left' }}>{item.content}</Text>
                                            </Box>
                                        </View>
                                    }

                                </View>
                            )}
                            keyExtractor={item => item.id.toString()}
                        />
                        <View style={{ height: 65 }}></View>
                    </ScrollView>

                </View>
                <View style={{ position: 'absolute', bottom: 5, flexDirection: "row", width: '100%', height: 50, backgroundColor: '#f5f5f5' }}>

                <TextInput
                   style={{width:'80%', margin: 2, marginLeft:5, backgroundColor:'white', borderRadius:50}}
                   onChangeText={(content) => { setContent(content) }}
                   value={content}
                    placeholder="Nhập tin nhắn..."
                />
                    {/* <Input
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
                        onChangeText={(content) => { setContent(content) }}
                    /> */}
                    <Feather name='send' size={30} style={{ width: '15%', paddingLeft: '3%', paddingTop: '3%' }} onPress={() => { sendMessage() }} />

                </View>
            </NativeBaseProvider>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }
    else {
        return (
            <View>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
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


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: '5%'
    },
  });