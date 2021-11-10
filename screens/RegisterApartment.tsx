import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Platform, Alert, ActivityIndicator } from 'react-native';
import {
    Input,
    Heading,
    NativeBaseProvider,
    Button,
    Select,
    Icon,
    Modal,
    Text
} from "native-base"
import ApiCommon from '../constants/ApiCommon';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-root-toast';

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
    const [showModal, setShowModal] = useState(false)
    const [code, setCode] = useState('')
    const [userId, setUserId] = useState(0);
    const [isLoadingSave, setLoadingSave] = useState(false);

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

    const onSave = (photo: any, email: any, userName: any, phone: any, password: any, idBuilding: any, idFloor: any, idRoom: any, navigation: any, confirmPassWord: any) => {
        setLoadingSave(true);
        if (!idBuilding) {
            Alert.alert(
                '',
                'Vui lòng chọn thông tin tòa nhà!',
            );
            return
        } else if (!idFloor) {
            Alert.alert(
                '',
                'Vui lòng chọn thông tin tầng!',
            );
            return
        } else if (!idRoom) {
            Alert.alert(
                '',
                'Vui lòng chọn thông tin phòng!',
            );
            return
        } else {
            const data = new FormData();
            if (photo.uri != null) {
                data.append('avatarImg', photo);
            }
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
                        navigation.reset({ index: 0, routes: [{ name: 'Login'}]});
                        //setShowModal(true);
                        setUserId(responseJson.listData[0].id);
                        setLoadingSave(false);
                    } else {
                        // Toast.show(responseJson.message, {
                        //     duration: Toast.durations.LONG,
                        //     position: 0,
                        //     shadow: true,
                        //     animation: true,
                        //     hideOnPress: true,
                        //     backgroundColor: '#ffffff',
                        //     textColor: '#ff0000',

                        // });
                        console.log(responseJson.message);
                        setLoadingSave(false);
                        navigation.reset({ index: 0, routes: [{ name: 'Login'}]});
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setLoadingSave(false);
                    navigation.reset({ index: 0, routes: [{ name: 'Login'}]});
                });
        }

    }

    const verifyAccount = () => {
        console.log(code);
        console.log(userId);
        fetch(ApiCommon.rootUrl + '/api/verify', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: userId,
                token: code
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.code == 1) {
                    navigation.navigate('Login');
                } else {
                    Alert.alert(
                        responseJson.message,
                    );
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }

    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <Heading textAlign='center' size='md' color='#fff' marginTop={'30%'} fontWeight='400' marginBottom='20%'>ĐĂNG KÝ CĂN HỘ</Heading>

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
                            top: '55%',
                            right: '8%',
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
                            top: '55%',
                            right: '8%',
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
                            top: '55%',
                            right: '8%',
                        },
                    }}
                    value={idRoom}
                    useNativeAndroidPickerStyle={false}
                    Icon={() => {
                        return <Ionicons name="caret-down-sharp" size={24} color="gray" />;
                    }}
                />
                {isLoadingSave &&
                    <View>
                        <ActivityIndicator size="large" color="#ffffff" />
                    </View>
                }

                {/* <Button marginTop={'20%'} width={'50%'} backgroundColor='#fff' borderRadius={25} onPress={() => onSave(photo, email, userName, phone, password, idBuilding, idFloor, idRoom, navigation, confirmPassWord)}><Text style={{ color: '#4EC8F2', fontSize: 12 }}>CẬP NHẬT</Text></Button> */}
                <View style={{ flexDirection: "row", padding: "2%", marginTop: "20%" }}>
                    <Button width={'50%'} backgroundColor='#fff' borderRadius={25} isDisabled={isLoadingSave} onPress={() => onSave(photo, email, userName, phone, password, idBuilding, idFloor, idRoom, navigation, confirmPassWord)}><Text style={{ color: '#4EC8F2', fontSize: 12 }}>CẬP NHẬT</Text></Button>
                    <Button width={'50%'} backgroundColor='#fff' marginLeft="2%" borderRadius={25} onPress={() => navigation.goBack()}>
                        <Text style={{ color: '#ff0000', fontSize: 12 }}>Quay lại</Text></Button>
                </View>
            </View>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.Header>Xác thực tài khoản</Modal.Header>
                    <Modal.Body>
                        <Text>Mã xác thực sẽ được gửi về số điện thoại của bạn.</Text>
                        <Text>Vui lòng nhập nó ở đây.</Text>
                        <Input
                            variant="rounded"
                            placeholder="Mã xác thực"
                            m={1}
                            w='100%'
                            value={code}
                            _light={{
                                placeholderTextColor: "blueGray.400",
                            }}
                            _dark={{
                                placeholderTextColor: "blueGray.50",
                            }}
                            onChangeText={(content) => { setCode(content) }}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group variant="ghost" space={2}>
                            <Button onPress={() => { verifyAccount() }}>Xác thực</Button>
                            <Button
                                onPress={() => {
                                    setShowModal(false)
                                }}
                            >
                                Hủy
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </NativeBaseProvider>
    );
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        marginLeft: '5%',
        width: '90%',
        marginTop: '10%',
        fontSize: 13,
        paddingVertical: '3%',
        paddingHorizontal: '5%',
        color: '#000',
        paddingRight: 30,
        borderRadius: 20,
        backgroundColor: '#fff'
    },
    inputAndroid: {
        marginLeft: '5%',
        width: 300,
        marginTop: '5%',
        fontSize: 13,
        paddingHorizontal: '5%',
        paddingVertical: '3%',
        borderRadius: 20,
        color: '#000',
        paddingRight: 30,
        backgroundColor: '#fff',
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#4EC8F2',
    },
});


