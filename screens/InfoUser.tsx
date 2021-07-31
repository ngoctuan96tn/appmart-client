import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider, Input, Button } from 'native-base';
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ApiCommon from '../constants/ApiCommon';
import { TabOneParamList } from '../types';

// import files from '../assets/filesBase64';

export function UserInfor(route: any) {
  const userLogin = route.route.params.data.route.params.data;
  const myCustomShare = async () => {
    const shareOptions = {
      message: 'Order your next meal from FoodFinder App. I\'ve already ordered more than 10 meals on it.',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/PNG_transparency_demonstration_2.png/200px-PNG_transparency_demonstration_2.png',
      title: 'Logo',
      // urls: [files.image1, files.image2]
    }

    try {
    } catch (error) {
      console.log('Error => ', error);
    }
  };
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
            setIdBuilding(userLogin.buildingId)
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
            setIdFloor(userLogin.floorId)
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
            setIdRoom(userLogin.roomId)
          }
        })
        .catch((error) => console.error(error))
        .finally(() => setIsLoadRoom(false));
    }
  });

  if (isLoading === false && isLoadRoom === false && isLoadFloors === false) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <Avatar.Image
              source={{
                uri: `data:image/jpeg;base64,${userLogin.avatarHashCode}`,
              }}
              size={80}
            />
            <View style={{ marginLeft: 20 }}>
              <Title style={[styles.title, {
                marginTop: 15,
                marginBottom: 5,
              }]}>{userLogin.userName}</Title>
              {userLogin.roleId == 1 ?
                <Caption style={styles.caption}>@Quản trị viên</Caption>
                :
                <Caption style={styles.caption}>@Khách hàng</Caption>
              }
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="phone" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>{userLogin.phone}</Text>
          </View>
          <View style={styles.row}>
            <Icon name="email" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>{userLogin.email}</Text>
          </View>
        </View>
        <SafeAreaView style={styles.exContainer}>
          <NativeBaseProvider>
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
                  top: 32,
                  right: 70,
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
                  top: 32,
                  right: 70,
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
                  top: 32,
                  right: 70,
                },
              }}
              value={idRoom}
              useNativeAndroidPickerStyle={false}
              Icon={() => {
                return <Ionicons name="caret-down-sharp" size={24} color="gray" />;
              }}
            />
          </NativeBaseProvider>
        </SafeAreaView>



        <Button onPress={() => console.log("hello world")}>Cập nhật thông tin</Button>

      </SafeAreaView>
    );
  } else {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
};


const styles = StyleSheet.create({
  exContainer: {
    flex: 1,
    marginLeft: '8%',
  },
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,

  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginTop: 30,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    color: '#000',
    paddingRight: 30,
    backgroundColor: '#fff'
  },
  inputAndroid: {
    width: 300,
    marginTop: 30,
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

export default (data: any) => {
  return (
    <NativeBaseProvider>
      <TabOneNavigator data={data} />
    </NativeBaseProvider>
  )
}


const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator(data: any) {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={UserInfor}
        options={{ headerTitle: "THÔNG TIN CÁ NHÂN" }}
        initialParams={data}
      />
    </TabOneStack.Navigator>
  );
}