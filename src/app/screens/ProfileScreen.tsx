// import React, { useCallback, useEffect, useState } from 'react';
// import { Dimensions, Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
// import { SvgXml } from 'react-native-svg';




// import { FlatList } from 'react-native-gesture-handler';

// import { IconBack, IconDot } from '@/src/assets/icons/icons';
// import TButton from '@/src/components/TButton';
// import tw from '@/src/lib/tailwind';
// import { usePostCreateTransactionMutation, usePostPaymentMethodsMutation } from '@/src/redux/apiSlice/paymentSlice';
// import { useGetSingleUserQuery } from '@/src/redux/apiSlice/userSlice';
// import { imageUrl } from '@/src/redux/baseApi';
// import { getServiceData } from '@/src/utils';
// import { router, useLocalSearchParams } from 'expo-router';
// import WebView from 'react-native-webview';

// const { width, height } = Dimensions.get("screen")
// type Props = {};

// const ProfileScreen = ({ navigation }: { navigation: any }) => {
//   const { userId, serviceId, title, price } = useLocalSearchParams();
//   console.log(userId, serviceId, title, price, "id++++++");
//   const [onboardingUrl, setOnboardingUrl] = useState<string | null>(null);
//   const [postPaymentMethods,] = usePostPaymentMethodsMutation();
//   const [postCreateTransaction] = usePostCreateTransactionMutation()
//   const [connected, setConnected] = useState()
//   console.log(userId, serviceId, title, "id++++++18");
//   const { data, isLoading, isError, refetch } = useGetSingleUserQuery(userId);
//   console.log(data, '=======================data')
//   const [serviceData, setServiceData] = React.useState<any>(null);
//   const [resSessionId, setResSessionId] = useState<string | null>(null);
//   console.log(serviceData, "serviceData++++++");
//   console.log(resSessionId, "resSessionId++++++");
//   const fullImageUrl = data?.data?.image ? `${imageUrl}/${data.data.image}` : null;
//   useEffect(() => {
//     const service = getServiceData();
//     setServiceData(service);
//   }, []);
//   // console.log(id, "id++++++");
//   const handleSubscribe = async () => {
//     console.log("clicked");
//     console.log('Subscribe button pressed');
//     try {
//       // const formData = new FormData();

//       const res = await postPaymentMethods(serviceId).unwrap();
//       console.log("res", res, "res++++++");
//       console.log("res", res?.url)
//       const url = res?.url;
//       if (url) {
//         console.log('Onboarding URL:', url);
//         setOnboardingUrl(url); // Store URL in state
//       } else {
//         console.warn('Onboarding URL is undefined:', res);
//       }
//     } catch (error) {
//       console.log(error);
//     }

//   };

//   //  const handleWebViewNavigation = async (event: any) => {
//   //     console.log('WebView Navigation State:+++++++++++++++++++++', event);
//   //     console.log(event.url.includes('success'), "success");
//   //     // if (event.url.includes('your-app-success-url')) {
//   //     if (event.url.includes('success')) {
//   //       console.log('Onboarding Successful! Fetching account status...');
//   //       setConnected(event.url.includes('success'))
//   //       // const urlParams = new URLSearchParams(new URL(event.url).search);
//   //       // const email = urlParams.get('email') as string; // Type assertion

//   //       // console.log('Extracted Email:', email);
//   //       // Fetch Stripe Account Status
//   //       // try {
//   //       //   const accountStatus = await checkConnet();
//   //       //   console.log('Account Status:', accountStatus);

//   //       //   // Replace with actual screen
//   //       // } catch (error) {
//   //       //   console.error('Error checking account status:', error);
//   //       // }

//   //       // Close the WebView
//   //       setOnboardingUrl(null);
//   //     }
//   //     // useEffect(()=> {
//   //     //   setTimeout(()=> {
//   //     //     refetch()
//   //     //   })
//   //     // }, [1000])

//   //     useFocusEffect(() => {
//   //       console.log('refetch call');
//   //       refetch();
//   //     });

