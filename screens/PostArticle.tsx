import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, TextInput, Alert } from 'react-native';
import {
  NativeBaseProvider,
} from "native-base"
import ImagePickerStatus from './ImagePickerStatus';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import ApiCommon from '../constants/ApiCommon';
import { useNavigation } from '@react-navigation/native';

export default function PostArticle(route: any) {
  const avatarImg = route.route.params.data;
  const flag = route.route.params.flag ? route.route.params.flag : false;
  const [text, setText] = useState('');
  const [token, setToken] = useState<string | null>('');
  const { getItem, setItem } = useAsyncStorage('token');
  const [retrieve, setRetrieve] = useState(true);
  const photo = {
    uri: avatarImg,
    type: 'image/jpeg',
    name: Math.random() + new Date().getTimezoneOffset() + '.jpg',
  };
  if (flag) {
    saveStatus(photo, token, text);
  }
  useEffect(() => {
    const readToken = async () => {
      const item = await getItem();
      setToken(item);
      setRetrieve(false);
    };

    if (retrieve) {
      readToken();
    }

  }, [retrieve]);
  return (
    <SafeAreaView style={styles.container}>
      <NativeBaseProvider >
        <View style={{ padding: 10 }}>
          <TextInput
            multiline={true}
            style={{ fontSize: 15, padding: 10 }}
            placeholder="Bạn đang nghĩ gì?"
            onChangeText={text => setText(text)}
          />
        </View>
        <ImagePickerStatus />
      </NativeBaseProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

function saveStatus(photo: any, token: any, text: any) {
  const navigation = useNavigation();
  const dataStatus = new FormData();
  dataStatus.append('listMedia', photo);
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
        navigation.navigate('NewFeedScreen');
      }
    })
    .catch((error) => {
      console.log(error)
    });
}
