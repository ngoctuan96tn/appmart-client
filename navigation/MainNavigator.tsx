/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ShopScreen from '../screens/ShopScreen';
import NotifyScreen from '../screens/NotifyScreen';
import NewFeedScreen from '../screens/NewFeedScreen';
import MessageScreen from '../screens/MessageScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { TabFiveParamList, TabFourParamList, TabOneParamList, TabSixParamList, TabThreeParamList, TabTwoParamList } from '../types';
import { useNavigation } from '@react-navigation/core';
import { useState } from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import ApiCommon from '../constants/ApiCommon';

const BottomTab = createBottomTabNavigator();

export default function MainNavigator(data: any) {
  const params = data.route.params;
  const navigation = useNavigation();

  const [initName, setInitName] = React.useState('Mua sắm');
  const colorScheme = useColorScheme();

  const [token, setToken] = useState<string | null>('');
  const { getItem, setItem } = useAsyncStorage('token');
  const [retrieve, setRetrieve] = useState(true);
  const [loading, setLoading] = useState(true);
  const [dataCount, setDataCount] = useState<any>({});

  const tabMuaSam = 'Mua sắm';
  const tabThongBao = 'Thông báo';
  let schedule = setTimeout(() => setLoading(true), 5000);
  React.useEffect(() => {
    // check index để gen init route name
    if (params != null && params != undefined) {
      if (params.index == 1) {
        setInitName(tabMuaSam);
      }

      if (params.index == 3) {
        setInitName(tabThongBao);
      }
    }

    const readToken = async () => {
      const item = await getItem();
      setToken(item);
      setRetrieve(false);
    };

    if (retrieve) {
      readToken();
    }
    if (retrieve === false && loading === true) {
      console.log('token',token);
      
      const headers = { 'Authorization': `Bearer ${token}` }
      fetch(ApiCommon.rootUrl + '/api/get-msnt-count', { headers })
        .then((response) => response.json())
        .then((json) => {
          console.log("data count",json);
          setDataCount(json);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }

    clearTimeout(schedule);

  }, [retrieve, loading]);



  return (
    <BottomTab.Navigator
      initialRouteName={initName}
      // tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
      tabBarOptions={{ activeTintColor: '#0ea5e9' }} // sửa color khi click vào icon
    >
      <BottomTab.Screen
        name="Mua sắm"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="shopping" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Thông báo"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="earth" color={color} size={size} />
          ),
          tabBarBadge:dataCount?.notifyCount?dataCount?.notifyCount:undefined
        }}
      />
      <BottomTab.Screen
        name="Bảng tin"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="newspaper" color={color} size={size} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Tin nhắn"
        component={TabFiveNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            // <MaterialCommunityIcons name="message" color={color} size={size} />
            <AntDesign name="message1" color={color} size={size} />
          ),
          tabBarBadge:dataCount?.messageCount?dataCount?.messageCount:undefined
        }}
      />
      <BottomTab.Screen
        name="Cá nhân"
        component={TabSixNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="menu" color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={ShopScreen}
        options={{ headerTitle: 'Mua sắm', headerTitleAlign: 'center', headerLeft: null, gestureEnabled: false }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={NotifyScreen}
        options={{ headerTitle: 'Thông báo', headerTitleAlign: 'center', headerLeft: null, gestureEnabled: false }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="TabThreeScreen"
        component={NewFeedScreen}
        options={{ headerTitle: 'Bảng tin', headerTitleAlign: 'center', headerLeft: null, gestureEnabled: false }}
      />
    </TabThreeStack.Navigator>
  );
}

const TabFiveStack = createStackNavigator<TabFiveParamList>();

function TabFiveNavigator() {
  return (
    <TabFiveStack.Navigator>
      <TabFiveStack.Screen
        name="TabFiveScreen"
        component={MessageScreen}
        options={{ headerTitle: 'Tin nhắn', headerTitleAlign: 'center', headerLeft: null, gestureEnabled: false }}
      />
    </TabFiveStack.Navigator>
  );
}

const TabSixStack = createStackNavigator<TabSixParamList>();

function TabSixNavigator() {
  return (
    <TabSixStack.Navigator>
      <TabSixStack.Screen
        name="TabSixScreen"
        component={ProfileScreen}
        options={{ headerTitle: 'Cá nhân', headerTitleAlign: 'center', headerLeft: null, gestureEnabled: false }}
      />
    </TabSixStack.Navigator>
  );
}
