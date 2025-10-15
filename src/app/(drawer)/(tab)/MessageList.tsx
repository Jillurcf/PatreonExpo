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
  _id: string;
  title: string;
  description: string;
  price: number;
  latestResponse?: any; // or a specific type if known
};

type MessageListResponse = {
  data: ItemData[];
};

const MessageList = () => {
  const [searchTitle, setSearchTitle] = useState('');
  const { data, isLoading, isError, isFetching, refetch } = useGetMessageListQuery(searchTitle) as {
  data?: ItemData[];
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  refetch: () => void;
};
console.log(data, "data from message list++++++++++++++")
  return (
    <View style={tw`flex-1 bg-black px-[4%]`}>
      <Text style={tw`text-white text-2xl  font-AvenirLTProBlack my-6`}>
        Messages
      </Text>
      <View style={tw`my-4`}>
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
      </View>
      <SwipeListView

        data={data?.data || []}
        keyExtractor={item => item._id.toString()}
        renderItem={({ item }) => {
          console.log(item?.latestResponse, 'item from message list');
          return (
            <TouchableOpacity
              onPress={() => router.push({ pathname: "/screens/MessageScreen", params: { serviceId: item?._id, serviceTitle: item?.title, userName: item?.contributor?.username } })}
              style={tw`flex-row items-center bg-[#262329] my-1 w-full rounded-3xl gap-3 p-4`}>
              <View style={tw`relative items-center w-[15%]`}>

                {item?.contributor?.image ? (
                  <Image
                    source={{ uri: `${imageUrl}/${item?.contributor?.image}` }}
                    style={tw`w-12 h-12 rounded-full border border-[#565358]`}

                    resizeMode="cover"
                  />
                ) : (
                  <Image
                    source={require('../../../assets/images/alteravater.png')}
                    style={tw`w-12 h-12 rounded-full border border-[#565358]`}
                    resizeMode="cover"
                  />
                )}

              </View>
              <View style={tw`flex-col gap-2 justify-center w-[80%]`}>

                <Text style={tw`text-white font-AvenirLTProBlack text-[15px]`}>
                  {item?.contributor?.username || "Service Title"}
                </Text>
                <Text style={tw`text-[#C9C8C9] font-AvenirLTProLight`}>
                  {item?.latestResponse?.answer
                    ? item?.latestResponse?.answer.replace(/\s*\n\s*/g, ' ').trim().slice(0, 30)
                    : "Service Description"}
                </Text>

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
