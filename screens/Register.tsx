import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {
  Input,
  Heading,
  NativeBaseProvider,
  Button,
} from "native-base"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Register(route: any) {
  const avatarImg = route.route.params.data;
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const [showConfirm, setShowConfirm] = React.useState(false)
  const handleClickConfirm = () => setShowConfirm(!showConfirm)
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [passWord, setPassWord] = useState('');
  const [confirmPassWord, setConfirmPassWord] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <NativeBaseProvider>
        <Heading size="md" textAlign='center' marginTop={20} fontSize={20} color='#fff'>ĐĂNG KÝ</Heading>
        <MaterialCommunityIcons name="camera" color='#fff' size={40} style={{ marginBottom: 10 }} onPress={() => navigation.navigate('ImagePickerExample')} />
        <Input
          backgroundColor='#f0f9ff'
          marginBottom={5}
          variant="outline"
          placeholder="Họ tên"
          onChangeText={userName => setUserName(userName)}
          _light={{
            placeholderTextColor: "blueGray.400",
          }}
          _dark={{
            placeholderTextColor: "blueGray.50",
          }}
        />
        <Input
          marginBottom={5}
          variant="outline"
          backgroundColor='#f0f9ff'
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
          keyboardType='numeric'
          backgroundColor='#f0f9ff'
          marginBottom={5}
          variant="outline"
          placeholder="Số điện thoại"
          onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
          _light={{
            placeholderTextColor: "blueGray.400",
          }}
          _dark={{
            placeholderTextColor: "blueGray.50",
          }}
        />
        <Input
          size="sm"
          marginBottom={5}
          backgroundColor='#f0f9ff'
          type={show ? "text" : "password"}
          onChangeText={passWord => setPassWord(passWord)}
          InputRightElement={
            <Icon name="eye" size={25} style={{ marginRight: 10 }} onPress={handleClick} />
          }
          placeholder="Mật khẩu"
        />
        <Input
          width={300}
          backgroundColor='#f0f9ff'
          marginBottom={10}
          size="sm"
          type={showConfirm ? "text" : "password"}
          onChangeText={confirmPassWord => setConfirmPassWord(confirmPassWord)}
          InputRightElement={
            <Icon name="eye" size={25} style={{ marginRight: 10 }} onPress={handleClickConfirm} />
          }
          placeholder="Nhập lại mật khẩu"
        />
        <Button size="md" backgroundColor='#6CDDED' onPress={() => navigation.navigate('RegisterApartment', {
          userName: userName,
          email: email,
          phone: phoneNumber,
          password: passWord,
          avatarImg: avatarImg,
          confirmPassword: confirmPassWord,
        })}>Tiếp theo</Button>
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
