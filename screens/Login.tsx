import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, Alert } from 'react-native';
import {
  Input,
  Heading,
  NativeBaseProvider,
  Button,
  Link,
  FormControl
} from "native-base"
import { useNavigation } from '@react-navigation/native';
import ApiCommon from '../constants/ApiCommon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Login() {
  const [email, setEmail] = useState('');
  const [passWord, setPassWord] = useState('');
  const [show, setShow] = React.useState(false)

  const handleClick = () => setShow(!show)

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <NativeBaseProvider >
        <Heading size="md" textAlign='center' marginTop='20' fontSize={20} color='#fff'>ĐĂNG NHẬP</Heading>
        <Input
          width={300}
          size="sm"
          marginTop={20}
          backgroundColor='#f0f9ff'
          marginBottom={5}
          variant="outline"
          placeholder="Email"
          onChangeText={email => setEmail(email)}
          _light={{
            placeholderTextColor: "blueGray.400",
          }}
          _dark={{
            placeholderTextColor: "blueGray.50",
          }}
        />
        <Input
          size="sm"
          backgroundColor='#f0f9ff'
          marginBottom={10}
          type={show ? "text" : "password"}
          onChangeText={passWord => setPassWord(passWord)}
          InputRightElement={
            <Icon name="eye" size={25} style={{ marginRight: 10 }} onPress={handleClick} />
          }
          placeholder="Password"
        />
        <Link onPress={() => navigation.navigate('ForgetPassword')}>Quên mật khẩu</Link>
        <Button size="md" marginBottom='5' marginTop='5' backgroundColor='#6CDDED' onPress={() => onLogin(email, passWord, navigation)}>Đăng nhập</Button>
        <Text style={{ textAlign: 'center', textDecorationLine: 'underline' }}>Chưa có tài khoản? <Link onPress={() => navigation.navigate('Register', {
          data: null
        })}>Đăng ký</Link></Text>
        <Text style={{ textAlign: 'center' }}> Hoặc đăng nhập bằng </Text>
        <Button size="md" marginTop='10' backgroundColor='#c4b5fd' onPress={() => console.log()}>Số điện thoại</Button>
        <Button size="md" marginTop='2' backgroundColor="#1d4ed8" onPress={() => console.log()}>Facebook</Button>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0ea5e9'
  },
});

function onLogin(email: any, passWord: any, navigation: any) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email || !passWord) {
    Alert.alert(
      '',
      'Vui lòng nhập đủ thông tin!',
    );
    return
  } else if (!re.test(String(email).toLowerCase())) {
    Alert.alert(
      '',
      'Email không đúng định dạng!',
    );
    return
  } else {
    fetch(ApiCommon.rootUrl + '/authenticate', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: passWord,
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.code == 1) {
          AsyncStorage.setItem('token', responseJson.listData[0].token)
          navigation.navigate('Main');
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }
}
