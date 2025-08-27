import { IconGeneralSearch } from '@/src/assets/icons/icons';
import InputText from '@/src/components/InputText';
import tw from '@/src/lib/tailwind';
import { useGetMessageListQuery } from '@/src/redux/apiSlice/serviceSlice';
import { imageUrl } from '@/src/redux/baseApi';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';


type ItemData = {
  id: string;
  image: string;
};

const MessageList = () => {
  const [searchTitle, setSearchTitle] = useState('');
  const { data, isLoading, isError, isFetching, refetch } = useGetMessageListQuery(searchTitle)
  console.log(data?.data, 'data from get message List query');
  const fullImageUrl = data?.data?.image ? `${imageUrl}/${data.data.image}` : null;



  return (
    <View style={tw`flex-1 bg-black px-[4%]`}>
      <Text style={tw`text-white text-2xl  font-AvenirLTProBlack my-6`}>
        Messages
      </Text>
      <View style={tw`my-4`}>
        <InputText
          style={tw`text-white h-14 font-AvenirLTProBlack`}
          containerStyle={tw`bg-[#262329] border border-[#565358]`}
          labelStyle={tw`text-white font-AvenirLTProBlack mt-3`}
          placeholder={'Search & Learn'}
          placeholderColor={'#949494'}
          //   label={'Password'}
          cursorColor='white'
          iconLeft={IconGeneralSearch}
          onChangeText={text => {
            setSearchTitle(text);
          }}
        />
      </View>
      <SwipeListView

        data={data?.data || []}
        keyExtractor={item => item._id.toString()}
        renderItem={({ item }) => {
          console.log(item?.contributor?.username, 'item from message list');
          return (
            <TouchableOpacity
              onPress={() => router.push({ pathname: "/screens/MessageScreen", params: {serviceId:item?._id, serviceTitle: item?.title, userName: item?.contributor?.username } })}
              style={tw`flex-row items-center bg-[#262329] my-1 rounded-2xl gap-2 p-2`}>
              <View style={tw`relative items-center`}>
                {item?.image && (
                  <Image
                    source={{ uri: `${imageUrl}/${item?.user?.image}` }}
                    style={tw`w-12 h-12 rounded-full border border-gray-500`}

                    resizeMode="cover"
                  />
                )}

                {item?.contributor ? (
                  <View
                    style={tw`w-3 h-3 bg-gray-400 rounded-full absolute bottom-0 right-4`}
                  />
                ) : (
                  <View
                    style={tw`w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-4`}
                  />
                )}
              </View>
              <View style={tw`flex-1 pb-2`}>
                <View style={tw`flex-row justify-between mr-2 items-center`}>
                  <Text style={tw`text-white font-AvenirLTProBlack`}>
                    {item?.title || "Service Title"}
                  </Text>
                  {/* <View
                    style={tw`bg-white w-4 h-4 items-center justify-center rounded-full`}>
                    <Text style={tw`text-black font-AvenirLTProBlack text-xs`}>
                      2
                    </Text>
                  </View> */}
                </View>
                <View style={tw`flex-row justify-between mt-2`}>
                  <Text style={tw`text-white font-AvenirLTProBlack`}>
                    {item.description.slice(0, 100) || "Service Description"}
                  </Text>
                  {/* <Text style={tw`text-white font-AvenirLTProBlack`}>
                    09:41
                  </Text> */}
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

      <StatusBar backgroundColor="black" translucent />
    </View>
  );
};

const styles = StyleSheet.create({});

export default MessageList;
