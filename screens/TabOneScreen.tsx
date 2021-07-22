import { Button, Input, NativeBaseProvider, Radio } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabOneScreen() {
  const [value, setValue] = React.useState("one")
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <NativeBaseProvider>
        <Input
          variant="outline"
          placeholder="Outline"
          _light={{
            placeholderTextColor: "blueGray.400",
          }}
          _dark={{
            placeholderTextColor: "blueGray.50",
          }}
        />
        <Radio.Group
          name="myRadioGroup"
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue)
          }}
        >
          <Radio value="one" my={1}>
            One
          </Radio>
          <Radio value="two" my={1}>
            Two
          </Radio>
        </Radio.Group>
        <Button onPress={() => console.log(value)}>PRIMARY</Button>
      </NativeBaseProvider>
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
