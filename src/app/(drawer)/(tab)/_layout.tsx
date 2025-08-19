import { IconMessage, IconMessageFocus, IconSearch, IconSearchFocus } from '@/src/assets/icons/icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#141316',
          borderTopWidth: 0,
          elevation: 0,
          height: 60, // Adjust the tab bar height
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        },
        tabBarIconStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: "50%" }}>
              <SvgXml
                xml={focused ? IconSearchFocus : IconSearch}
                width={24}
                height={24}
                fill={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="MessageList"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',marginTop: "50%" }}>
              <SvgXml
                xml={focused ? IconMessageFocus : IconMessage}
                width={24}
                height={24}
                fill={color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
