import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Alert } from 'react-native';
import {
  Input,
  Heading,
  NativeBaseProvider,
  Button,
} from "native-base"
import ApiCommon from '../constants/ApiCommon';
import { useNavigation } from '@react-navigation/native';

export default function ForgetPassword() {
  const [phone, setPhone] = useState('');
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <NativeBaseProvider >
        <Heading size="md" textAlign='center' marginTop='20' color='#fff' fontSize={20}>QUÊN MẬT KHẨU</Heading>
        <Input
          size="sm"
          onChangeText={phone => setPhone(phone)}
          keyboardType='numeric'
          backgroundColor='#f0f9ff'
          marginTop='20'
          marginBottom='5'
          variant="outline"
          placeholder="Nhập số điện thoại"
          _light={{
            placeholderTextColor: "blueGray.400",
          }}
          _dark={{
            placeholderTextColor: "blueGray.50",
          }}
        />
        <Button size="md" backgroundColor='#6CDDED' onPress={() => getPassWord(phone, navigation)}>Lấy lại mật khẩu</Button>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}

function getPassWord(phone: string, navigation: any) {
  fetch(ApiCommon.rootUrl + '/api/user/reset', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phone: phone,
    }),
  }).then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.code == 1) {
        navigation.navigate('Login');
        Alert.alert(
          responseJson.message,
        );
      } else {
        Alert.alert(
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
