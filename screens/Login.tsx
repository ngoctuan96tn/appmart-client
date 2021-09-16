import React, { useState } from 'react';
import { StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import {
  Input,
  Heading,
  NativeBaseProvider,
  Button,
  Link,
  View
} from "native-base"
import { useNavigation } from '@react-navigation/native';
import ApiCommon from '../constants/ApiCommon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-root-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [passWord, setPassWord] = useState('');
  const [show, setShow] = React.useState(false)

  const handleClick = () => setShow(!show)

  const navigation = useNavigation();
  return (
    <NativeBaseProvider >
      <View style={styles.container}>
        <Heading size="md" textAlign='center' marginTop='20%' fontSize={20} color='#fff'>ĐĂNG NHẬP</Heading>
        <Input
          width={'80%'}
          marginTop={'10%'}
          backgroundColor='#f0f9ff'
          marginBottom={'5%'}
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
          width={'80%'}
          backgroundColor='#f0f9ff'
          marginBottom={'10%'}
          type={show ? "text" : "password"}
          onChangeText={passWord => setPassWord(passWord)}
          InputRightElement={
            <Icon name="eye" size={25} style={{ marginRight: '5%' }} onPress={handleClick} />
          }
          placeholder="Mật khẩu"
        />
        <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}><Text style={{ color: '#f0f9ff', fontSize: 16 }}>Quên mật khẩu</Text></TouchableOpacity>
        <Button width={'80%'} marginBottom='5%' marginTop='5%' backgroundColor='#6CDDED' onPress={() => onLogin(email, passWord, navigation)}>Đăng nhập</Button>
        <View style={{flexDirection:'row', alignItems: 'center'}}>
        <Text style={{ textAlign: 'center', textDecorationLine: 'underline' }}>Chưa có tài khoản?</Text> 
        <TouchableOpacity onPress={() => navigation.navigate('Register', {
          data: null
        })}>
          <Text style={{ color: '#f0f9ff', marginLeft: '6%', fontSize: 16 }}>Đăng ký</Text>
        </TouchableOpacity>
        </View>
        <Text style={{ textAlign: 'center' }}> Hoặc đăng nhập bằng </Text>
        <Button marginTop='10%' width={'80%'} backgroundColor='#c4b5fd' onPress={() => console.log()}>Số điện thoại</Button>
        <Button marginTop='5%' width={'80%'} backgroundColor="#1d4ed8" onPress={() => console.log()}>Facebook</Button>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
  } else if (passWord.length < 5) {
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
          navigation.navigate('Main', {index : 1});
        } else {
          Toast.show('Đăng nhập thất bại. Vui lòng thử lại!', {
            duration: Toast.durations.LONG,
            position: 0,
            shadow: true,
            animation: true,
            hideOnPress: true,
            backgroundColor: '#ffffff',
            textColor: '#ff0000',

        });
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }
}
