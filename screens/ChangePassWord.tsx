import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Alert, Text } from 'react-native';
import {
    Input,
    Heading,
    NativeBaseProvider,
    Button,
    View
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
    const [confirmPassWord, setConfirmPassWord] = useState('');
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
        <NativeBaseProvider >
            <View style={styles.container}>
                <Heading size='md' textAlign='center' marginTop={'30%'} fontWeight='400' color='#fff' marginBottom='10%'>THAY ĐỔI MẬT KHẨU</Heading>
                <Input
                    width={'90%'}
                    marginTop={'10%'}
                    size='sm'
                    onChangeText={email => setEmail(email)}
                    marginBottom={'5%'}
                    variant="underlined"
                    placeholder="Số điện thoại"
                    paddingLeft={'1%'}
                    _light={{
                        placeholderTextColor: "#fff",
                    }}
                    _dark={{
                        placeholderTextColor: "#fff",
                    }}
                />
                <Input
                    width={'90%'}
                    onChangeText={passWord => setPassWord(passWord)}
                    marginBottom={'5%'}
                    size='sm'
                    variant="underlined"
                    paddingLeft={'1%'}
                    type={show ? "text" : "password"}
                    placeholder="Mật khẩu cũ"
                    InputRightElement={
                        <Icon name="eye" size={20} color='#fff' style={{ marginRight: '5%' }} onPress={handleClick} />
                    }
                    _light={{
                        placeholderTextColor: "#fff",
                    }}
                    _dark={{
                        placeholderTextColor: "#fff",
                    }}
                />
                <Input
                    width={'90%'}
                    marginBottom={'5%'}
                    variant="underlined"
                    size='sm'
                    paddingLeft={'1%'}
                    type={showNewPass ? "text" : "password"}
                    onChangeText={newPassWord => setNewPassWord(newPassWord)}
                    InputRightElement={
                        <Icon name="eye" size={20} color='#fff' style={{ marginRight: '5%' }} onPress={handleClickNewPass} />
                    }
                    placeholder="Mật khẩu mới"
                    _light={{
                        placeholderTextColor: "#fff",
                    }}
                    _dark={{
                        placeholderTextColor: "#fff",
                    }}
                />
                <Input
                    width={'90%'}
                    marginBottom={'10%'}
                    variant="underlined"
                    size='sm'
                    paddingLeft={'1%'}
                    type={showConfirmPass ? "text" : "password"}
                    onChangeText={confirmPassWord => setConfirmPassWord(confirmPassWord)}
                    InputRightElement={
                        <Icon name="eye" size={20} color='#fff' style={{ marginRight: '5%' }} onPress={handleClickConfirm} />
                    }
                    placeholder="Nhập lại mật khẩu mới"
                    _light={{
                        placeholderTextColor: "#fff",
                    }}
                    _dark={{
                        placeholderTextColor: "#fff",
                    }}
                />
                <Button width={'60%'} backgroundColor='#fff' borderRadius={25} onPress={() => changePassWord(navigation, email, passWord, newPassWord, token, confirmPassWord)}><Text style={{ color: '#4EC8F2', fontSize: 12 }}>CẬP NHẬT LẠI MẬT KHẨU</Text></Button>
            </View>
        </NativeBaseProvider>
    );
}

function changePassWord(navigation: any, email: any, passWord: any, newPassWord: any, token: any, confirmPassWord: any) {
    // const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (newPassWord != confirmPassWord) {
        Alert.alert(
            '',
            'Mật khẩu xác nhận không trùng khớp!',
        );
        //reload screen
    } else if (newPassWord.length < 5) {
        Alert.alert(
            '',
            'Mật khẩu tối thiểu 5 ký tự!',
        );
        return
    } else if (!email || !passWord || !newPassWord) {
        Alert.alert(
            '',
            'Vui lòng nhập đủ thông tin!',
        );
        return
    } else if (passWord == newPassWord) {
        Alert.alert(
            '',
            'Mật khẩu trùng với mật khẩu cũ!',
        );
        return
    } else {
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
                if (responseJson.code == 1) {
                    Alert.alert(
                        '',
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
                        '',
                        responseJson.message,
                    );
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#0ea5e9'
    },
});

