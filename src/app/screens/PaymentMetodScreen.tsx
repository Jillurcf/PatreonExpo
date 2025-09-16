import { IconBack } from '@/src/assets/icons/icons';
import TButton from '@/src/components/TButton';
import tw from '@/src/lib/tailwind';
import { useGetWalletByUserQuery, usePostCreateWalletMutation } from '@/src/redux/apiSlice/paymentSlice';
import { useGetUserQuery } from '@/src/redux/apiSlice/userSlice';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SvgXml } from 'react-native-svg';





const PaymentMethodScreen = () => {
  const { data, isLoading, isError, refetch, isFetching: userIsfetching } = useGetUserQuery({});
  const { data: walletInformation, isLoading: walletLoading, isError: walletError, refetch: refetchWallet, isFetching } = useGetWalletByUserQuery({});
  const [postCreateWallet] = usePostCreateWalletMutation();
  const [walletData, setWalletData] = useState<any>(null);
  console.log(data?.data, "data======================")
  // console.log(walletInformation?.data, "walletInformation======================")

  const handleCreateWallet = async () => {
    try {
      const response = await postCreateWallet();
      console.log(response?.data?.data, "Create Wallet Response");
      setWalletData(response?.data?.data);
      await refetch()
      await refetchWallet()
    } catch (error) {
      console.error('Create Wallet Error:', error);
    }
  };

  // Condition for checking is walletInformation is exist or not
  const balance = walletInformation?.data?.balance ??
    walletInformation?.balance ??
    null;
  const hasWallet = typeof balance === 'number' && !Number.isNaN(balance);


  if (userIsfetching && !data) {
    return (
      <View style={tw`bg-black items-center justify-center flex-1`}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }
  return (
    <ScrollView
      contentContainerStyle={tw`flex-1 bg-black h-[95%] px-[4%] items-center justify-between`}>
      <View style={tw`my-10`}>
        <View style={tw`flex-row w-full justify-between mt-4`}>
          <TouchableOpacity
            onPress={() => router.push('/(drawer)/(tab)')}
            style={tw`bg-black rounded-full p-1`}>
            <SvgXml xml={IconBack} />
          </TouchableOpacity>
          <Text style={tw`text-white font-bold font-AvenirLTProBlack text-2xl`}>
            Payout Method
          </Text>
          <View style={tw`w-8`} />
        </View>

        {/* ==========================drop down area =============================== */}
        <View style={tw`mt-8`}>
          <View
            style={tw` p-2 bg-[#262329] w-full rounded-3xl py-8`}>

            {(isLoading || isFetching) ? (
              <Text style={tw`text-white text-center`}>Loading...</Text>
            ) : hasWallet ? (
              <>
                <Text
                  style={tw`text-white font-AvenirLTProBlack text-4xl text-center `}>
                  {`£${balance.toFixed(2)}`}
                </Text>
                <Text style={tw`text-white font-AvenirLTProBlack text-center mt-6`}>
                  Available for withdraw
                </Text>
              </>
            ) : (
              <Text style={tw`text-white font-AvenirLTProBlack text-center mt-6`}>
                No wallet found
              </Text>
            )

            }


          </View>
        </View>
      </View>

      {/* Continue button */}
      {userIsfetching && !data ? (
        <View style={tw`bg-black items-center justify-center flex-1`}>
          <ActivityIndicator size="large" color="gray" />
        </View>
      ) : (
        <>
          {data?.data?.wallet?.length >= 1 ? (
            <View style={tw`flex mb-6 my-12 items-center justify-center w-full`}>
              <TButton
                onPress={() => router.push("/screens/Withdrawscreen")}
                titleStyle={tw`text-black font-bold text-center`}
                title="Withdraw"
                containerStyle={tw`bg-primary w-[90%] rounded-full`}
              />
            </View>
          ) : (
            <View style={tw`flex mb-6 my-12 items-center justify-center w-full`}>
              <TButton
                onPress={handleCreateWallet}
                titleStyle={tw`text-black font-bold text-center`}
                title="Create Wallet"
                containerStyle={tw`bg-primary w-[90%] rounded-full`}
              />
            </View>
          )}
        </>
      )}




      <StatusBar backgroundColor={'gray'} translucent={false} />
    </ScrollView>
  );
};

export default PaymentMethodScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#262329',
    padding: 16,
  },
  dropdown: {
    height: 50,
    color: 'white',
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
    color: 'white',
  },
  // label: {
  //   position: 'absolute',

  //   left: 22,
  //   top: 8,
  //   zIndex: 999,
  //   paddingHorizontal: 8,
  //   fontSize: 14,
  // },
  placeholderStyle: {
    fontSize: 16,
    color: 'white',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
