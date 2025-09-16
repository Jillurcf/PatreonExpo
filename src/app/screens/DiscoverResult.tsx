// import { IconBack, IconGeneralSearch, IconRightArrow } from '@/src/assets/icons/icons';
// import InputText from '@/src/components/InputText';
// import tw from '@/src/lib/tailwind';
// import { useGetAllServiceQuery } from '@/src/redux/apiSlice/serviceSlice';
// import { imageUrl } from '@/src/redux/baseApi';
// import { router, useLocalSearchParams } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   FlatList,
//   Image,
//   RefreshControl,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { SvgXml } from 'react-native-svg';

// const DiscoverResult = () => {
//   const { title, taskId } = useLocalSearchParams<{ title?: string; taskId?: string }>();

//   const lowerCaseTaskId = taskId?.toLocaleLowerCase() || '';
//   // console.log( 'loserCaseTaskId++++++', lowerCaseTaskId);
//   const [searchText, setSearchText] = useState('');
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [titles, setTitles] = useState(title || '');
//   const [page, setPage] = useState(1);
//   const [services, setServices] = useState([]);
//   const [hasMore, setHasMore] = useState(true);
//   const limit = 10;
//   console.log(services, 'services+++++++');
//   // Debounce title input
//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       if (searchText.trim() === '') return;
//       setTitles(searchText);
//       setPage(1);
//       setServices([]);
//       setHasMore(true);
//     }, 500);
//     return () => clearTimeout(delayDebounce);
//   }, [searchText]);

//   const { data, isLoading, error, isFetching, refetch } = useGetAllServiceQuery({
//     category: lowerCaseTaskId,
//     title: titles,
//     page,
//     limit,
//   });

//   console.log(data, 'data+++++++');

//   useEffect(() => {
//     if (Array.isArray(data?.data?.result)) {
//       console.log('Fetched services:', data.data.result);
//       if (page === 1) {
//         setServices(data.data.result);
//       } else {
//         setServices(prev => [...prev, ...data.data.result]);
//       }
//       setHasMore(page < data.data.totalPages);
//     }
//   }, [data]);


//   const handleService = (index, item) => {
//     console.log(item, 'item+++++++');
//     router.push({pathname: '/screens/ProfileScreen', params:{
//       userId: item?.contributor?._id,
//       serviceId: item?._id,
//       title: item?.title,
//       price: item?.price,
//       index: index,
//   }});
//   };

//   return (
//     <View style={tw`flex-1 bg-black px-[4%]`}>
//       <View style={tw`flex-row w-full justify-between mt-4`}>
//         <TouchableOpacity
//           onPress={() => router.back()}
//           style={tw`bg-PrimaryFocus rounded-full p-1`}>
//           <SvgXml xml={IconBack} />
//         </TouchableOpacity>
//         <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
//           Search Result
//         </Text>
//         <View style={tw`w-8`} />
//       </View>

//       <View style={tw`my-8`}>
//        <InputText
//           style={tw`text-white`}
//           containerStyle={tw`bg-[#262329] border h-14 relative border-[#565358]`}
//           labelStyle={tw`text-white font-AvenirLTProBlack mt-3`}
//           placeholder={'Search by user name'}
//           cursorColor={'white'}
//           placeholderColor={'#949494'}
//           iconLeft={IconGeneralSearch}
//           readonly={true}
//           onChangeText={(text) => {
//            setSearchText(text);
//             setShowDropdown(!!text); // Show dropdown if there's input
//           }}
//         />
//       </View>

//       <FlatList
//       refreshControl={
//         <RefreshControl
//           refreshing={isFetching}
//           onRefresh={() => {
//             setPage(1);
//             setServices([]);
//             refetch();
//           }}
//         />
//       }
//         data={services}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item, index }) => {
//           const contributorImage = item?.contributor?.image
//             ? { uri: `${imageUrl}/${item?.contributor?.image}` }
//             : require('../..//assets/images/logo.png');

//           return (
//             <TouchableOpacity
//               onPress={() => handleService(index, item)}
//               style={tw`flex-row items-center bg-[#262329] my-1 rounded-2xl gap-2 p-2`}>
//               <View style={tw`flex-row items-center`}>
//                 <View style={tw`relative items-center mr-2`}>
//                   <Image
//                     source={contributorImage}
//                     style={tw`w-12 h-12 rounded-full`}
//                     resizeMode="cover"
//                   />
//                 </View>

//                 <View style={tw`flex-1 pb-2`}>
//                   <View style={tw`flex-row justify-between mr-2 items-center`}>
//                     <Text style={tw`text-white font-AvenirLTProBlack`}>
//                       {item?.title}
//                     </Text>
//                   </View>
//                   <View style={tw`flex-row justify-between mt-2`}>
//                     <Text style={tw`text-white font-AvenirLTProBlack`}>
//                       {item?.subtitle}
//                     </Text>
//                   </View>
//                   <View style={tw`flex-row justify-between mt-2`}>
//                     <Text style={tw`text-white text-xs font-AvenirLTProBlack`}>
//                      Price: ${item?.price}
//                     </Text>
//                   </View>
//                 </View>

