import React, { useState } from 'react';
import { Text, StyleSheet, Alert } from 'react-native';
import {
  Input,
  Heading,
  NativeBaseProvider,
  Button,
  View
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
    <NativeBaseProvider>
      <View style={styles.container}>
        <Heading size="md" textAlign='center' marginTop={'20%'} color='#fff' fontWeight='400' marginBottom='10%'>ĐĂNG KÝ</Heading>
        <MaterialCommunityIcons name="camera" color='#fff' size={40} style={{ marginBottom: '5%', marginTop: '10%' }} onPress={() => navigation.navigate('ImagePickerExample')} />
        <Input
          width={'90%'}
          marginBottom={'5%'}
          paddingLeft={'1%'}
          size="sm"
          variant="underlined"
          placeholder="Họ tên"
          onChangeText={userName => setUserName(userName)}
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
          paddingLeft={'1%'}
          variant="underlined"
          size="sm"
          placeholder="Email"
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
          keyboardType='numeric'
          paddingLeft={'1%'}
          size="sm"
          marginBottom={'5%'}
          variant="underlined"
          placeholder="Số điện thoại"
          onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
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
          paddingLeft={'1%'}
          variant="underlined"
          size="sm"
          type={show ? "text" : "password"}
          onChangeText={passWord => setPassWord(passWord)}
          InputRightElement={
            <Icon name="eye" size={20} color='#fff' style={{ marginRight: '5%' }} onPress={handleClick} />
          }
          _light={{
            placeholderTextColor: "#fff",
          }}
          _dark={{
            placeholderTextColor: "#fff",
          }}
          placeholder="Mật khẩu"
        />
        <Input
          width={'90%'}
          paddingLeft={'1%'}
          variant="underlined"
          marginBottom={'10%'}
          size="sm"
          type={showConfirm ? "text" : "password"}
          onChangeText={confirmPassWord => setConfirmPassWord(confirmPassWord)}
          InputRightElement={
            <Icon name="eye" size={20} color='#fff' style={{ marginRight: '5%' }} onPress={handleClickConfirm} />
          }
          _light={{
            placeholderTextColor: "#fff",
          }}
          _dark={{
            placeholderTextColor: "#fff",
          }}
          placeholder="Nhập lại mật khẩu"
        />
        <Button width={'80%'} backgroundColor='#fff' borderRadius={25} onPress={() => validateRegister(navigation,
          userName,
          email,
          phoneNumber,
          passWord,
          avatarImg,
          confirmPassWord,
        )}><Text style={{ color: '#4EC8F2', fontSize: 12 }}>Tiếp theo</Text></Button>
      </View>
    </NativeBaseProvider>
  );
}

export function validateRegister(navigation: any, userName: any, email: any, phoneNumber: any, passWord: any, avatarImg: any, confirmPassWord: any) {
  const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!userName || !email || !phoneNumber || !passWord) {
    Alert.alert(
      '',
      'Vui lòng nhập đủ thông tin!',
    );
    return
  } else if (passWord.length < 5) {
    Alert.alert(
      '',
      'Mật khẩu xác tối thiểu 5 ký tự!',
    );
    return
  } else if (passWord != confirmPassWord) {
    Alert.alert(
      '',
      'Mật khẩu xác nhận không trùng khớp!',
    );
    return
  } else if (!vnf_regex.test(phoneNumber)) {
    Alert.alert(
      '',
      'Số điện thoại không đúng định dạng!',
    );
    return
  } else if (!re.test(String(email).toLowerCase())) {
    Alert.alert(
      '',
      'Email không đúng định dạng!',
    );
    return
  } else {
    navigation.navigate('RegisterApartment', {
      userName: userName,
      email: email,
      phone: phoneNumber,
      password: passWord,
      avatarImg: avatarImg,
      confirmPassword: confirmPassWord,
    }
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#4EC8F2'
  },
});
