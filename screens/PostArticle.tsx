import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, TextInput, Text, Platform, TouchableOpacity, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {
  Button,
  NativeBaseProvider,
} from "native-base"
import ImagePickerStatus from './ImagePickerStatus';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import ApiCommon from '../constants/ApiCommon';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { createStackNavigator } from '@react-navigation/stack';
import { TabOneParamList } from '../types';
import { Ionicons } from '@expo/vector-icons';

export function PostArticle(route: any) {
  const userLogin = route.route.params.data.route.params.data;
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [token, setToken] = useState<string | null>('');
  const { getItem, setItem } = useAsyncStorage('token');
  const [retrieve, setRetrieve] = useState(true);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const readToken = async () => {
      const item = await getItem();
      setToken(item);
      setRetrieve(false);
    };

    if (retrieve) {
      readToken();
    }

    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();

  }, [retrieve]);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <SafeAreaView style={styles.container}>
          <NativeBaseProvider >
          <View style={{ height: '83%' }}>
            <View style={{ flexDirection: 'row', paddingLeft: 25, marginTop: 5 }}>
              <View style={{ width: '20%' }}>
                <Image style={styles.imageStatus} source={{ uri: `data:image/jpeg;base64,${userLogin.avatarHashCode}` }} />
              </View>
              <View style={{ width: '80%' }}>
                <Text style={{ fontWeight: 'bold' }}>{userLogin.userName}</Text>
              </View>
            </View>
            <View style={{ padding: 10 }}>
              <TextInput
                multiline={true}
                style={{ fontSize: 15, padding: 10 }}
                placeholder="Bạn đang nghĩ gì?"
                onChangeText={text => setText(text)}
              />
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              {image && <Image source={{ uri: image }} style={{ width: '100%', height: 300 }} />}
            </View>

            <View style={{ position: 'absolute', bottom: 1, flexDirection: "row", flexWrap: "wrap", width: '100%', height: 60 }}>
              <View style={{ width: '70%' }}>
                <Button width='30%' variant='link' onPress={() => pickImage()}  >
                  <Ionicons name="images-outline" size={25} />
                </Button>
              </View>
              <View style={{ width: '25%', }}>
                <Button onPress={() => {
                  const photo = {
                    uri: image,
                    type: 'image/jpeg',
                    name: Math.random() + new Date().getTimezoneOffset() + '.jpg',
                  };
                  saveStatus(photo, token, text, navigation)
                }} >Đăng bài</Button>
              </View>
            </View>
</View>
          </NativeBaseProvider>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: '5%'
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 14,
  },
  buttonGroupContainer: {
    height: 50,
    flexDirection: 'row'
  },
  line: {
    height: 0.5,
    backgroundColor: '#BDBDBD',
    marginTop: 10
  },
  imageStatus: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#BDBDBD',
  },
});

function saveStatus(photo: any, token: any, text: any, navigation: any) {
  const dataStatus = new FormData();
  if (photo.uri != '' && photo.uri != null && photo.uri != undefined) {
    dataStatus.append('listMedia', photo);
  }
  dataStatus.append('content', text);

  fetch(ApiCommon.rootUrl + '/api/post', {
    method: 'post',
    body: dataStatus,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data; ',
      'Authorization': `Bearer ${token}`
    },
  }).then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.code == 1) {
        navigation.navigate('Main', { index: 3 });
      }
    })
    .catch((error) => {
      console.log(error)
    });
}

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
        component={PostArticle}
        options={{ headerTitle: "BÀI VIẾT MỚI", headerTitleAlign: 'center' }}
        initialParams={data}
      />
    </TabOneStack.Navigator>
  );
}
