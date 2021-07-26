import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Chọn ảnh" onPress={pickImage} color='#0ea5e9' />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Quay lại trang đăng ký" color='#0ea5e9' onPress={() => navigation.navigate('Register', {
        data: image
      })} />
    </View>
  );
}