import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      phoneNumber: '',
      newPassword: '',
      confirmPassword: '',
    };
  }
  
  onForgetPassword() {
    const { phoneNumber, newPassword, confirmPassword } = this.state;

    Alert.alert('Credentials', `${phoneNumber} + ${newPassword} + ${confirmPassword}`);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style = {styles.titleText}>QUÊN MẬT KHẨU</Text>
        <TextInput
          value={this.state.phoneNumber}
          onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
          placeholder={'Nhập số điện thoại'}
          style={styles.input}
        />
        <TextInput
          value={this.state.newPassword}
          onChangeText={(newPassword) => this.setState({ newPassword })}
          placeholder={'Mật khẩu mới'}
          secureTextEntry={true}
          style={styles.input}
        />
        <TextInput
          value={this.state.newPassword}
          onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
          placeholder={'Nhập lại mật khẩu'}
          secureTextEntry={true}
          style={styles.input}
        />
        <Button
          title={'Lấy lại mật khẩu'}
          onPress={this.onForgetPassword.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7a70a',
    height: 300
  },
  input: {
    width: 400,
    padding: 10,
    borderWidth: 2,
    marginBottom: 10,
    borderBottomColor: '#fff',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0
  },
  titleText: {
    fontSize: 30,
    marginBottom: 10,
    marginRight: 60,
  },
});
