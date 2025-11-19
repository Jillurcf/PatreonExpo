import NormalModal from '@/src/components/NormalModal';
import TButton from '@/src/components/TButton';
import { usePostLogoutMutation } from '@/src/redux/apiSlice/authSlice';
import { useDeleteAccountMutation } from '@/src/redux/apiSlice/userSlice';
import { removeStorageToken } from '@/src/utils';
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
  const [deleteAccount, { refetch }] = useDeleteAccountMutation();
  const [postLogout] = usePostLogoutMutation();



  const handleDelete = async () => {
    console.log("click delete")
    const deleteRes = await deleteAccount()
    console.log(deleteRes, "delete res+++++++++")
    // await refetch()
    // console.log('Logout pressed');
    router.push('/screens/auth/onboarding1')
    removeStorageToken("token")
    const res = await postLogout()
    console.log(res, "logout res+++++++++")
    // await refetch()
    // lStorage.removeItem('token')
    // CookieManager.clearAll()

  }
  return (
    <View style={tw`flex-1 bg-black px-[4%] `}>
      <View style={tw`flex-row w-full justify-between mt-4`}>
        <TouchableOpacity
          onPress={() => {
            router.back()
          }}
          style={tw`bg-black rounded-full p-1`}>
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
        layerContainerStyle={tw`flex-1 justify-center items-center `}
        containerStyle={tw`rounded-xl bg-[#141316] w-[80%] `}
        visible={delteConfirmationModalVisible}
        setVisible={setDeleteConfirmationModalVisible}>
        <View>
          <Text style={tw`text-white text-xl text-center font-RoboBold mb-2`}>
            Are you Sure to {"\n"}Delete the account?
          </Text>

          <View style={tw`mt-2`}>

            <View style={tw`items-center mb-4`}>
              <TButton
                title="Yes"
                titleStyle={tw`text-[#262329] text-[16px] font-AvenirLTProBlack`}
                containerStyle={tw`w-[100%] bg-white `}
                onPress={handleDelete}
              />
               </View>
              <View style={tw`items-center w-full`}>
                <TButton
                  title="No"
                  titleStyle={tw`text-white text-[16px] font-AvenirLTProBlack`}
                  containerStyle={[tw`w-[100%]`, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
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
