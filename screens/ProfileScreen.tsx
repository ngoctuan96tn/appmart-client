import React, { useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Alert } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import ApiCommon from '../constants/ApiCommon';
import { AsyncStorage } from 'react-native';
// import files from '../assets/filesBase64';

export default function ProfileScreen() {

  const navigation = useNavigation();
  const [userLogin, setUserLogin] = useState<any>({});
  const [isLoading, setLoading] = useState(false);
  const [value, setValue] = useState<string | null>('');
  const { getItem, setItem } = useAsyncStorage('token');
  const [retrieve, setRetrieve] = useState(true);

  useEffect(() => {
    const readToken = async () => {
      const item = await getItem();
      setValue(item);
      setRetrieve(false);
    };

    if (retrieve) {
      readToken();
    }
    if (retrieve === false) {
      const headers = { 'Authorization': `Bearer ${value}` }
      fetch(ApiCommon.rootUrl + '/api/user/login', { headers })
        .then((response) => response.json())
        .then((json) => setUserLogin(json))
        .catch((error) => console.error(error));
    }

  }, [retrieve]);

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
      <TouchableRipple onPress={() => navigation.navigate('InfoUser', { data: userLogin })}>
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
      </TouchableRipple>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => navigation.navigate('UserBilling')}>
          <View style={styles.menuItem}>
            <Icon name="clipboard-list-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Đơn hàng của tôi</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate('ChangePassWord')}>
          <View style={styles.menuItem}>
            <Icon name="onepassword" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Thay đổi mật khẩu</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => logout(navigation)}>
          <View style={styles.menuItem}>
            <Icon name="logout" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Đăng xuất</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

function logout(navigation: any) {
  Alert.alert(
    'Thông báo',
    'Bạn có muốn đăng xuất khỏi thiết bị?',
    [
      {
        text: 'Yes',
        onPress: () => {
          AsyncStorage.removeItem('token');
          navigation.navigate('Login');
        }
      },
      {
        text: 'No',
      },
    ],
    { cancelable: false },
  );
}

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