//   //     if (event.url.includes('your-app-failure-url')) {
//   //       console.warn('Onboarding Failed');
//   //       setOnboardingUrl(null);
//   //     }
//   //   };

//   // const handleWebViewNavigation = useCallback(
//   //   async (event: any) => {
//   //     const url = event?.url || '';
//   //     console.log('WebView Navigation State:=============+', event?.url);

//   //     if (event?.canGoBack === true) {
//   //       setTimeout(() => {
//   //         router.push('/(drawer)/(tab)');
//   //       }, 300);
//   //     }

//   //     if (url.includes('session_id=')) {
//   //       console.log('Stripe Redirect Detected. Session ID present.');

//   //       const match = url.match(/[?&]session_id=([^&]+)/);
//   //       const sessionId = match ? decodeURIComponent(match[1]) : null;
//   //       console.log('Extracted Session ID:', sessionId);
//   //       setResSessionId(sessionId);
//   //       setOnboardingUrl(null);

//   //       try {
//   //         const formData = new FormData();
//   //         formData.append('serviceId', serviceId);
//   //         formData.append('sessionId', sessionId ?? "");
//   //         // formData.append('amount', price?.toString());
//   //         // formData.append('status', 'succeeded');
//   //         console.log(formData, 'Form Data for Transaction Creation');

//   //         const res = await postCreateTransaction(formData).unwrap();
//   //         console.log(res, 'Transaction Created Successfully');

//   //         setTimeout(() => {
//   //           router.push('/screens/PaymentResult');
//   //         }, 300);
//   //       } catch (error) {
//   //         console.error('Transaction creation failed:', error);
//   //         // navigation.navigate('PaymentFailed');
//   //       }
//   //     }

//   //     if (url.includes('cancel') || url.includes('failure')) {
//   //       console.warn('User cancelled or error occurred');
//   //       setOnboardingUrl(null);

//   //       setTimeout(() => {
//   //         router?.push('/screens/DiscoverResult');
//   //       }, 300);
//   //     }
//   //   },
//   //   [router, setOnboardingUrl, serviceId, price, postCreateTransaction]
//   // );
//   const SUCCESS_HOST = 'myapp://checkout/success'; // or https://your.domain/stripe/success
//   const CANCEL_HOST = 'myapp://checkout/cancel';  // or https://your.domain/stripe/cancel

//   const handleWebViewNavigation = useCallback(async (event: any) => {
//     const url = event?.url ?? '';
//     console.log('WebView nav:', url);

//     // Success
//     if (url.startsWith(SUCCESS_HOST)) {
//       const match = url.match(/[?&]session_id=([^&]+)/);
//       const sessionId = match ? decodeURIComponent(match[1]) : null;
//       console.log('Extracted Session ID:', sessionId);

//       if (sessionId) {
//         try {
//           const formData = new FormData();
//           formData.append('serviceId', serviceId);
//           formData.append('sessionId', sessionId);
//           const res = await postCreateTransaction(formData).unwrap();
//           console.log(res, 'Transaction Created Successfully');
//           router.push('/screens/PaymentResult');
//         } catch (err) {
//           console.error('Transaction creation failed:', err);
//           // router.push('/screens/PaymentFailed');
//         }
//       }
//       return;
//     }

//     // Cancel
//     if (url.startsWith(CANCEL_HOST)) {
//       console.warn('User cancelled');
//       router.push('/screens/DiscoverResult');
//       return;
//     }
//   }, [router, serviceId, postCreateTransaction]);


//   if (onboardingUrl) {
//     return (
//       // <WebView
//       //   source={{ uri: onboardingUrl }}
//       //   style={{ flex: 1, width: "100%", height: height * 0.7 }}
//       //   onNavigationStateChange={handleWebViewNavigation}
//       // />
//       <WebView
//         source={{ uri: onboardingUrl }}   // from your backend session response
//         onNavigationStateChange={handleWebViewNavigation}
//         startInLoadingState
//         javaScriptEnabled
//         domStorageEnabled
//         sharedCookiesEnabled
//         thirdPartyCookiesEnabled
//         setSupportMultipleWindows
//         onShouldStartLoadWithRequest={(req) => {
//           // Always allow Stripe and your redirect URLs
//           // Optionally block unknown domains
//           return true;
//         }}
//         // (Optional) helps with some iOS quirks
//         applicationNameForUserAgent="YourAppName"
//       />

