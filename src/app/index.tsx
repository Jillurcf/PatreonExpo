import { ActivityIndicator, InteractionManager, StatusBar, StyleSheet, View } from 'react-native';
// import {getSocket, initiateSocket} from '../../redux/services/socket';

import React, { useEffect } from 'react';
// import {NavigProps} from '../../interfaces/NaviProps';
// import { getStorageToken, lStorage } from '../utils/utils';
import tw from '../lib/tailwind';
// import { useLazyGetCheckTokenQuery } from '../redux/apiSlices/authSlice';
import { useRouter } from 'expo-router';

import { usePostCheckTokenMutation } from '../redux/apiSlice/authSlice';
import { lStorage } from '../utils';
// import {getStorageToken} from '../../utils/utils';

const LoadingSplash = () => {
 
  const [postCheckToken, { data, error, isLoading }] = usePostCheckTokenMutation()
 const token = lStorage.getString("token")

 
 const router = useRouter();

 useEffect(() => {
   const task = InteractionManager.runAfterInteractions(async () => {
     try {
       const res = await postCheckToken(token);
       console.log(res, 'res after sending');
       if (res?.data?.success === true) {
         router.replace('/(drawer)/(tab)');
       } else {
        router.replace('/screens/auth/onboarding1');
       }
     } catch (err) {
       router.replace('/screens/auth/onboarding1');
     }
   });

   return () => task.cancel();
 }, []);


  return (
    <View style={tw`flex-1 w-full bg-black justify-center items-center`}>
      {/* <Image
        style={tw`w-28 h-28 flex-1 `}
        resizeMode='contain'
        // resizeMode={FastImage.resizeMode.contain}
        source={require('../assets/images/betweenLogo.jpg')}
      /> */}
      <ActivityIndicator size="large" color="#FFFFFF" />
      <StatusBar barStyle="light-content" backgroundColor={'black'} />
    </View>
  );
};

export default LoadingSplash;

const styles = StyleSheet.create({});
