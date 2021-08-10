import KeyboardSpacer from 'react-native-keyboard-spacer';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  View,
  TextInput
} from 'react-native';

export default function PostArticle() {
  return (
    <View style={[{ flex: 1 }]}>
      <Image source={{ uri: 'http://img11.deviantart.net/072b/i/2011/206/7/0/the_ocean_cherry_tree_by_tomcadogan-d41nzsz.png' }}
        style={{ flex: 1 }} />
      <TextInput style={{ left: 0, right: 0, height: '30%' }}
        underlineColorAndroid="transparent"
        placeholder="Bạn đang nghĩ gì?"
        placeholderTextColor="grey"
        numberOfLines={10}
        multiline={true}
      />
      <KeyboardSpacer />
    </View>
  );
}

AppRegistry.registerComponent('DemoApp', () => PostArticle);