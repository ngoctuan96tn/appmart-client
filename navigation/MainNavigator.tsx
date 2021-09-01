/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
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

const BottomTab = createBottomTabNavigator();

export default function MainNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors['dark'].tint, style: {backgroundColor: 'rgba(29, 132, 249, 1)'} }}>
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
            <MaterialCommunityIcons name="message" color={color} size={size} />
          ),
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
        options={{ headerTitle: 'Mua sắm', headerTitleAlign:'center', headerLeft: null, gestureEnabled: false }}
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
        options={{ headerTitle: 'Thông báo', headerTitleAlign:'center', headerLeft: null, gestureEnabled: false }}
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
        options={{ headerTitle: 'Bảng tin', headerTitleAlign:'center', headerLeft: null, gestureEnabled: false }}
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
        options={{ headerTitle: 'Tin nhắn', headerTitleAlign:'center', headerLeft: null, gestureEnabled: false }}
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
        options={{ headerTitle: 'Cá nhân', headerTitleAlign:'center',  headerLeft: null, gestureEnabled: false }}
      />
    </TabSixStack.Navigator>
  );
}
