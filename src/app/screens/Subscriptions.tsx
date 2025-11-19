import { IconBack } from '@/src/assets/icons/icons';
import NormalModal from '@/src/components/NormalModal';
import TButton from '@/src/components/TButton';
import tw from '@/src/lib/tailwind';
import { useGetMessageListQuery, useUnSubscribeServicesMutation } from '@/src/redux/apiSlice/serviceSlice';
import { useGetSingleUserQuery, useGetUserQuery } from '@/src/redux/apiSlice/userSlice';
import { imageUrl } from '@/src/redux/baseApi';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { SwipeListView } from 'react-native-swipe-list-view';



type ItemData = {
  _id: string;
  title: string;
  description: string;
  price: number;
  latestResponse?: any; // or a specific type if known
};

type MessageListResponse = {
  data: ItemData[];
};

const Subscriptions = () => {
  const [searchTitle, setSearchTitle] = useState('');
  const { data, isLoading, isError, refetch } = useGetMessageListQuery(searchTitle) as {
    data?: ItemData[];
    isLoading: boolean;
    isError: boolean;
    isFetching: boolean;
    refetch: () => void;
  };
  const [unSubscribeServices] = useUnSubscribeServicesMutation();
  const [unsubscribeModalVisible, setUnsubscribeModalVisible] = useState(false);
  const { data: singleUserData, error, } = useGetSingleUserQuery({});
  const [subscribed, setSubscribed] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  // console.log(data?.data?.services[0], '=======================data');
  const { data: loginUserData, refetch: fetchLoginUser, isFetching } = useGetUserQuery({});
  // console.log(data, "data from message list++++++++++++++");

  const serviceIdfromUser = singleUserData?.data?.services[0];
  const userSubscription = loginUserData?.data?.subscriptions || [];

  useEffect(() => {
    fetchLoginUser()
    if (userSubscription?.includes(serviceIdfromUser)) {
      console.log("subscribed")
      setSubscribed(true);
    } else {
      console.log("not subscribed")
    }
  }, [serviceIdfromUser, userSubscription]);

  console.log(subscribed, "subscribed+++++++++++++++")

const subscriptionConfirm =async () => {
   try {
      // Call unsubscribe mutation

      const res = await unSubscribeServices(selectedServiceId).unwrap();
      console.log('✅ Unsubscribed successfully:', res);
        setUnsubscribeModalVisible(false);
      // if (res?.success === true) {
      //   setUnsubscribeModalVisible(true);
      // }
      // router.replace('/screens/DiscoverResult');

    } catch (error) {
      console.error('❌ Unsubscribe failed:', error);
    }
    setUnsubscribeModalVisible(false);
    
  }

  const handleUnSubscribe = async (id) => {
    console.log(id, 'service id to unsubscribe');
    setUnsubscribeModalVisible(true);
    setSelectedServiceId(id);
   
  }
  return (
    <View style={tw`flex-1 bg-black px-[4%]`}>
      <View style={tw`flex-row w-full justify-between my-4 px-[4%]`}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={tw`bg-black rounded-full p-1`}>
          <SvgXml xml={IconBack} />
        </TouchableOpacity>
        <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
          Subscriptions
        </Text>
        <View style={tw`w-8`} />
      </View>
      {/* <View style={tw`my-4`}>
                <InputText
                    style={tw`text-white h-12 font-AvenirLTProBlack`}
                    containerStyle={tw`bg-[#262329] rounded-2xl`}
                    labelStyle={tw`text-white font-AvenirLTProBlack mt-3`}
                    placeholder={'Search messages'}
                    placeholderColor={'#949494'}
                    //   label={'Password'}
                    cursorColor='white'
                    iconLeft={IconGeneralSearch}
                    onChangeText={text => {
                        setSearchTitle(text);
                    }}
                />
            </View> */}
      <SwipeListView

        data={data?.data || []}
        keyExtractor={item => item._id.toString()}
        renderItem={({ item }) => {
          // console.log(item?._id, 'item from message list');
          return (
            <TouchableOpacity
              onPress={() => router.push({ pathname: "/screens/MessageScreen", params: { serviceId: item?._id, serviceTitle: item?.title, userName: item?.contributor?.username } })}
              style={tw`flex-row items-center bg-[#262329] my-1 w-full rounded-3xl gap-1 px-1 py-2`}>
              <View style={tw`relative items-center w-[15%]`}>

                {item?.contributor?.image ? (
                  <Image
                    source={{ uri: `${imageUrl}/${item?.contributor?.image}` }}
                    style={tw`w-12 h-12 rounded-full border border-[#565358]`}

                    resizeMode="cover"
                  />
                ) : (
                  <Image
                    source={require('../../assets/images/alteravater.png')}
                    style={tw`w-12 h-12 rounded-full border border-[#565358]`}
                    resizeMode="cover"
                  />
                )}

              </View>
              <View style={tw`flex-row items-center w-[100%]`}>

                <View style={tw`flex-col gap-2 justify-center w-[50%]`}>
                  <Text style={tw`text-white font-AvenirLTProBlack text-[15px]`}>
                    {item?.title || "Service Title"}
                  </Text>
                  <Text style={tw`text-[#C9C8C9] font-AvenirLTProLight`}>
                    {item?.description
                      ? item?.description.replace(/\s*\n\s*/g, ' ').trim().slice(0, 20)
                      : "Service Description"}
                  </Text>
                </View>
                <View style={tw`mr-[10%]`}>
                  <TButton

                    onPress={() => handleUnSubscribe(item?._id)}
                    title={"Unsubscribe"}
                    titleStyle={tw`text-[#262329] text-[12px] font-AvenirLTProBlack`}
                    containerStyle={tw`w-[70%] py-2 bg-white`}
                  />
                </View>

              </View>
            </TouchableOpacity>
          );
        }}
        refreshControl={
          <RefreshControl
            refreshing={isFetching} // from RTK query
            onRefresh={refetch} // re-run the query
            tintColor="#fff" // optional: spinner color
          />
        }
      />
      <NormalModal
        layerContainerStyle={tw`flex-1 justify-center items-center `}
        containerStyle={tw`rounded-xl bg-[#141316] w-[80%] `}
        visible={unsubscribeModalVisible}
        setVisible={setUnsubscribeModalVisible}
      >
        <View style={tw``}>
          <Text style={tw`text-white text-2xl text-center font-AvenirLTProBlack mb-2`}>
            Are you sure to {"\n"}Unsubscribe?
          </Text>

          <View style={tw`mt-2`}>
            {/* <View style={tw` w-full`}>
              <Button
                title="Yes"
                style={tw`text-white`}
                titleStyle={tw`text-[#141316]`}
                containerStyle={tw` px-6`}
                onPress={() => {
                  setUnsubscribeModalVisible(false);
                  //   fetchLoginUser();
                  //   refetchServiceData();
                  //   setSubscribed(false);
                }}
              />
            </View> */}
            <View style={tw`items-center mb-4`}>
              <TButton
                onPress={subscriptionConfirm}
                title={"Unsubscribe"}
                titleStyle={tw`text-[#262329] text-[16px] font-AvenirLTProBlack`}
                containerStyle={tw`w-[100%] bg-white `}
              />
            </View>
            <View style={tw`items-center w-full`}>
              <TButton
                title="Cancel"
               titleStyle={tw`text-white text-[16px] font-AvenirLTProBlack`}
                containerStyle={[tw`w-[100%]`, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
             
                onPress={() => {
                  setUnsubscribeModalVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </NormalModal>
      <StatusBar backgroundColor="black" translucent />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Subscriptions;
