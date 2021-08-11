// import React, { useState } from 'react';
// import { SafeAreaView, StyleSheet, View, TextInput } from 'react-native';
// import {
//   NativeBaseProvider,
// } from "native-base"

// export default function PostArticle() {

//   const [text, setText] = useState('');
//   return (
//     <SafeAreaView style={styles.container}>
//       <NativeBaseProvider >
//         <View style={{ padding: 10 }}>
//           <TextInput
//             multiline={true}
//             style={{ height: '100%', backgroundColor: '#FFC0CB', fontSize: 15, padding: 10 }}
//             placeholder="Bạn đang nghĩ gì?"
//             onChangeText={text => setText(text)}
//           />
//         </View>
//       </NativeBaseProvider>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     // backgroundColor: '#FFB6C1'
//   },
// });

import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Main from './MainScreen';
import ImageBrowser from './ImageBrowserScreen';

const Stack = createStackNavigator();

export default function PostArticle() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Main'>
        <Stack.Screen name='Main' component={Main} />
        <Stack.Screen
          name='ImageBrowser'
          component={ImageBrowser}
          options={{
            title: 'Selected 0 files',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
