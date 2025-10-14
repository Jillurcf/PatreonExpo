import { IconMessage, IconMessageFocus, IconSearch, IconSearchFocus } from '@/src/assets/icons/icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';

const _layout = () => {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#141316',
          borderTopWidth: 0,
          elevation: 0,
          height: 60 + insets.bottom, // Adjust the tab bar height
          paddingBottom: insets.bottom, // Add padding to the bottom
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          // height: '100%',
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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
