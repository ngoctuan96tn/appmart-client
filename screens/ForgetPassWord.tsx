import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {
  Input,
  Heading,
  NativeBaseProvider,
  Button,
} from "native-base"

export default function ForgetPassword() {
  const [show, setShow] = React.useState(false)

  const handleClick = () => setShow(!show)

  const [showConfirm, setShowConfirm] = React.useState(false)

  const handleClickConfirm = () => setShowConfirm(!showConfirm)
  return (
    <SafeAreaView style={styles.container}>
      <NativeBaseProvider >
        <Heading size="md" textAlign='center' marginTop='20' color='#fff' fontSize={20}>QUÊN MẬT KHẨU</Heading>
        <Input
          size="sm"
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
          marginBottom='10'
          width={300}
          size="sm"
          backgroundColor='#f0f9ff'
          type={show ? "text" : "password"}
          InputRightElement={
            <Button ml={1} roundedLeft={0} roundedRight="md" onPress={handleClickConfirm}>
              {show ? "Hide" : "Show"}
            </Button>
          }
          placeholder="Nhập lại mật khẩu"
        />
        <Button size="md" backgroundColor='#6CDDED' onPress={() => console.log()}>Lấy lại mật khẩu</Button>
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
