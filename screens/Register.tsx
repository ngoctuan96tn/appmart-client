import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {
  Input,
  Heading,
  NativeBaseProvider,
  Button,
} from "native-base"
import { useNavigation } from '@react-navigation/native';

export default function Register() {
  const [show, setShow] = React.useState(false)

  const handleClick = () => setShow(!show)

  const [showConfirm, setShowConfirm] = React.useState(false)

  const handleClickConfirm = () => setShowConfirm(!showConfirm)
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <NativeBaseProvider>
        <Heading size="md" textAlign='center' marginTop={20} fontSize={20} color='#fff'>ĐĂNG KÝ</Heading>
        <Button size="md" marginTop='20' marginBottom='5' backgroundColor='#6CDDED' onPress={() => navigation.navigate('ImagePickerExample')}>Cập nhật ảnh đại diện</Button>
        <Input
          backgroundColor='#f0f9ff'
          marginBottom={5}
          variant="outline"
          placeholder="Họ tên"
          _light={{
            placeholderTextColor: "blueGray.400",
          }}
          _dark={{
            placeholderTextColor: "blueGray.50",
          }}
        />
        <Input
          marginBottom='5'
          variant="outline"
          backgroundColor='#f0f9ff'
          placeholder="Email"
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
          marginBottom='5'
          variant="outline"
          placeholder="Số điện thoại"
          _light={{
            placeholderTextColor: "blueGray.400",
          }}
          _dark={{
            placeholderTextColor: "blueGray.50",
          }}
        />
        <Input
          size="sm"
          marginBottom='5'
          backgroundColor='#f0f9ff'
          type={show ? "text" : "password"}
          InputRightElement={
            <Button ml={1} roundedLeft={0} roundedRight="md" onPress={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          }
          placeholder="Mật khẩu"
        />
        <Input
          width={'300'}
          backgroundColor='#f0f9ff'
          marginBottom='10'
          size="sm"
          type={show ? "text" : "password"}
          InputRightElement={
            <Button ml={1} roundedLeft={0} roundedRight="md" onPress={handleClickConfirm}>
              {show ? "Hide" : "Show"}
            </Button>
          }
          placeholder="Nhập lại mật khẩu"
        />
        <Button size="md" backgroundColor='#6CDDED' onPress={() => navigation.navigate('RegisterApartment')}>Tiếp theo</Button>
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
