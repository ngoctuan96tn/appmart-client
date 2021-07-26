import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Login from './screens/Login';
import Register from './screens/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterApartment from './screens/RegisterApartment';
import ImagePickerExample from './screens/ImagePicker';
import ForgetPassword from './screens/ForgetPassWord';
import MainNavigator from './navigation/MainNavigator';
import AllCategoryList from './components/AllCategoryList';

const Stack = createStackNavigator();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      //   <SafeAreaProvider>
      //     {/* <Navigation colorScheme={colorScheme} />
      // <StatusBar /> */}
      //     {/* <Login /> */}
      //     <RegisterApartment />
      //   </SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Login" component={Login} options={{ title: null, headerLeft: null, gestureEnabled: false }} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="RegisterApartment" component={RegisterApartment} />
          <Stack.Screen name="ImagePickerExample" component={ImagePickerExample} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="Main" component={MainNavigator} options={{ title: null, headerLeft: null, gestureEnabled: false }}/>
          <Stack.Screen name="AllCategory" component={AllCategoryList}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
