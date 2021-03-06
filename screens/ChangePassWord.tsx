import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Alert } from 'react-native';
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
                <Heading textAlign='center' marginTop={'20%'} color='#fff' fontSize={20}>THAY ĐỔI MẬT KHẨU</Heading>
                <Input
                    width={'80%'}
                    onChangeText={email => setEmail(email)}
                    backgroundColor='#f0f9ff'
                    marginTop={'10%'}
                    marginBottom={'5%'}
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
                    width={'80%'}
                    onChangeText={passWord => setPassWord(passWord)}
                    backgroundColor='#f0f9ff'
                    marginBottom={'5%'}
                    variant="outline"
                    type={show ? "text" : "password"}
                    placeholder="Mật khẩu cũ"
                    InputRightElement={
                        <Icon name="eye" size={25} style={{ marginRight: '5%' }} onPress={handleClick} />
                    }
                />
                <Input
                    width={'80%'}
                    marginBottom={'5%'}
                    backgroundColor='#f0f9ff'
                    type={showNewPass ? "text" : "password"}
                    onChangeText={newPassWord => setNewPassWord(newPassWord)}
                    InputRightElement={
                        <Icon name="eye" size={25} style={{ marginRight: '5%' }} onPress={handleClickNewPass} />
                    }
                    placeholder="Mật khẩu mới"
                />
                <Input
                    width={'80%'}
                    backgroundColor='#f0f9ff'
                    marginBottom={'10%'}
                    type={showConfirmPass ? "text" : "password"}
                    onChangeText={confirmPassWord => setConfirmPassWord(confirmPassWord)}
                    InputRightElement={
                        <Icon name="eye" size={25} style={{ marginRight: '5%' }} onPress={handleClickConfirm} />
                    }
                    placeholder="Nhập lại mật khẩu mới"
                />
                <Button width={'80%'} backgroundColor='#6CDDED' onPress={() => changePassWord(navigation, email, passWord, newPassWord, token, confirmPassWord)}>Cập nhật mật khẩu</Button>
            </View>
        </NativeBaseProvider>
    );
}

function changePassWord(navigation: any, email: any, passWord: any, newPassWord: any, token: any, confirmPassWord: any) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
    } else if (!re.test(String(email).toLowerCase())) {
        Alert.alert(
            '',
            'Email không đúng định dạng!',
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

