import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {
    Input,
    Heading,
    NativeBaseProvider,
    Button,
    Select,
    Icon,
} from "native-base"
import ApiCommon from '../constants/ApiCommon';
import RNPickerSelect from 'react-native-picker-select';

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
    const [show, setShow] = useState(false)

    const handleClick = () => setShow(!show)
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [isLoadFloors, setIsLoadFloors] = useState(false);
    const [idBuilding, setIdBuilding] = useState(Number);
    const [floors, setFloors] = useState<any[]>([]);
    const [isLoadRoom, setIsLoadRoom] = useState(false);
    const [rooms, setRooms] = useState<any[]>([]);
    const [idFloor, setIdFloor] = useState(Number);
    const [idRoom, setIdRoom] = useState(Number);

    useEffect(() => {
        if (isLoading) {
            fetch(ApiCommon.rootUrl + '/api/buildings')
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.code == 1) {
                        console.log(responseJson.listData)
                        setData(responseJson.listData)
                        setLoading(false)
                    }
                })
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
        }

        if (isLoadFloors) {
            fetch(ApiCommon.rootUrl + `/api/buildings/${idBuilding}/floors`)
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.code == 1) {
                        setFloors(responseJson.listData)
                        setIsLoadFloors(false)
                    }
                })
                .catch((error) => console.error(error))
                .finally(() => setIsLoadFloors(false));
        }
        if (isLoadRoom) {
            fetch(ApiCommon.rootUrl + `/api/floors/${idFloor}/rooms`)
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.code == 1) {
                        setRooms(responseJson.listData)
                        setIsLoadRoom(false)
                    }
                })
                .catch((error) => console.error(error))
                .finally(() => setIsLoadRoom(false));
        }
    });

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
                {/* <Select width={300} marginBottom={5} placeholder="Tòa nhà" backgroundColor='#f0f9ff'
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
                </Select> */}
                <RNPickerSelect
                    onValueChange={(value) => [setIsLoadFloors(true), setIdBuilding(value)]}
                    placeholder={{
                        label: 'Chọn tòa nhà',
                        value: null,
                        color: '#fff'
                    }}
                    items={data.map(item => {
                        return {
                            label: item.buildingName,
                            value: item.id
                        };
                    })}
                    style={pickerSelectStyles}
                />

                <RNPickerSelect
                    onValueChange={(value) => [setIsLoadRoom(true), setIdFloor(value)]}
                    placeholder={{
                        label: 'Chọn phòng',
                        value: null,
                        color: '#fff'
                    }}
                    items={floors.map(item => {
                        return {
                            label: item.floorName,
                            value: item.id
                        };
                    })}
                    style={pickerSelectStyles}
                />

                <RNPickerSelect
                    onValueChange={(value) => setIdRoom(value)}
                    placeholder={{
                        label: 'Chọn phòng',
                        value: null,
                        color: '#fff'
                    }}
                    items={rooms.map(item => {
                        return {
                            label: item.roomName,
                            value: item.id
                        };
                    })}
                    style={pickerSelectStyles}
                />
                <Button size="md" backgroundColor='#6CDDED' onPress={() => onSave(photo, email, userName, phone, password, idBuilding, idFloor, idRoom)}>Cập nhật</Button>
            </NativeBaseProvider>
        </SafeAreaView>
    );
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0ea5e9'
    },
});

function onSave(photo: any, email: any, userName: any, phone: any, password: any, idBuilding: any, idFloor: any, idRoom: any) {
    const data = new FormData();
    data.append('avatarImg', photo);
    data.append('email', email);
    data.append('userName', userName);
    data.append('phone', phone);
    data.append('password', password);
    data.append('roomId', idBuilding);
    data.append('floorId', idFloor);
    data.append('buildingId', idRoom);

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
                console.log('đăng ký thất bại')
            }
        })
        .catch((error) => {
            console.log(error)
        });
}