//                 <SvgXml xml={IconRightArrow} />
//               </View>
//             </TouchableOpacity>
//           );
//         }}
//         onEndReached={() => {
//           if (!isFetching && hasMore && data?.data?.totalPages > page) {
//             setPage(prev => prev + 1);
//           }
//         }}
//         onEndReachedThreshold={0.5}
//         ListFooterComponent={
//           isFetching && hasMore ? (
//             <ActivityIndicator size="large" color="white" />
//           ) : null
//         }
//       />

//       <StatusBar backgroundColor="black" translucent={false} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({});

// export default DiscoverResult;

import { IconBack, IconGeneralSearch, IconRightArrow } from '@/src/assets/icons/icons';
import InputText from '@/src/components/InputText';
import tw from '@/src/lib/tailwind';
import { useGetAllServiceQuery } from '@/src/redux/apiSlice/serviceSlice';
import { imageUrl } from '@/src/redux/baseApi';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SvgXml } from 'react-native-svg';

const DiscoverResult = () => {
  // const { title, taskId } = useLocalSearchParams<{ title?: string; taskId?: string }>();
  const { title, taskId, route } = useLocalSearchParams<{
    title?: string;
    taskId?: string;
    route?: string;
  }>();

  console.log("params in DiscoverResult:", title, taskId, route);
  const router = useRouter();

  const lowerCaseTaskId = taskId?.toLowerCase() || '';
  console.log('lowerCaseTaskId++++++', typeof lowerCaseTaskId);
  const [searchText, setSearchText] = useState('');
  const [titles, setTitles] = useState("");
  const [page, setPage] = useState(1);
  const [services, setServices] = useState<any[]>([]);
  console.log(services, 'services+++++++');
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  // Debounce search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchText.trim() === '') return;
      setTitles(searchText);
      setPage(1);
      setServices([]);
      setHasMore(true);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchText]);

  const { data, isLoading, error, isFetching, refetch } = useGetAllServiceQuery({
    category: lowerCaseTaskId,
    title: titles,
    page,
    limit,
  });


// initial data logging code for testing purposes
  useEffect(() => {
    console.log("DATA:", data);
    console.log("ERROR:", error);
  }, [data, error]);
  console.log(data, 'data+++++++');



  useEffect(() => {
    if (Array.isArray(data?.data?.result)) {
      if (page === 1) {
        setServices(data.data.result);
      } else {
        setServices(prev => [...prev, ...data.data.result]);
      }
      setHasMore(page < data.data.totalPages);
    }
  }, [data]);

  const handleService = (index: number, item: any) => {
    console.log("Selected item+++++++", item);

    // ✅ FIX for Expo Router: stringify params
    router.push({
      pathname: "/screens/ProfileScreen",
      params: {
        userId: String(item?.contributor?._id ?? ""),
        serviceId: String(item?._id ?? ""),
        title: String(item?.title ?? ""),
        price: String(item?.price ?? ""),
        index: String(index), // 👈 must be string
      },
    });

  };

  return (
    <View style={tw`flex-1 bg-black px-[4%]`}>
      {/* Header */}
      <View style={tw`flex-row w-full justify-between mt-4`}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={tw`bg-black rounded-full p-1`}>
          <SvgXml xml={IconBack} />
        </TouchableOpacity>
        <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
          Search Result
        </Text>
        <View style={tw`w-8`} />
      </View>

      {/* Search input */}
      <View style={tw`my-8`}>
        <InputText
          style={tw`text-white`}
          containerStyle={tw`bg-[#262329] border h-14 relative border-[#565358]`}
          labelStyle={tw`text-white font-AvenirLTProBlack mt-3`}
          placeholder={'Search by service title'}
          cursorColor={'white'}
          placeholderColor={'#949494'}
          iconLeft={IconGeneralSearch}
          readonly={false}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>

      {/* Results list */}
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() => {
              setPage(1);
              setServices([]);
              refetch();
            }}
          />
        }
        data={services}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => {
          console.log(item, 'item in flatlist+++++++');
          const contributorImage = item?.contributor?.image
            ? { uri: `${imageUrl}/${item?.contributor?.image}` }
            : require('@/src/assets/images/logo.png');

          return (
            <TouchableOpacity
              onPress={() => handleService(index, item)}
              style={tw`flex-row items-center bg-[#262329] my-1 rounded-2xl gap-2 p-2`}>
              <View style={tw`flex-row items-center`}>
                <Image
                  source={contributorImage}
                  style={tw`w-12 h-12 rounded-full mr-2`}
                  resizeMode="cover"
                />

                <View style={tw`flex-1 pb-2`}>
                  <Text style={tw`text-white font-AvenirLTProBlack`}>
                    {item?.title}
                  </Text>
                  <Text style={tw`text-white mt-2 font-AvenirLTProBlack`}>
                    {item?.subtitle}
                  </Text>
                  <Text style={tw`text-white text-xs mt-2 font-AvenirLTProBlack`}>
                    Price: ${item?.price}
                  </Text>
                </View>

                <SvgXml xml={IconRightArrow} />
              </View>
            </TouchableOpacity>
          );
        }}
        onEndReached={() => {
          if (!isFetching && hasMore && data?.data?.totalPages > page) {
            setPage(prev => prev + 1);
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetching && hasMore ? (
            <ActivityIndicator size="large" color="white" />
          ) : null
        }
      />

      <StatusBar backgroundColor="black" translucent={false} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default DiscoverResult;
