import { useGetAllCategoryQuery } from '@/src/redux/apiSlice/categorySlice';
import { useGetUserQuery } from '@/src/redux/apiSlice/userSlice';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { IconBusiness, IconDrawer, IconEconomy, IconFinance, IconLaw, IconMarketing, IconSearch, IconWriting } from '../../../assets/icons/icons';
import tw from '../../../lib/tailwind';


type Props = {};

const Discover = () => {
  const navigation = useNavigation();
  const [successModal, setSuccessModal] = useState(false);
  const { data, isLoading, isError } = useGetAllCategoryQuery({});
  const { data: userData } = useGetUserQuery({});
  console.log(userData?.data, "userData==========")

  // console.log(data, "data++++++")
  const DiscoverData = [
    { id: '1', title: 'marketing', route: '', icon: IconMarketing, iconType: 'image' },
    { id: '2', title: 'finance', route: '', icon: IconFinance, iconType: 'image' },
    { id: '3', title: 'law', route: '', icon: IconLaw, iconType: 'image' },
    { id: '4', title: 'economy', route: '', icon: IconEconomy, iconType: 'image' },
    { id: '5', title: 'writing', route: '', icon: IconWriting, iconType: 'image' },
    { id: '6', title: 'business', route: '', icon: IconBusiness, iconType: 'image' },
  ];
  const { width, height } = Dimensions.get('screen');
  const handlePress = (
    route: string,
    title: string,
    taskId: string,
    icon: string
  ) => {
    console.log("route+++++++++36", route);
    console.log("taskId ++++++++++37", taskId);
    console.log("title ++++++++++++38", title);

    if (taskId === "3") {
      setSuccessModal(true);
    } else {
      router.push({
        pathname: "/screens/DiscoverResult",
        params: {
          title: String(title), // make sure params are strings
          taskId: String(taskId),
          route: String(route),
        },
      });
    }
  };

  return (
    <View style={tw`bg-black flex-1 px-[4%] `}>
      <View style={tw`flex-row justify-between my-4 items-center`}>
        <TouchableOpacity
          onPress={() => navigation?.dispatch(DrawerActions.openDrawer())}>
          <SvgXml width={30} xml={IconDrawer} />
        </TouchableOpacity>
        <View>
          <Text style={tw`text-white font-AvenirLTProBlack text-right`}>
            Welcome Back
          </Text>
          <Text style={tw`text-white font-AvenirLTProBlack text-lg text-right`}>
            {userData?.data?.name}
          </Text>
        </View>
      </View>
      <Text
        style={tw`text-white font-AvenirLTProBlack text-center text-2xl my-6`}>
        Discover Contributers to {'\n'} Learn and Consult
      </Text>
      <View style={tw`my-4`}>
        <TouchableOpacity
          onPress={() => router.push('/screens/HomeSearchResult')}
          style={tw`bg-[#262329]  h-14  rounded-2xl  px-4 justify-center`}>
          <View style={tw`flex-row items-center gap-3`}>
            <SvgXml xml={IconSearch} />
            <Text style={tw`text-white text-base`}>Search here</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          key={`flatlist-2`}
          data={DiscoverData}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'center' }}
          scrollEnabled={false} // Disable FlatList scrolling
          renderItem={({ item }) => {
            // console.log(item, "item in index.tsx++++++");

            return (
              (
                <TouchableOpacity
                  style={{
                    width: width * 0.4,
                    height: height * 0.12,
                    margin: width * 0.02,
                    backgroundColor: '#262329',
                    borderRadius: width * 0.02,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => handlePress(item.route, item.id, item.title, item.icon)}>
                  <SvgXml width={24} height={24} xml={item?.icon} />
                  <Text
                    style={tw`text-start py-2 text-white font-AvenirLTProBlack`}>
                    {item?.title}
                  </Text>
                </TouchableOpacity>
              )
            )
          }

          }
        />
      </View>
      <StatusBar backgroundColor="black" translucent />
    </View>
  );
};

export default Discover;

const styles = StyleSheet.create({});
