import React, { useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Alert, Linking } from 'react-native';
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
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
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
              size={60}
            />
            <View style={{ marginLeft: 20 }}>
              <Title style={[styles.title, {
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

        <View style={styles.line} />

        <TouchableRipple onPress={() => navigation.navigate('ChangePassWord')}>
          <View style={styles.menuItem}>
            <Icon name="onepassword" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Thay đổi mật khẩu</Text>
          </View>
        </TouchableRipple>

        <View style={styles.line} />

        <TouchableRipple onPress={() => Linking.openURL('https://mimart.vn/chinh-sach-bao-mat/')}>
          <View style={styles.menuItem}>
            <Entypo name="text" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Chính sách</Text>
          </View>
        </TouchableRipple>

        <View style={styles.line} />
        
        <TouchableRipple onPress={() => navigation.navigate('FeedBack')}>
          <View style={styles.menuItem}>
            <Entypo name="mail" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Phản hồi</Text>
          </View>
        </TouchableRipple>

        <View style={styles.line} />

        <TouchableRipple onPress={() => logout(navigation)}>
          <View style={styles.menuItem}>
            <Icon name="logout" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Đăng xuất</Text>
          </View>
        </TouchableRipple>

        <View style={styles.line} />

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
        text: 'Đăng xuất',
        onPress: () => {
          AsyncStorage.removeItem('token');
          navigation.navigate('Login');
        }
      },
      {
        text: 'Hủy',
      },
    ],
    { cancelable: false },
  );
}

const styles = StyleSheet.create({
  line: {
    height: 0.5,
    backgroundColor: '#BDBDBD',
    marginTop: 10
  },
  container: {
    flex: 1,
  },
  userInfoSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    marginBottom: 25,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '300',
    color: 'black'
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
    marginTop: -10,
    backgroundColor: '#fff'
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
    paddingBottom: 3
  },
  menuItemText: {
    color: 'black',
    marginLeft: 20,
    fontWeight: '300',
    fontSize: 13,
    lineHeight: 26,
  },
});
