import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import ApiCommon from '../constants/ApiCommon';
export default function NewFeedScreen() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const navigation = useNavigation();
    const imageUrl = 'https://tbsila.cdn.turner.com/toonla/images/cnapac/content/2015/link/ben-10-up-to-speed/au/b10_uptospeed---266x266.jpg'

    useEffect(() => {
        if (isLoading) {
            fetch(ApiCommon.rootUrl + '/api/posts')
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.code == 1) {
                        setData(responseJson.listData);
                        setLoading(false)
                    }
                })
        }
    });

    return (
        <View style={styles.container}>
            <ScrollView>
                <TouchableOpacity style={styles.text} onPress={() => navigation.navigate('PostArticle', {
                    data: null, flag: false
                })}>
                    <Text>Bạn đang nghĩ gì?</Text>
                </TouchableOpacity>
                <View style={styles.profileContainer}>
                    <Image style={styles.image} source={{ uri: imageUrl }} />

                    <View style={styles.nameContainer}>
                        <Text style={styles.nameText}>Nguyễn Văn Lương</Text>
                        <Text style={styles.timeText}>Just now</Text>
                    </View>
                </View>

                {data.map((item: any) => (
                    <><Text style={styles.captionText}>{item.content}</Text>{item.mediaList.map((image: any) => (<Image style={styles.feedImage} source={{ uri: `data:image/jpeg;base64,${image.attachBase64}` }} />))}<View style={styles.line} /><View style={styles.buttonGroupContainer}>
                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Thích</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Bình luận</Text>
                        </TouchableOpacity>
                    </View></>
                ))}
            </ScrollView>
        </View>
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
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#BDBDBD'
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
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 14
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
        marginLeft: 10,
        marginBottom: 20
    }
})