import Button from '@/src/components/Button';
import NormalModal from '@/src/components/NormalModal';
import { useDeleteAccountMutation } from '@/src/redux/apiSlice/userSlice';
import { lStorage } from '@/src/utils';
import CookieManager from '@react-native-cookies/cookies';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import {
  IconBack,
  IconDeleteUser,
  IconLanguage,
  IconPaymentMethod,
  IconRightArrow,
  IconTermsAndCondition
} from '../../assets/icons/icons';
import tw from '../../lib/tailwind';
// import RadioButtonRN from 'radio-buttons-react-native';

type Props = {};

const Settings = () => {
  const [delteConfirmationModalVisible, setDeleteConfirmationModalVisible] =
    useState(false);
    const [deleteAccount, {refetch}] = useDeleteAccountMutation();


  
  const handleDelete = async () => {
    console.log("click delete")
    const deleteRes = await deleteAccount()
    console.log(deleteRes, "delete res+++++++++")
    // await refetch()
    // console.log('Logout pressed');
    router.push('/screens/auth/onboarding1')
    lStorage.removeItem('token')
    CookieManager.clearAll()

  }
  return (
    <View style={tw`flex-1 bg-black px-[4%] `}>
      <View style={tw`flex-row w-full justify-between mt-4`}>
        <TouchableOpacity
          onPress={() => {
            router.back()
          }}
          style={tw`bg-PrimaryFocus rounded-full p-1`}>
          <SvgXml xml={IconBack} />
        </TouchableOpacity>
        <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
          Settings
        </Text>
        {/* Placeholder view for symmetry */}
        <View style={tw`w-8`} />
      </View>
      {/* ======================================setting menu area ======================= */}

      <View style={tw`items-center justify-center my-6`}>
        <View style={tw`bg-[#262329] w-[100%] rounded-2xl p-4  my-2`}>
          <TouchableOpacity
            onPress={() => router.push('/screens/TermsAndCondition')}
            style={tw`flex-row gap-3 items-center`}>
            <View
              style={tw`bg-[#565358] w-8 h-8 rounded-full items-center justify-center`}>
              <SvgXml style={tw``} xml={IconTermsAndCondition} />
            </View>
            <View style={tw`flex-row items-center justify-between w-[80%]`}>
              <Text style={tw`text-white font-AvenirLTProBlack`}>
                Terms and agreements
              </Text>
              <SvgXml width={20} xml={IconRightArrow} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/screens/Language')}
            style={tw`flex-row gap-3 items-center mt-6`}>
            <View
              style={tw`bg-[#565358] w-8 h-8 rounded-full items-center justify-center`}>
              <SvgXml style={tw``} xml={IconLanguage} />
            </View>
            <View style={tw`flex-row items-center justify-between w-[80%]`}>
              <Text style={tw`text-white font-AvenirLTProBlack`}>Language</Text>
              <SvgXml width={20} xml={IconRightArrow} />
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => router.push('/screens/NotificationSettings')}
            style={tw`flex-row gap-3 items-center mt-6`}>
            <View
              style={tw`bg-[#565358] w-8 h-8 rounded-full items-center justify-center`}>
              <SvgXml style={tw``} xml={IconSettingNotificaiton} />
            </View>
            <View style={tw`flex-row items-center justify-between w-[80%]`}>
              <Text style={tw`text-white font-AvenirLTProBlack`}>
                Notification
              </Text>
              <SvgXml width={20} xml={IconRightArrow} />
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => router.push("/screens/PaymentMetodScreen")}
            style={tw`flex-row gap-3 items-center mt-6`}>
            <View
              style={tw`bg-[#565358] w-8 h-8 rounded-full items-center justify-center`}>
              <SvgXml style={tw``} xml={IconPaymentMethod} />
            </View>
            <View style={tw`flex-row items-center justify-between w-[80%]`}>
              <Text style={tw`text-white font-AvenirLTProBlack`}>
                Payout
              </Text>
              <SvgXml width={20} xml={IconRightArrow} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setDeleteConfirmationModalVisible(true)}
            style={tw`flex-row gap-3 items-center mt-6`}>
            <View
              style={tw`bg-[#565358] w-8 h-8 rounded-full items-center justify-center`}>
              <SvgXml style={tw``} xml={IconDeleteUser} />
            </View>
            <View style={tw`flex-row items-center justify-between w-[80%]`}>
              <Text style={tw`text-white font-AvenirLTProBlack`}>
                Delete account
              </Text>
              <SvgXml width={20} xml={IconRightArrow} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <NormalModal
        layerContainerStyle={tw`flex-1 justify-center items-center mx-5`}
        containerStyle={tw`rounded-xl bg-zinc-900 p-5`}
        visible={delteConfirmationModalVisible}
        setVisible={setDeleteConfirmationModalVisible}>
        <View>
          <Text style={tw`text-red-600 text-xs text-center font-RoboBold mb-2`}>
            Sure! you want to delete the account?
          </Text>

          <View style={tw`mt-2`}>
            <View style={tw`border-t-2 border-gray-800 w-full`}>

            </View>
            <View style={tw`border-t-2 border-b-2 flex-row gap-6 items-center justify-center border-slate-800 w-full`}>
              <Button
                title="Yes"
                style={tw`text-white px-6`}
                containerStyle={tw`bg-gray-900`}
                onPress={handleDelete}
              />
              <Button
                title="No"
                style={tw`text-white px-6`}
                containerStyle={tw`bg-gray-900`}
                onPress={() => setDeleteConfirmationModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </NormalModal>
      <StatusBar backgroundColor="black" translucent />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
