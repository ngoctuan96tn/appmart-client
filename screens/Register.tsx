import React from 'react';
import { SafeAreaView } from 'react-native';
import {
  Input,
  Heading,
  NativeBaseProvider,
  Button,
} from "native-base"

export default function Register() {
  const [show, setShow] = React.useState(false)

  const handleClick = () => setShow(!show)

  const [showConfirm, setShowConfirm] = React.useState(false)

  const handleClickConfirm = () => setShowConfirm(!showConfirm)
  return (
    <SafeAreaView>
      <NativeBaseProvider>
        <Heading size="md" textAlign='center' marginTop='40' fontSize={20}>ĐĂNG KÝ</Heading>
        <Input
          width={300}
          height={10}
          marginTop={50}
          marginBottom={10}
          marginLeft={10}
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
          width={300}
          height={10}
          marginBottom='10'
          marginLeft={10}
          variant="outline"
          placeholder="Email"
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
          marginBottom='10'
          marginLeft={10}
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
      </NativeBaseProvider>
    </SafeAreaView>
  );
}
