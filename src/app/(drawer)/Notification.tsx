import { useNotificationQuery } from '@/src/redux/apiSlice/userSlice';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import {
  IconBack,
  IconNotificationMessage
} from '../../assets/icons/icons';
import tw from '../../lib/tailwind';

type Props = {};

const Notification = () => {
    const {data, isLoading, isError} = useNotificationQuery({});
    console.log(data?.data, "data+++++++++")

  return (
    <ScrollView style={tw`flex-1 bg-black px-[4%]`}>
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
          data={data?.data}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            return (
              <View
                style={tw`flex-row gap-3 bg-[#262329] items-center p-4 my-1 rounded-lg px-[4%]`}>
                <SvgXml xml={IconNotificationMessage} />
                <View style={tw``}>
                  {/* <Text style={tw`text-white font-AvenirLTProBlack pr-[2%]`}>
                    {item?.title}
                  </Text> */}
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
    </ScrollView>
  );
};

export default Notification;

const styles = StyleSheet.create({});
