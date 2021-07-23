import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {
  Input,
  Heading,
  NativeBaseProvider,
  Button,
  Link
} from "native-base"

export default function ForgetPassword() {
  const [show, setShow] = React.useState(false)

  const handleClick = () => setShow(!show)

  const [showConfirm, setShowConfirm] = React.useState(false)

  const handleClickConfirm = () => setShowConfirm(!showConfirm)
  return (
    <SafeAreaView>
      <Heading size="md" textAlign='center' marginTop='40' fontSize={20}>QUÊN MẬT KHẨU</Heading>
      <Input
        width='300'
        size="sm"
        marginTop='70'
        marginBottom='10'
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
        width={300}
        height={10}
        size="sm"
        marginLeft={10}
        marginBottom='10'
        type={show ? "text" : "password"}
        InputRightElement={
          <Button ml={1} roundedLeft={0} roundedRight="md" onPress={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        }
        placeholder="Mật khẩu"
      />
      <Input
        width={300}
        height={10}
        size="sm"
        marginLeft={10}
        type={show ? "text" : "password"}
        InputRightElement={
          <Button ml={1} roundedLeft={0} roundedRight="md" onPress={handleClickConfirm}>
            {show ? "Hide" : "Show"}
          </Button>
        }
        placeholder="Nhập lại mật khẩu"
      />
      <Button size="md" marginBottom='5' marginTop='5' backgroundColor='green' onPress={() => console.log()}>Lấy lại mật khẩu</Button>
    </SafeAreaView>
  );
}
