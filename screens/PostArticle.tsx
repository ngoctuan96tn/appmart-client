import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, TextInput } from 'react-native';
import {
  NativeBaseProvider,
} from "native-base"

export default function PostArticle() {

  const [text, setText] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <NativeBaseProvider >
        <View style={{ padding: 10 }}>
          <TextInput
            multiline={true}
            style={{ height: '100%', fontSize: 15, padding: 10 }}
            placeholder="Bạn đang nghĩ gì?"
            onChangeText={text => setText(text)}
          />
        </View>
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

