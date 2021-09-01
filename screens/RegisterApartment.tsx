import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Platform } from 'react-native';
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
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function RegisterApartment(route: any) {
    const navigation = useNavigation();
    const userName = route.route.params.userName;
    const email = route.route.params.email;
    const phone = route.route.params.phone;
    const password = route.route.params.password;
    const avatarImg = route.route.params.avatarImg;
    const confirmPassWord = route.route.params.confirmPassword;
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
        <NativeBaseProvider>
            <View style={styles.container}>
                <Heading textAlign='center' color='#fff' marginTop={'20%'} fontSize={20}>ĐĂNG KÝ CĂN HỘ</Heading>
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
                {/* <RNPickerSelect
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
                /> */}

                <RNPickerSelect
                    placeholder={{
                        label: 'Chọn tòa nhà',
                        value: null,
                    }}
                    items={data.map(item => {
                        return {
                            label: item.buildingName,
                            value: item.id,
                            color: "#0ea5e9"
                        };
                    })}
                    onValueChange={(value) => [setIsLoadFloors(true), setIdBuilding(value), setFloors([]), setRooms([])]}
                    style={{
                        ...pickerSelectStyles,
                        iconContainer: {
                            top: '50%',
                            right: '12%',
                        },
                    }}
                    value={idBuilding}
                    useNativeAndroidPickerStyle={false}
                    Icon={() => {
                        return <Ionicons name="caret-down-sharp" size={24} color="gray" />;
                    }}
                />

                <RNPickerSelect
                    onValueChange={(value) => [setIsLoadRoom(true), setIdFloor(value), setRooms([])]}
                    placeholder={{
                        label: 'Chọn tầng',
                        value: null,
                    }}
                    style={{
                        ...pickerSelectStyles,
                        iconContainer: {
                            top: '50%',
                            right: '12%',
                        },
                    }}
                    items={floors.map(item => {
                        return {
                            label: item.floorName,
                            value: item.id,
                            color: "#0ea5e9"
                        };
                    })}
                    value={idFloor}
                    useNativeAndroidPickerStyle={false}
                    Icon={() => {
                        return <Ionicons name="caret-down-sharp" size={24} color="gray" />;
                    }}
                />

                <RNPickerSelect
                    onValueChange={(value) => setIdRoom(value)}
                    placeholder={{
                        label: 'Chọn phòng',
                        value: null,
                    }}
                    items={rooms.map(item => {
                        return {
                            label: item.roomName,
                            value: item.id,
                            color: "#0ea5e9"
                        };
                    })}
                    style={{
                        ...pickerSelectStyles,
                        iconContainer: {
                            top: '50%',
                            right: '12%',
                        },
                    }}
                    value={idRoom}
                    useNativeAndroidPickerStyle={false}
                    Icon={() => {
                        return <Ionicons name="caret-down-sharp" size={24} color="gray" />;
                    }}
                />

                <Button marginTop={'10%'} width={'80%'} backgroundColor='#6CDDED' onPress={() => onSave(photo, email, userName, phone, password, idBuilding, idFloor, idRoom, navigation, confirmPassWord)}>Cập nhật</Button>
            </View>
        </NativeBaseProvider>
    );
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        marginLeft: '10%',
        width: '80%',
        marginTop: '10%',
        fontSize: 16,
        paddingVertical: '3%',
        paddingHorizontal: '5%',
        borderWidth: 1,
        borderColor: '#000',
        color: '#000',
        paddingRight: 30,
        borderRadius: 5,
        backgroundColor: '#fff'
    },
    inputAndroid: {
        marginLeft: '10%',
        width: '80%',
        marginTop: '7%',
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: '#000',
        borderRadius: 8,
        color: '#000',
        paddingRight: 30,
        backgroundColor: '#fff',
        top: -10,
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#0ea5e9',
    },
});

function onSave(photo: any, email: any, userName: any, phone: any, password: any, idBuilding: any, idFloor: any, idRoom: any, navigation: any, confirmPassWord: any) {
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
            if (responseJson.code == 1) {
                navigation.navigate('Login');
            } else {
                console.log('đăng ký thất bại')
            }
        })
        .catch((error) => {
            console.log(error)
        });
}
