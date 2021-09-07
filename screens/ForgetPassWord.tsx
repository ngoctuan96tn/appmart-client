import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import {
  Input,
  Heading,
  NativeBaseProvider,
  Button,
  View
} from "native-base"
import ApiCommon from '../constants/ApiCommon';
import { useNavigation } from '@react-navigation/native';

export default function ForgetPassword() {
  const [phone, setPhone] = useState('');
  const navigation = useNavigation();
  return (
    <NativeBaseProvider >
      <View style={styles.container}>
        <Heading textAlign='center' marginTop={'20%'} color='#fff' fontSize={20}>QUÊN MẬT KHẨU</Heading>
        <Input
          width={'80%'}
          onChangeText={phone => setPhone(phone)}
          keyboardType='numeric'
          backgroundColor='#f0f9ff'
          marginTop={'10%'}
          marginBottom={'5%'}
          variant="outline"
          placeholder="Nhập số điện thoại"
          _light={{
            placeholderTextColor: "blueGray.400",
          }}
          _dark={{
            placeholderTextColor: "blueGray.50",
          }}
        />
        <Button width={'80%'} backgroundColor='#6CDDED' onPress={() => getPassWord(phone, navigation)}>Lấy lại mật khẩu</Button>
      </View>
    </NativeBaseProvider>
  );
}

function getPassWord(phone: string, navigation: any) {
  if (!phone) {
    Alert.alert(
      '',
      'Số điện thoại không được để trống!',
    );
  } else {
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0ea5e9'
  },
});
