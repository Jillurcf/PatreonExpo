import { IconBack, IconNotificationMessage } from '@/src/assets/icons/icons';
import tw from '@/src/lib/tailwind';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';


type Props = {};

const Notification = () => {
  const notificationData = [
    {
      id: 1,
      title: 'Update available',
      message:
        'Lorem ipsum dolor sit amet consectetur. Pharetra dolor est cursus massa vitae dictum tempus adipiscing. Lorem ipsum dolor sit amet consectetur. Pharetra dolor est cursus massa vitae dictum tempus adipiscing.',
    },
    {
      id: 2,
      title: 'Update available',
      message:
        'Lorem ipsum dolor sit amet consectetur. Pharetra dolor est cursus massa vitae dictum tempus adipiscing.',
    },
    {
      id: 3,
      title: 'Update available',
      message:
        'Lorem ipsum dolor sit amet consectetur. Pharetra dolor est cursus massa vitae dictum tempus adipiscing.',
    },
    {
      id: 4,
      title: 'Update available',
      message:
        'Lorem ipsum dolor sit amet consectetur. Pharetra dolor est cursus massa vitae dictum tempus adipiscing.',
    },
  ];
  return (
    <View style={tw`flex-1 bg-black px-[4%]`}>
      <View style={tw`flex-row w-full justify-between mt-4`}>
        <TouchableOpacity
          onPress={() => {
           router.back()
          }}
          style={tw`bg-black rounded-full p-1`}>
          <SvgXml xml={IconBack} />
        </TouchableOpacity>
        <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
          Notification
        </Text>
        {/* Placeholder view for symmetry */}
        <View style={tw`w-8`} />
      </View>
      <View style={tw`mt-6`}>
        <FlatList
          data={notificationData}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            return (
              <View
                style={tw`flex-row gap-3 bg-[#262329] p-4 my-1 rounded-lg px-[4%]`}>
                <SvgXml xml={IconNotificationMessage} />
                <View style={tw``}>
                  <Text style={tw`text-white font-AvenirLTProBlack pr-[2%]`}>
                    {item?.title}
                  </Text>
                  <Text style={tw`text-white font-AvenirLTProBlack pr-[14%]`}>
                    {item?.message}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
          <StatusBar backgroundColor="black" translucent />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({});
