import { createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider, Input, Button } from 'native-base';
import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
          {/* <View style={styles.row}>
            <Icon name="email" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>{userLogin.email}</Text>
          </View> */}
          <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{userLogin.roomName} - {userLogin.floorName} - {userLogin.buildingName}</Text>
        </View>
        </View>



        <Button onPress={() => console.log("hello world")}>Cập nhật thông tin</Button>

      </SafeAreaView>
    );
};


const styles = StyleSheet.create({
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