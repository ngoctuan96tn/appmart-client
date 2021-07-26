import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {
    Input,
    Heading,
    NativeBaseProvider,
    Button,
    Select,
} from "native-base"
import ApiCommon from '../constants/ApiCommon';

export default function RegisterApartment(route: any) {
    const userName = route.route.params.userName;
    const email = route.route.params.email;
    const phone = route.route.params.phone;
    const password = route.route.params.password;
    const avatarImg = route.route.params.avatarImg
    const photo = {
        uri: avatarImg,
        type: 'image/jpeg',
        name: userName + 'photo.jpg',
    };
    const [show, setShow] = React.useState(false)

    const handleClick = () => setShow(!show)
    const [itemRoomValue, setItemRoomValue] = React.useState('');
    const [itemFloorValue, setItemFloorValue] = React.useState('');
    const [itemBuildingValue, setItemBuildingValue] = React.useState('');
    return (
        <SafeAreaView style={styles.container}>
            <NativeBaseProvider>
                <Heading size="md" textAlign='center' color='#fff' marginTop={20} fontSize={20}>ĐĂNG KÝ CĂN HỘ</Heading>
                {/* <Input
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
                /> */}
                <Select width={300} marginBottom={5} placeholder="Tòa nhà" backgroundColor='#f0f9ff'
                    onValueChange={(itemBuildingValue) => {
                        setItemBuildingValue(itemBuildingValue)
                    }}>
                    <Select.Item label="JavaScript" value="1" />
                    <Select.Item label="TypeScript" value="2" />
                </Select>
                <Select marginBottom={5} placeholder="Tầng" backgroundColor='#f0f9ff'
                    onValueChange={(itemFloorValue) => {
                        setItemFloorValue(itemFloorValue)
                    }}>
                    <Select.Item label="JavaScript" value="1" />
                    <Select.Item label="TypeScript" value="2" />
                </Select>
                <Select placeholder='Căn hộ' marginBottom='10' backgroundColor='#f0f9ff'
                    onValueChange={(itemRoomValue) => {
                        setItemRoomValue(itemRoomValue)
                    }}>
                    <Select.Item label="JavaScript" value="1" />
                    <Select.Item label="TypeScript" value="2" />
                </Select>
                <Button size="md" backgroundColor='#6CDDED' onPress={() => onSave(photo, email, userName, phone, password, itemBuildingValue, itemFloorValue, itemRoomValue)}>Cập nhật</Button>
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

function onSave(photo: any, email: any, userName: any, phone: any, password: any, itemBuildingValue: any, itemFloorValue: any, itemRoomValue: any) {

    const data = new FormData();
    data.append('avatarImg', photo);
    data.append('email', email);
    data.append('userName', userName);
    data.append('phone', phone);
    data.append('password', password);
    data.append('roomId', itemRoomValue);
    data.append('floorId', itemFloorValue);
    data.append('buildingId', itemBuildingValue);

    fetch(ApiCommon.rootUrl + '/api/register', {
        method: 'post',
        body: data,
        headers: {
            'Content-Type': 'multipart/form-data; ',
        },
    }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            if (responseJson.code == 1) {
                console.log(responseJson.message)
            } else {
                console.log('đăng nhập thất bại')
            }
        })
        .catch((error) => {
            console.log(error)
        });
}