//     );
//   }

//   // {{onboardingUrl && (
//   //   <WebView
//   //     source={{ uri: onboardingUrl }}
//   //     onNavigationStateChange={handleWebViewNavigation}
//   //     startInLoadingState
//   //     javaScriptEnabled
//   //     domStorageEnabled
//   //   />
//   // )}}



//   return (
//     <View style={tw`bg-black flex-1`}>
//       <View style={tw`flex-row w-full justify-between mt-4 px-[4%]`}>
//         <TouchableOpacity
//           onPress={() => {
//             navigation?.goBack()
//           }}
//           style={tw`bg-PrimaryFocus rounded-full p-1`}>
//           <SvgXml xml={IconBack} />
//         </TouchableOpacity>
//         {/* <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
//           Notification
//         </Text> */}
//         {/* Placeholder view for symmetry */}
//         <View style={tw`w-8`} />
//       </View>
//       <View style={tw`flex items-center justify-center mt-8`}>
//         <Image style={tw`rounded-full`} width={80} height={80} source={{ uri: fullImageUrl }} />
//         <Text style={tw`text-white font-AvenirLTProBlack text-lg mt-2`}>
//           {data?.data?.username || 'Username'}
//         </Text>
//         <Text style={tw`text-white font-AvenirLTProBlack   `}>
//           {data?.data?.bio || 'Bio'}
//         </Text>
//       </View>
//       <View style={tw`flex items-center justify-center my-8`}>
//         <View
//           style={tw`bg-[#262329] w-[90%] h-20 rounded-2xl justify-between flex-row items-center`}>
//           <View
//             style={tw`border-r-2 w-[50%] h-12 border-[#091218] items-center justify-center`}>
//             <Text
//               style={tw`text-white text-center font-AvenirLTProBlack text-xl`}>
//               {data?.data?.subscriberCount || '0'}
//             </Text>
//             <Text style={tw`text-white text-center font-AvenirLTProBlack`}>
//               Subscribers
//             </Text>
//           </View>
//           <View style={tw`w-[50%]`}>
//             <Text
//               style={tw`text-white text-center font-AvenirLTProBlack text-xl`}>
//               {data?.data?.services.length || '0'}
//             </Text>
//             <Text style={tw`text-white text-center font-AvenirLTProBlack`}>
//               Services
//             </Text>
//           </View>
//         </View>
//       </View>
//       <View style={tw`px-[6%]`}>
//         <Text style={tw`text-white font-AvenirLTProBlack`}>
//           {serviceData?.about || 'Bio'}
//         </Text>
//       </View>
//       <View style={tw`items-center justify-center`}>
//         <View style={tw`bg-[#262329] w-[90%] mt-6 rounded-2xl p-[6%]`}>
//           <Text style={tw`text-white text-xl font-AvenirLTProBlack`}>
//             Memership Details
//           </Text>
//           <Text style={tw`text-white font-AvenirLTProBlack`}>
//             $150 Transaction/3 months
//           </Text>
//           <FlatList
//             data={serviceData?.explainMembership}
//             renderItem={({ item }) => (
//               <View style={tw`flex-row gap-4 items-center my-1`}>
//                 <SvgXml xml={IconDot} />
//                 <Text style={tw`text-white text-xl font-AvenirLTProBlack`}>
//                   {item}
//                 </Text>
//               </View>
//             )}
//             keyExtractor={(item, index) => index.toString()}
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={tw`bg-[#262329]`}
//             style={tw`h-40`}
//           />
//         </View>
//       </View>
//       <View style={tw`w-full items-center my-6`}>
//         <TButton
//           onPress={handleSubscribe}
//           //   onPress={() => navigation?.navigate(
//           //  'Payment',
//           //   {
//           //       userId: userId, // ✅ Pass the userId you already have
//           //       serviceId: serviceId,
//           //       title: title,
//           //     }
//           //   )}
//           title="Subscribe"
//           titleStyle={tw`text-black`}
//           containerStyle={tw`w-[90%] bg-white`}
//         />

