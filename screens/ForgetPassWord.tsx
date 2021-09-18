import React, { useState } from 'react';
import { StyleSheet, Alert, Text } from 'react-native';
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
        <Heading size="md" textAlign='center' marginTop='30%' fontWeight='400' color='#fff' marginBottom='20%'>QUÊN MẬT KHẨU</Heading>
        <Input
          width={'90%'}
          onChangeText={phone => setPhone(phone)}
          keyboardType='numeric'
          paddingLeft={'1%'}
          size= 'sm'
          marginTop={'10%'}
          marginBottom={'10%'}
          variant="underlined"
          placeholder="Nhập số điện thoại"
          _light={{
            placeholderTextColor: "#fff",
          }}
          _dark={{
            placeholderTextColor: "#fff",
          }}
        />
        <Button width={'50%'} backgroundColor='#fff' borderRadius={25} onPress={() => getPassWord(phone, navigation)}><Text style={{ color: '#4EC8F2', fontSize: 12 }}>LẤY LẠI MẬT KHẨU</Text></Button>
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
    backgroundColor: '#4EC8F2'
  },
});
