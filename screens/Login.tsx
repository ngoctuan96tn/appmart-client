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
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-root-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [passWord, setPassWord] = useState('');
  const [show, setShow] = React.useState(false)

  const handleClick = () => setShow(!show)
  
  const { getItem, setItem } = useAsyncStorage('token');

  React.useEffect(() => {
    // AsyncStorage.clear();
    const readToken = async () => {
      const item = await getItem();
      console.log(item);
      if (item != null && item != '' && item != undefined) {
        navigation.reset({ index: 0, routes: [{ name: 'Main', params: {index: 1} }]});
      }
    };
    readToken();

  }, []);
  const navigation = useNavigation();
  return (
    <NativeBaseProvider >
      <View style={styles.container}>
        <Heading size="md" textAlign='center' marginTop='20%' fontWeight='400' color='#fff' marginBottom='20%'>ĐĂNG NHẬP</Heading>
        <Input
          width={'90%'}
          marginTop={'10%'}
          size="sm"
          marginBottom={'5%'}
          paddingLeft={'1%'}
          variant="underlined"
          placeholder="Số điện thoại"
          onChangeText={email => setEmail(email)}
          _light={{
            placeholderTextColor: "#fff",
          }}
          _dark={{
            placeholderTextColor: "#fff",
          }}
        />
        <Input
          width={'90%'}
          paddingLeft={'1%'}
          variant="underlined"
          size="sm"
          fontSize= "13"
          marginBottom={'5%'}
          type={show ? "text" : "password"}
          onChangeText={passWord => setPassWord(passWord)}
          InputRightElement={
            <Icon name="eye" size={20} color='#fff' style={{ marginRight: '5%' }} onPress={handleClick} />
          }
          placeholder="Mật khẩu"
          _light={{
            placeholderTextColor: "#fff",
          }}
          _dark={{
            placeholderTextColor: "#fff",
          }}
        />

        <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}><Text style={{ color: '#f0f9ff', fontSize: 13, marginLeft: '60%' }}>Quên mật khẩu</Text></TouchableOpacity>
        <Button width={'80%'} marginBottom='5%' marginTop='5%' backgroundColor='#fff' borderRadius={25} onPress={() => onLogin(email, passWord, navigation)}><Text style={{ color: '#4EC8F2', fontSize: 12 }}>ĐĂNG NHẬP</Text></Button>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ textAlign: 'center', fontSize: 13 }}>Chưa có tài khoản?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register', {
            data: null
          })}>
            <Text style={{ color: '#f0f9ff', marginLeft: '6%', fontSize: 13 }}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ textAlign: 'center', marginTop: '10%', color: '#fff', fontSize: 12 }}> HOẶC ĐĂNG NHẬP BẰNG </Text>
        <Button marginTop='10%' width={'80%'} backgroundColor='#fff' borderRadius={25} onPress={() => console.log()}><Text style={{ color: '#4EC8F2', fontSize: 12 }}>SỐ ĐIỆN THOẠI</Text></Button>
        <Button marginTop='5%' width={'80%'} backgroundColor="#1F67C9" borderRadius={25} onPress={() => console.log()}><Text style={{ fontSize: 12, color: '#fff' }}>FACEBOOK</Text></Button>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#4EC8F2'
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
  } 
  // else if (!re.test(String(email).toLowerCase())) {
  //   Alert.alert(
  //     '',
  //     'Email không đúng định dạng!',
  //   );
  //   return
  // }
   else {
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
          // navigation.navigate('Main', { index: 1 });
          navigation.reset({ index: 0, routes: [{ name: 'Main', params: {index: 1} }]});
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
