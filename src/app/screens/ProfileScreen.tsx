
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import NormalModal from '@/src/components/NormalModal';
import TButton from '@/src/components/TButton';
import tw from '@/src/lib/tailwind';
import {
  usePostCreateTransactionMutation,
  usePostPaymentMethodsMutation,
} from '@/src/redux/apiSlice/paymentSlice';
import { useGetServicesByIdQuery, useGettMyServicesQuery, useUnSubscribeServicesMutation } from '@/src/redux/apiSlice/serviceSlice';
import { useGetSingleUserQuery, useGetUserQuery } from '@/src/redux/apiSlice/userSlice';
import { imageUrl } from '@/src/redux/baseApi';
import { getServiceData } from '@/src/utils';
import { router, useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';
const { height } = Dimensions.get('screen');

const SUCCESS_HOST = 'patreonexpo://checkout/success';
const CANCEL_HOST = 'patreonexpo://checkout/cancel';

const ProfileScreen = () => {
  const { userId, serviceId, title, price } = useLocalSearchParams() || {};
console.log(serviceId, "serviceId+++++++++");
  const [postPaymentMethods] = usePostPaymentMethodsMutation();
  const [postCreateTransaction] = usePostCreateTransactionMutation();
  const { data, error, isLoading } = useGetSingleUserQuery(userId, {
    skip: !userId,
  });
  console.log(data?.data?.services[0], '=======================data');
  const { data: loginUserData, refetch: fetchLoginUser, isFetching } = useGetUserQuery({});
  // console.log(data, ' data+++++++++');
  const { data: serviceData, refetch: refetchServiceData } = useGetServicesByIdQuery(data?.data?.services[0], {
    skip: !data?.data?.services,
  })
  const { data: myService } = useGettMyServicesQuery({});
  // console.log(data?.data, ' Subscriber+++++++++');
  const [unSubscribeServices] = useUnSubscribeServicesMutation();
  // const [serviceData, setServiceData] = React.useState<any>(null);
  // console.log(serviceData?.data?.explainMembership, 'serviceData++++++');
  const [expanded, setExpanded] = useState(false);
  const [subscriptionError, setSubcriptionError] = useState();
  const [subcriptionErrorFromRes, setSubcriptionErrorFromRes] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);
  // console.log(subscribed, "subscribed++++++");
  const [unsubscribeModalVisible, setUnsubscribeModalVisible] = useState(false);
  const webviewRef = useRef<WebView>(null);
  const handledRef = useRef(false);
  const [reloadKey, setReloadKey] = useState(0);
  console.log(subcriptionErrorFromRes, "subcriptionErrorFromRes+++++++++")
  const serviceIdfromUser = data?.data?.services[0];
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

  const fullImageUrl = data?.data?.image
    ? `${imageUrl}/${data.data.image}`
    : null;

  useEffect(() => {
    const fetchServiceData = async () => {
      const data = await getServiceData();
      if (data) {
        setServiceData(data);

      }
    }
    fetchServiceData();
  }, []);

  
  // Trigger Stripe Checkout inside WebView
  const handleSubscribe = async () => {
    console.log("click")
    try {
      const res = await postPaymentMethods(serviceId)
      const url = res?.data?.url;
      console.log(res, " res+++++")
      console.log(res?.data?.url, "subscription res+++++")
      if (res?.error) {
        setSubcriptionErrorFromRes(res?.error?.data?.message)
      }
      if (url) {
        // console.log('🌍 Opening Checkout WebView:', url);
        setCheckoutUrl(url); // open WebView
      } else {
        // console.warn('⚠️ Checkout URL missing in response:', res);
      }
    } catch (error: any) {
      // console.error('❌ Error creating Checkout session:', error?.data?.message);
      setSubcriptionError(error?.data?.message || 'Error initiating checkout');
    }
  };

  // Handle WebView navigation to detect success/cancel
  const handleWebViewNavigation = useCallback(
    async (navState: any) => {
      const url = navState?.url ?? '';
      // console.log('🌐 WebView Navigation:', url);

      if (url) {
        // if (handledRef.current) return; // prevent multiple triggers
        // handledRef.current = true;

        const match = url.match(/[?&]session_id=([^&]+)/);
        const sessionId = match ? decodeURIComponent(match[1]) : null;

        if (sessionId) {
          try {
            const formData = new FormData();
            formData.append('serviceId', serviceId);
            formData.append('sessionId', sessionId);

            const res = await postCreateTransaction(formData).unwrap();
            console.log('✅ Transaction Created:', res?.success === true);
            if (res?.success === true) {
              setCheckoutUrl(null);
              await refetchServiceData();
              router.push('/screens/PaymentResult');
            }

          } catch (err) {
            console.error('❌ Transaction creation failed:', err);
            setCheckoutUrl(null);
            // router.push('/screens/PaymentFailed');
          }
        }
        return;
      }

      if (url.startsWith(CANCEL_HOST)) {
        console.warn('⚠️ User cancelled');
        setCheckoutUrl(null);
        router.push('/screens/DiscoverResult');
        return;
      }
    },
    [serviceId, postCreateTransaction, router]
  );

  // If checkoutUrl is set, render WebView instead of main profile
  if (checkoutUrl) {
    return (
      <WebView
        key={reloadKey}
        source={{ uri: checkoutUrl }}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
        cacheEnabled={false}
        allowsInlineMediaPlayback={true}
        setSupportMultipleWindows={false}
        onNavigationStateChange={handleWebViewNavigation}
        onError={(e) => {
          const code = e.nativeEvent.code;
          if (code === -1017) {
            // console.warn('⚠️ Parse error, switching to Safari');
            Linking.openURL(checkoutUrl);
          } else {
            console.error('❌ WebView error:', e.nativeEvent);
          }
        }}
      />


    );
  }

  const confirmUnsubscribe = async () => {
    try {
      // Call unsubscribe mutation

      const res = await unSubscribeServices(serviceId).unwrap();
      console.log('✅ Unsubscribed successfully:', res);
      if (res?.success === true) {
        setUnsubscribeModalVisible(false);
        fetchLoginUser();
        await refetchServiceData();
        setSubscribed(false);
      }
      // router.replace('/screens/DiscoverResult');

    } catch (error) {
      console.error('❌ Unsubscribe failed:', error);
    }
  }

  const handleUnSubscribe = async () => {
    setUnsubscribeModalVisible(true);

  }

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
            style={tw`border-r-2 w-[50%] h-12 border-[#565358] items-center justify-center`}>
            <Text style={tw`text-white text-center font-AvenirLTProBlack text-xl`}>
              {/* {data?.data?.subscriberCount || '0'} */}
              {/* {myService?.data[0].subscribers?.length || 0} */}
              {serviceData?.data?.subscribers?.length || '0'}
            </Text>
            <Text style={tw`text-white text-center font-AvenirLTProBlack`}>
              Subscribers  </Text>
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
          <View style={tw`mt-2`}>
            <FlatList
              data={serviceData?.data?.explainMembership}
              renderItem={({ item }) => {
                console.log(item, "item++++++")
                return (
                  <View style={tw`flex-row gap-4 items-center my-1`}>
                    <SvgXml xml={IconDot} />
                    <Text style={tw`text-white text-xl font-AvenirLTProBlack`}>
                      {item || 'No Data available'}
                    </Text>
                  </View>
                )
              }}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={tw`bg-[#262329]`}
              style={tw`h-40`}
            />
          </View>
        </View>
      </View>

      {/* Subscribe Button */}
      <View style={tw`w-full items-center my-6`}>
        {subscriptionError === "Contributor has not completed Stripe onboarding and does not have a wallet too" && (
          <Text style={tw`text-red-600 text-xs`}>Service not updated yet*</Text>
        )}
        {subcriptionErrorFromRes && (
          <Text style={tw`text-red-600 text-xs mb-2`}>{subcriptionErrorFromRes}*</Text>
        )}
        {subscribed ? (
          <TButton
            // disabled={subscribed || data === undefined}
            onPress={handleUnSubscribe}
            title={subscribed ? "Unsubscribe" : data?.data?.services[0] === undefined ? "Not Available" : "Subscribe"}
            titleStyle={tw`text-black`}
            containerStyle={tw`w-[90%] bg-white`}
          />
        ) : (
          <TButton
            disabled={subscribed || data?.data?.services[0] === undefined}
            onPress={handleSubscribe}
            title={subscribed ? "Unsubscribe" : data?.data?.services[0] === undefined ? "Not Available" : "Subscribe"}
            titleStyle={tw`text-black`}
            containerStyle={tw`w-[90%] bg-white`}
          />
        )}

      </View>
      <NormalModal
        layerContainerStyle={tw`flex-1 justify-center items-center `}
        containerStyle={tw`rounded-xl bg-[#141316] w-[80%] `}
        visible={unsubscribeModalVisible}
        setVisible={setUnsubscribeModalVisible}
      >
        <View>
          <Text style={tw`text-white text-lg text-center font-AvenirLTProBlack mb-2`}>
            Are you sure to {"\n"}Unsubscribe?
          </Text>

          <View style={tw`mt-2`}>
            <View style={tw`items-center mb-4`}>
              <TButton
                title="Yes"
                titleStyle={tw`text-[#262329] text-[16px] font-AvenirLTProBlack`}
                containerStyle={tw`w-[100%] bg-white `}
                onPress={confirmUnsubscribe}
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
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});

