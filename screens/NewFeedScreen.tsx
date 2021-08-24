import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import ApiCommon from '../constants/ApiCommon';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { FlatList, NativeBaseProvider } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function NewFeedScreen() {
    const [data, setData] = useState([]);
    const navigation = useNavigation();
    const [retrieve, setRetrieve] = useState(true);
    const [token, setToken] = useState<string | null>('');
    const { getItem, setItem } = useAsyncStorage('token');
    const [avatarHashCode, setAvatarHashCode] = useState([]);
    useEffect(() => {

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
            fetch(ApiCommon.rootUrl + '/api/user/login', { headers })
                .then((response) => response.json())
                .then((responseJson) => setAvatarHashCode(responseJson.avatarHashCode))


            fetch(ApiCommon.rootUrl + '/api/posts', { headers })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.code == 1) {
                        setData(responseJson.listData);

                    }
                })

        }
    }, [retrieve]);

    return (
        <NativeBaseProvider>
            <View style={styles.container}>

                <ScrollView>
                    <TouchableOpacity style={styles.text}>
                        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                            <Image style={styles.imageStatus} source={{ uri: `data:image/jpeg;base64,${avatarHashCode}` }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('PostArticle', {
                            data: null, flag: false
                        })}>
                            <Text style={styles.postStatus}>Bạn đang nghĩ gì?</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <View style={styles.lineImg} />

                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <SafeAreaView>
                                <View style={styles.profileUserStatus}>
                                    <Image style={styles.image} source={{ uri: `data:image/jpeg;base64,${item.user.avatarHashCode}` }} />

                                    <View style={styles.nameContainer}>
                                        <Text style={styles.nameText}>{item.user.userName}</Text>
                                        <Text style={styles.timeText}>{item.createDate}</Text>
                                    </View>
                                </View>
                                <Text style={styles.captionText}>{item.content}</Text>
                                <FlatList
                                    data={item.mediaList}
                                    renderItem={({ item }) => (
                                        <Image style={styles.feedImage} source={{ uri: `data:image/jpeg;base64,${item.attachBase64}` }} />
                                    )}
                                    keyExtractor={(item) => item.attachId.toString()}
                                />
                                <View style={styles.line} />
                                <View style={styles.buttonGroupContainer}>
                                    <TouchableOpacity style={styles.buttonContainer}>
                                        <Text style={{ fontSize: 12 }}>{item.totalLike ? 'Thích ' + item.totalLike : null} </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonContainer}>
                                        <Text style={{ fontSize: 12 }}>{item.totalComment ? item.totalComment + ' bình luận' : null} </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.line} /><View style={styles.buttonGroupContainer}>
                                    <TouchableOpacity style={styles.buttonContainer} onPress={() => { addReactionLike(item.postId, token), setRetrieve(true) }}>
                                        {(item.isLike) ? (<Text style={styles.buttonTextIsLike}>Thích</Text>) : (<Text style={styles.buttonText}>Thích</Text>)}
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('ListComments', {
                                        postId: item.postId
                                    })}>
                                        <Text style={styles.buttonText}>Bình luận</Text>
                                    </TouchableOpacity>
                                    <View style={styles.lineImg} />
                                </View>
                                <View style={styles.lineImg} />
                            </SafeAreaView>
                        )}
                        keyExtractor={(item) => item.postId.toString()}
                    />
                </ScrollView>

            </View>
        </NativeBaseProvider>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginTop: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    postStatus: {
        marginLeft: 10
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileUserStatus: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#BDBDBD',
    },
    imageStatus: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#BDBDBD',
    },
    nameContainer: {
        marginLeft: 10,
    },
    nameText: {
        fontWeight: 'bold'
    },
    timeText: {
        color: '#BDBDBD',
    },
    captionText: {
        marginTop: 10,
    },
    buttonGroupContainer: {
        height: 50,
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000000'
    },
    buttonTextIsLike: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#00BBF7',
    },
    line: {
        height: 0.5,
        backgroundColor: '#BDBDBD',
        marginTop: 10
    },
    feedImage: {
        height: 300,
        marginTop: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    lineImg: {
        height: 6,
        backgroundColor: '#AFBCBE',
        marginTop: 10
    },
})

export function addReactionLike(id: number, token: any) {
    const headers = { 'Authorization': `Bearer ${token}` }
    fetch(ApiCommon.rootUrl + `/api/posts/like/${id}`, { headers })
}