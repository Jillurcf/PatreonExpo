import { IconBack } from '@/src/assets/icons/icons';
import NormalModal from '@/src/components/NormalModal';
import TButton from '@/src/components/TButton';
import tw from '@/src/lib/tailwind';
import { useGlobalPayoutMutation } from '@/src/redux/apiSlice/paymentSlice';
import { useGetUserQuery } from '@/src/redux/apiSlice/userSlice';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SvgXml } from 'react-native-svg';

const WithdrawScreen = () => {
  const { data: withdrawData, isError, refetch } = useGetUserQuery({});
  const [globalPayout, { isLoading }] = useGlobalPayoutMutation();
  // console.log(withdrawData?.data?.attachedBankAccounts, "withdrawData======================")
  const [value, setValue] = useState(null);
  const [error, setError] = useState(false);
  const [payoutConfirmationModalVisible, setPayoutConfirmationModalVisible] =
    useState(false);
  const [amount, setAmount] = useState('');
  const [country, setCountry] = useState('');
  const [payoutErrror, setPayoutErrror] = useState<string | null>(null);

  const [latestBankAccount, setLatestBankAccount] = useState<string | null>(null);

  const bankAccounts = withdrawData?.data?.attachedBankAccounts?.map((acc: string, index: number) => ({
    label: acc,
    value: acc,
  })) ?? [];

  // console.log(latestBankAccount, "bankAccounts value")
  useEffect(() => {
    if (bankAccounts.length > 0) {
      const lastValue = bankAccounts[bankAccounts.length - 1].value;
      setLatestBankAccount(lastValue);
      console.log(lastValue, "lastIndex value");
    } else {
      setLatestBankAccount(null);
    }
  }, [bankAccounts]);
  const allField = amount && country;


  const handlePayout = async () => {

    try {

      console.log('Payout initiated with:', { accountId: value, amount, country });
      const data = {
        amount: amount,
        bankAccountId: latestBankAccount,
        currency: country,
      }
      const payoutResponse = await globalPayout(
        data
      )
      console.log(payoutResponse?.error?.data?.error?.error?.message, "Payout Response");
      if (payoutResponse?.data?.success === true || payoutResponse?.success === true) {
        setPayoutConfirmationModalVisible(true);
        setValue(null);
        setAmount('');
        setCountry('');
        setError(null);
      } else if (payoutResponse?.error?.data?.message) {
        setError(payoutResponse?.error?.data?.error?.error?.message);
      }
      // Reset fields after successful payout

      // Alert.alert('Success', 'Payout initiated successfully');
    } catch (error) {
      console.error('Payout error:', error);
      setPayoutErrror(error?.data?.message);
    }
  };
  return (
    <ScrollView
      contentContainerStyle={tw`flex-1 bg-black h-[95%] px-[4%] items-center justify-between`}>
      <View style={tw`my-10`}>
        <View style={tw`flex-row w-full justify-between mt-4`}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={tw` rounded-full p-1`}>
            <SvgXml xml={IconBack} />
          </TouchableOpacity>
          <Text style={tw`text-white font-bold font-AvenirLTProBlack text-2xl`}>
            Withdraw
          </Text>
          <View style={tw`w-8`} />
        </View>

        <View style={tw`mt-8`}>
          <Text style={tw`text-white mt-4`}>Amount</Text>
          <TextInput
            style={tw`text-white rounded-xl p-2 mb-4 bg-[#262329] mt-1`}
            placeholder="Enter Amount"
            placeholderTextColor={'#A9A8AA'}
            cursorColor="white"
            onChangeText={text => setAmount(text)}
          />

          <Text style={tw`text-white`}>Currency
          </Text>
          <TextInput
            style={tw` text-white rounded-xl p-2 mb-4 bg-[#262329] mt-1`}
            placeholder="gbp"
            placeholderTextColor={'#A9A8AA'}
            cursorColor="white"
            onChangeText={text => setCountry(text)}
          />
        </View>
      </View>


      {/* Continue button */}
      <View style={tw`flex mb-6 my-12 items-center justify-center w-full`}>
        {error && error === "Outbound payment cannot be created because Confirmation of Payee is not accepted." && (
          <View style={tw`mb-4`}>
            <Text style={tw`text-red-600 tex-xs`}>{error}* </Text>
            <TouchableOpacity onPress={() => router.push({pathname: '/(drawer)/HelpAndSupport', params: { sub: 'Confirmation of Payee Issue', body: 'I am facing an issue with Confirmation of Payee while trying to make a payout. Please assist me in resolving this issue.'}})}>
              <Text style={tw`text-blue-400 tex-xs underline`}>Please Contact Support</Text>
            </TouchableOpacity>
          </View>
        )}
        {payoutErrror && (
          <Text style={tw`text-red-500 text-start text-xs my-2`}>
            {payoutErrror}*
          </Text>
        )}
        <TButton
          onPress={handlePayout}
          disabled={!allField || isLoading}
          titleStyle={tw`text-black font-bold text-center`}
          title={
            isLoading ? (
              <View style={tw`flex-row items-center justify-center`}>
                <Text> Please wait...</Text>
                <ActivityIndicator size="small" color="black" style={tw`mr-2`} />

              </View>
            ) : (
              "Continue"
            )
          }
          containerStyle={tw`bg-primary w-[90%] rounded-full`}
        />
      </View>
      <NormalModal
        layerContainerStyle={tw`flex-1 justify-center items-center `}
        containerStyle={tw`rounded-xl bg-[#141316] w-[80%] `}
        visible={payoutConfirmationModalVisible}
        setVisible={setPayoutConfirmationModalVisible}>
        <View>
          <Text style={tw`text-white text-2xl text-center font-AvenirLTProBlack mb-2`}>
            Payout successful!
          </Text>

          <View style={tw`mt-2`}>

            <View style={tw`items-center mb-4`}>
              <TButton
                title="Done"
                titleStyle={tw`text-[#262329] text-[16px] font-AvenirLTProBlack`}
                containerStyle={tw`w-[100%] bg-white `}
                onPress={() => {
                  setPayoutConfirmationModalVisible(false);
                  router.back();
                }}
              />
            </View>
          </View>
        </View>
      </NormalModal>
      <StatusBar backgroundColor={'gray'} translucent={false} />
    </ScrollView>
  );
};

export default WithdrawScreen;

const styles = StyleSheet.create({

  dropdown: {
    height: 50,
    color: 'white',
    borderColor: 'red',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '',
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
    color: 'white',
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
