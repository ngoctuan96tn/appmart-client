import * as React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Box, NativeBaseProvider } from "native-base"

import { Text, View } from '../components/Themed';

export default function Cart() {
  return (
    <SafeAreaView style={styles.container}>
      <NativeBaseProvider config={config}>
        <Text style={styles.title}>Giỏ hàng</Text>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0ea5e9'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
