import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NativeBaseProvider } from 'native-base';

export default function ImagePickerStatus() {
  const [image, setImage] = useState(null);

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
        {image && <Image source={{ uri: image }} style={{ width: '100%', height: 300 }} />}
      </View>
      <View style={styles.line} />
      <View style={styles.buttonGroupContainer}>
        <TouchableOpacity style={styles.buttonContainer} onPress={pickImage}>
          <Text style={styles.buttonText}>Chọn ảnh</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => saveStatus()}>
          <Text style={styles.buttonText}>Cập nhật</Text>
        </TouchableOpacity>
      </View>
    </NativeBaseProvider>

  );
}

const styles = StyleSheet.create({
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
})

function saveStatus() {
  console.log('Lưu thông tin bài viết')
}