//       </View>
//       <StatusBar backgroundColor="black" translucent />
//     </View>
//   );
// };

// export default ProfileScreen;

// const styles = StyleSheet.create({});
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';

import { IconBack, IconDot } from '@/src/assets/icons/icons';
import TButton from '@/src/components/TButton';
import tw from '@/src/lib/tailwind';
import {
  usePostCreateTransactionMutation,
  usePostPaymentMethodsMutation,
} from '@/src/redux/apiSlice/paymentSlice';
import { useGetSingleUserQuery } from '@/src/redux/apiSlice/userSlice';
import { imageUrl } from '@/src/redux/baseApi';
import { getServiceData } from '@/src/utils';
import { router, useLocalSearchParams } from 'expo-router';

const { height } = Dimensions.get('screen');

const SUCCESS_HOST = 'patreonexpo://checkout/success';
const CANCEL_HOST = 'patreonexpo://checkout/cancel';

const ProfileScreen = () => {
  const { userId, serviceId, title, price } = useLocalSearchParams();
  const [postPaymentMethods] = usePostPaymentMethodsMutation();
  const [postCreateTransaction] = usePostCreateTransactionMutation();
  const { data } = useGetSingleUserQuery(userId);
  const [serviceData, setServiceData] = React.useState<any>(null);
  const [expanded, setExpanded] = useState(false);
  const [subscriptionError, setSubcriptionError] = useState()
  console.log(subscriptionError, "subscription error")
  const fullImageUrl = data?.data?.image
    ? `${imageUrl}/${data.data.image}`
    : null;

  useEffect(() => {
    const service = getServiceData();
    setServiceData(service);
  }, []);

  // --- Handle Stripe Deep Link Redirects ---
  useEffect(() => {
    const handleDeepLink = async (event: Linking.EventType) => {
      const url = event.url;
      console.log('🔗 Deep link received:', url);

      if (url.startsWith(SUCCESS_HOST)) {
        const match = url.match(/[?&]session_id=([^&]+)/);
        const sessionId = match ? decodeURIComponent(match[1]) : null;

        if (sessionId) {
          try {
            const formData = new FormData();
            formData.append('serviceId', serviceId);
            formData.append('sessionId', sessionId);

            const res = await postCreateTransaction(formData).unwrap();
            console.log('✅ Transaction Created:', res);

            // Alert.alert('Success', 'Transaction completed successfully!');
            router.push('/screens/PaymentResult');
          } catch (err) {
            console.error('❌ Transaction creation failed:', err);
            router.push('/screens/PaymentFailed');
          }
        }
      }

      if (url.startsWith(CANCEL_HOST)) {
        console.warn('⚠️ User cancelled');
        router.push('/screens/DiscoverResult');
      }
    };

    const sub = Linking.addEventListener('url', handleDeepLink);
    return () => sub.remove();
  }, [postCreateTransaction, serviceId]);

  // --- Trigger Stripe Checkout using Expo WebBrowser ---
  const handleSubscribe = async () => {
    try {
      const res = await postPaymentMethods(serviceId).unwrap();
      const url = res?.url;

      if (url) {
        console.log('🌍 Opening Checkout:', url);
        // Open in-app browser using Expo WebBrowser
        const result = await WebBrowser.openBrowserAsync(url);
        console.log('WebBrowser result:', result);
      } else {
        console.warn('⚠️ Checkout URL missing in response:', res);
      }
    } catch (error) {
      console.error('❌ Error creating Checkout session:', error?.data?.message);
      setSubcriptionError(error?.data?.message)
    }
  };

  return (
    <ScrollView style={tw`bg-black flex-1`}>
      {/* Header */}
      <View style={tw`flex-row w-full justify-between mt-4 px-[4%]`}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={tw`bg-black rounded-full p-1`}>
          <SvgXml xml={IconBack} />
        </TouchableOpacity>
        <View style={tw`w-8`} />
      </View>

      {/* Profile Info */}
      <View style={tw`flex items-center justify-center mt-8`}>
        {fullImageUrl ? (<Image
          style={tw`rounded-full`}
          width={80}
          height={80}
          source={{ uri: fullImageUrl }}
        />) : (<Image
          style={tw`rounded-full`}
          width={80}
          height={80}
          source={require('../../assets/images/alteravater.png')}
        />)}
        <Text style={tw`text-white font-AvenirLTProBlack text-lg mt-2`}>
          {data?.data?.username || 'Username'}
        </Text>
        <View style={tw`px-[4%] mt-2`}>
          <Text style={tw`text-white font-AvenirLTProBlack   `}>
            {expanded ? data?.data?.bio : data?.data?.bio?.slice(0, 35) || 'Bio'}
          </Text>
          {data?.data?.bio?.length > 35 && (
            <TouchableOpacity onPress={() => setExpanded(!expanded)}>
              <Text style={tw`text-blue-600 font-AvenirLTProBlack underline text-xs`}>
                {expanded ? " Show less" : "Show more..."}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Stats */}
      <View style={tw`flex items-center justify-center my-8`}>
        <View
          style={tw`bg-[#262329] w-[90%] h-20 rounded-2xl justify-between flex-row items-center`}>
          <View
            style={tw`border-r-2 w-[50%] h-12 border-[#091218] items-center justify-center`}>
            <Text style={tw`text-white text-center font-AvenirLTProBlack text-xl`}>
              {data?.data?.subscriberCount || '0'}
            </Text>
            <Text style={tw`text-white text-center font-AvenirLTProBlack`}>
              Subscribers
            </Text>
          </View>
          <View style={tw`w-[50%]`}>
            <Text style={tw`text-white text-center font-AvenirLTProBlack text-xl`}>
              {data?.data?.services?.length || '0'}
            </Text>
            <Text style={tw`text-white text-center font-AvenirLTProBlack`}>
              Services
            </Text>
          </View>
        </View>
      </View>

      {/* About Service */}
      <View style={tw`px-[6%]`}>
        <Text style={tw`text-white font-AvenirLTProBlack`}>
          {serviceData?.about || 'Bio'}
        </Text>
      </View>

      {/* Membership Details */}
      <View style={tw`items-center justify-center`}>
        <View style={tw`bg-[#262329] w-[90%] mt-6 rounded-2xl p-[6%]`}>
          <Text style={tw`text-white text-xl font-AvenirLTProBlack`}>
            Membership Details
          </Text>
          <Text style={tw`text-white font-AvenirLTProBlack`}>
            ${price || 150} Transaction/3 months
          </Text>
          <FlatList
            data={serviceData?.explainMembership}
            renderItem={({ item }) => (
              <View style={tw`flex-row gap-4 items-center my-1`}>
                <SvgXml xml={IconDot} />
                <Text style={tw`text-white text-xl font-AvenirLTProBlack`}>
                  {item}
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`bg-[#262329]`}
            style={tw`h-40`}
          />
        </View>
      </View>

      {/* Subscribe Button */}
      <View style={tw`w-full items-center my-6`}>
        {subscriptionError === "Contributor has not completed Stripe onboarding and does not have a wallet too" && (
          <Text style={tw`text-red-600 text-xs`}>Service not updated yet*</Text>
        )}
        <TButton
          onPress={handleSubscribe}
          title="Subscribe"
          titleStyle={tw`text-black`}
          containerStyle={tw`w-[90%] bg-white`}
        />
      </View>

      <StatusBar backgroundColor="black" translucent />
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});

