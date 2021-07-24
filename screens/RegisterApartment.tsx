import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {
    Input,
    Heading,
    NativeBaseProvider,
    Button,
    Select,
    CheckIcon,
} from "native-base"

export default function RegisterApartment() {
    const [show, setShow] = React.useState(false)

    const handleClick = () => setShow(!show)
    return (
        <SafeAreaView style={styles.container}>
            <NativeBaseProvider>
                <Heading size="md" textAlign='center' color='#fff' marginTop={20} fontSize={20}>ĐĂNG KÝ CĂN HỘ</Heading>
                <Input
                    backgroundColor='#f0f9ff'
                    width={300}
                    marginTop={20}
                    marginBottom='5'
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
                    backgroundColor='#f0f9ff'
                    size="sm"
                    marginBottom='5'
                    type={show ? "text" : "password"}
                    InputRightElement={
                        <Button ml={1} roundedLeft={0} roundedRight="md" onPress={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    }
                    placeholder="Mật khẩu"
                />
                <Input
                    backgroundColor='#f0f9ff'
                    keyboardType='numeric'
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
                <Select marginBottom={5} placeholder="Tòa nhà" backgroundColor='#f0f9ff'>
                    <Select.Item label="JavaScript" value="js" />
                    <Select.Item label="TypeScript" value="ts" />
                </Select>
                <Select marginBottom={5} placeholder="Tầng" backgroundColor='#f0f9ff'>
                    <Select.Item label="JavaScript" value="js" />
                    <Select.Item label="TypeScript" value="ts" />
                </Select>
                <Select placeholder='Căn hộ' marginBottom='10' backgroundColor='#f0f9ff'>
                    <Select.Item label="JavaScript" value="js" />
                    <Select.Item label="TypeScript" value="ts" />
                </Select>
                <Button size="md" backgroundColor='#6CDDED' onPress={() => onSave()}>Cập nhật</Button>
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

function onSave() {
    
}
