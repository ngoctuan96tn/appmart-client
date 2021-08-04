import 'react-native-gesture-handler';
import React from 'react';

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
import ListProduct from './screens/ListProduct';
import DetailProduct from './screens/DetailProduct';
import Cart from './screens/Cart';
import ProfileScreen from './screens/ProfileScreen';
import InfoUser from './screens/InfoUser';
import ChangePassWord from './screens/ChangePassWord';
import PostArticle from './screens/PostArticle';
import OrderPayment from './screens/OrderPayment';
import { RootSiblingParent } from 'react-native-root-siblings';
import UserBilling from './screens/UserBilling';

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
      <RootSiblingParent>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Login" component={Login} options={{ title: null, headerLeft: null, gestureEnabled: false }} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="RegisterApartment" component={RegisterApartment} />
            <Stack.Screen name="ImagePickerExample" component={ImagePickerExample} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
            <Stack.Screen name="Main" component={MainNavigator} options={{ title: null, headerLeft: null, gestureEnabled: false }} />
            <Stack.Screen name="AllCategory" component={AllCategoryList} />
            <Stack.Screen name="ListProduct" component={ListProduct} />
            <Stack.Screen name="DetailProduct" component={DetailProduct} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="InfoUser" component={InfoUser} />
            <Stack.Screen name="ChangePassWord" component={ChangePassWord} />
            <Stack.Screen name="PostArticle" component={PostArticle} />
            <Stack.Screen name="OrderPayment" component={OrderPayment} />
            <Stack.Screen name="UserBilling" component={UserBilling} />
          </Stack.Navigator>
        </NavigationContainer>
      </RootSiblingParent>
    );
  }
}
