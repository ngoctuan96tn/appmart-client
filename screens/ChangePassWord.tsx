import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Alert } from 'react-native';
import {
    Input,
    Heading,
    NativeBaseProvider,
    Button,
} from "native-base"
import ApiCommon from '../constants/ApiCommon';
import { useNavigation } from '@react-navigation/native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ChangePassword() {
    const [show, setShow] = React.useState(false)
    const [showNewPass, setShowNewPass] = React.useState(false)
    const [showConfirmPass, setShowConfirmPass] = React.useState(false)
    const handleClick = () => setShow(!show)
    const handleClickNewPass = () => setShowNewPass(!showNewPass)
    const handleClickConfirm = () => setShowConfirmPass(!showConfirmPass)

    const [email, setEmail] = useState('');
    const [passWord, setPassWord] = useState('');
    const [newPassWord, setNewPassWord] = useState('');
    const [token, setToken] = useState<string | null>('');
    const { getItem, setItem } = useAsyncStorage('token');
    const [retrieve, setRetrieve] = useState(true);
    const navigation = useNavigation();

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
        }

    }, [retrieve]);

    return (
        <SafeAreaView style={styles.container} >
            <NativeBaseProvider >
                <Heading size="md" textAlign='center' marginTop={20} color='#fff' fontSize={20}>THAY ĐỔI MẬT KHẨU</Heading>
                <Input
                    isRequired
                    size="sm"
                    onChangeText={email => setEmail(email)}
                    backgroundColor='#f0f9ff'
                    marginTop={20}
                    marginBottom={5}
                    variant="outline"
                    placeholder="Email"
                    _light={{
                        placeholderTextColor: "blueGray.400",
                    }}
                    _dark={{
                        placeholderTextColor: "blueGray.50",
                    }}
                />
                <Input
                    size="sm"
                    onChangeText={passWord => setPassWord(passWord)}
                    backgroundColor='#f0f9ff'
                    marginBottom={5}
                    variant="outline"
                    type={show ? "text" : "password"}
                    placeholder="Mật khẩu cũ"
                    InputRightElement={
                        <Icon name="eye" size={25} style={{ marginRight: 10 }} onPress={handleClick} />
                    }
                />
                <Input
                    size="sm"
                    marginBottom={5}
                    backgroundColor='#f0f9ff'
                    type={showNewPass ? "text" : "password"}
                    onChangeText={newPassWord => setNewPassWord(newPassWord)}
                    InputRightElement={
                        <Icon name="eye" size={25} style={{ marginRight: 10 }} onPress={handleClickNewPass} />
                    }
                    placeholder="Mật khẩu mới"
                />
                <Input
                    width={300}
                    backgroundColor='#f0f9ff'
                    marginBottom={10}
                    size="sm"
                    type={showConfirmPass ? "text" : "password"}
                    InputRightElement={
                        <Icon name="eye" size={25} style={{ marginRight: 10 }} onPress={handleClickConfirm} />
                    }
                    placeholder="Nhập lại mật khẩu mới"
                />
                <Button size="md" backgroundColor='#6CDDED' onPress={() => changePassWord(navigation, email, passWord, newPassWord, token)}>Cập nhật mật khẩu</Button>
            </NativeBaseProvider>
        </SafeAreaView>
    );
}

function changePassWord(navigation: any, email: any, passWord: any, newPassWord: any, token: any) {
    fetch(ApiCommon.rootUrl + '/api/user/change', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            email: email,
            password: passWord,
            newPassword: newPassWord
        }),
    }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            if (responseJson.code == 1) {
                Alert.alert(
                    'Thông báo',
                    'Thay đổi mật khẩu thành công. Bạn có muốn quay trở lại màn hình đăng nhập?',
                    [
                        {
                            text: 'Yes',
                            onPress: () => navigation.navigate('Login')
                        },
                        {
                            text: 'No',
                        },
                    ],
                    { cancelable: false },
                );
            } else {
                Alert.alert(
                    'Thông báo',
                    responseJson.message,
                );
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0ea5e9'
    },
});

