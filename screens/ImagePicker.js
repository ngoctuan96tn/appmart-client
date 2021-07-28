import React, { useState, useEffect } from 'react';
import { Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Button, NativeBaseProvider } from 'native-base';
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"

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
    <NativeBaseProvider>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <Button width={200} startIcon={<MaterialCommunityIcons name="camera" size={40} />} onPress={pickImage} color='#0ea5e9' > Chọn ảnh </Button>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <Button color='#0ea5e9' width={200} marginTop={5} onPress={() => navigation.navigate('Register', {
          data: image
        })} > Xác nhận </Button>

      </View>
    </NativeBaseProvider>
  );
}