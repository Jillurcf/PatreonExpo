import { IconBack, IconLogout, IconNotification, IconProfile, IconSettings } from '@/src/assets/icons/icons';
import Button from '@/src/components/Button';
import NormalModal from '@/src/components/NormalModal';
import tw from '@/src/lib/tailwind';
import { lStorage } from '@/src/utils';
import CookieManager from '@react-native-cookies/cookies';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

export default function DrawerLayout() {
  const [logoutConfirmationModalVisible, setLogoutConfirmationModalVisible] =
    useState(false);
  const handleLogout = () => {
    // Perform your logout logic here
    console.log('Logout pressed');
    setLogoutConfirmationModalVisible(false)
    router.replace('/screens/auth/login')
    lStorage.removeItem('token')
    CookieManager.clearAll()
  };
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          backgroundColor: '#000000',
          marginTop: -50,
        },
        drawerLabelStyle: {
          color: 'white',
          fontSize: 20,
        },
      }}
      drawerContent={(props) => (
        <View style={tw`flex-1`}>
          {/* Scrollable Drawer Content */}
          <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={tw``}>
              {/* 🔙 Back Icon at Top Right */}
              <View style={tw`flex-row justify-end px-4`}>
                <TouchableOpacity
                  onPress={() => props.navigation.closeDrawer()}
                  style={tw`bg-[#262329] w-10 h-10 items-center justify-center rounded-full`}
                >
                  <SvgXml xml={IconBack} width={20} height={20} />
                </TouchableOpacity>
              </View>

              {/* 📋 Drawer Items */}
              <DrawerItemList {...props} />
            </View>
          </DrawerContentScrollView>

          {/* 🚪 Logout Button at Bottom Left */}
          <View style={tw`px-4 py-4`}>
            <TouchableOpacity
              style={tw`flex-row gap-4 px-4`} onPress={() => setLogoutConfirmationModalVisible(true)}>
              <SvgXml xml={IconLogout} />
              <Text style={tw`text-white text-base font-AvenirLTProHeavy`}>Logout</Text>
            </TouchableOpacity>
          </View>
          <NormalModal
              layerContainerStyle={tw`flex-1 justify-center items-center mx-5`}
                containerStyle={tw`rounded-xl bg-zinc-900 p-5`}
            visible={logoutConfirmationModalVisible}
            setVisible={setLogoutConfirmationModalVisible}
          >
                  <View>
          <Text style={tw`text-white text-lg text-center font-RoboBold mb-2`}>
            Are you sure {'\n'} You want to logout?
          </Text>

          <View style={tw`mt-2`}>
            <View style={tw`border-t-2 border-gray-800 w-full`}>
              <Button
                title="Yes"
                style={tw`text-white`}
                containerStyle={tw`bg-transparent px-6`}
                onPress={handleLogout}
              />
            </View>
            <View style={tw`border-t-2 border-b-2 border-slate-800 w-full`}>
              <Button
                title="Cancel"
                style={tw`text-white px-6`}
                containerStyle={tw`bg-gray-900`}
                onPress={() => {
                  setLogoutConfirmationModalVisible(false);
                }}
              />
            </View>
          </View>
        </View>
          </NormalModal>
        </View>
      )}
    >
      <Drawer.Screen
        name="(tab)"
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="SettingProfile"
        options={{
          title: 'Profile',
          drawerIcon: () => <SvgXml xml={IconProfile} />,
        }}
      />
      <Drawer.Screen
        name="Notification"
        options={{
          title: 'Notification',
          drawerIcon: () => <SvgXml xml={IconNotification} />,
        }}
      />
      <Drawer.Screen
        name="Settings"
        options={{
          title: 'Settings',
          drawerIcon: () => <SvgXml xml={IconSettings} />,
        }}
      />
    </Drawer>
  );
}
