import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import tw from '../../lib/tailwind';

import { SvgXml } from 'react-native-svg';
import Button from '../../components/Button';
import InputText from '../../components/InputText';

import { IconBack } from '@/src/assets/icons/icons';
import { useHelpAndSupportMutation } from '@/src/redux/apiSlice/userSlice';
import { router } from 'expo-router';
import { CustomAlert } from '../../components/CustomAlert';

const HelpSupport = ({ navigation }: any) => {
  const [subject, setSubject] = useState('');
  const [desc, setDesc] = useState('');
  const [helpAndSupport, { isLoading, isError }] = useHelpAndSupportMutation();
  const [errorMessage, setEroorMessage] = useState('');
  console.log(errorMessage, 'error message');

  const [alertVisible, setAlertVisible] = useState(false);

  const showCustomAlert = () => {
    setAlertVisible(true);
  };

  const closeCustomAlert = () => {
    setAlertVisible(false);
  };

  const handleSend = async () => {
    console.log('click help center');
    try {
      const formData = new FormData();
      formData.append('title', subject);
      formData.append('description', desc);
      console.log('formdata sending', formData);
      const res = await helpAndSupport(formData).unwrap();
      console.log(res, 'help center response +++++++++++++');
      if (res?.success === true) {
        setAlertVisible(true);
        setSubject('')
        setDesc('')
      }
    } catch (error) {
      setEroorMessage(error?.message);
      console.log('Please send again', error);
    }
  };

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#064145" />
        <Text style={tw`text-primary mt-2`}>Loading ...</Text>
      </View>
    );
  }

  return (
    <View style={tw`h-full bg-black px-[4%] pb-4`}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <View style={tw`flex-row w-full justify-between px-[4%] mt-4`}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={tw`bg-PrimaryFocus rounded-full p-1`}>
            <SvgXml xml={IconBack} />
          </TouchableOpacity>
          <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
            Help and Support
          </Text>
          {/* Placeholder view for symmetry */}
          <View style={tw`w-8`} />
        </View>
        <View style={tw`mt-8 gap-y-2`}>

          <InputText
            placeholder={"Enter the subject"}
            value={subject}
            placeholderColor={'#949494'}
            label={'Subject'}
            onChangeText={(text: any) => setSubject(text)}
            labelStyle={tw`text-white font-AvenirLTProBlack`}
            containerStyle={tw`border border-[#565358] h-10`}

          />

          {errorMessage && errorMessage?.subject && (
            <Text style={tw`text-red-500 text-xs`}>{errorMessage?.subject[0]}*</Text>
          )}

          <InputText
            placeholder={"Enter the description"}
            value={desc}
            placeholderColor={'#949494'}
            label={"Description"}
            // {'Descrivi il tuo prodotto'}
            onChangeText={(text: any) => setDesc(text)}
            style={tw`h-48 text-white`}
            placeholderAlignment={'top'}
            labelStyle={tw`text-white font-AvenirLTProBlack`}
            containerStyle={tw`border border-[#565358] `
            }
            numberOfLines={20}
            maxLength={3000}
            cursorColor="white"
          />
          {errorMessage && errorMessage?.description && (
            <Text style={tw`text-red-500 text-xs`}>{errorMessage?.description[0]}*</Text>
          )}
        </View>
      </ScrollView>

      <Button
        containerStyle={tw`h-10 rounded-2xl items-center `}
        title={isLoading ? "Wait..." : 'Submit'}
        style={tw`text-black font-AvenirLTProBlack items-center mt-1`}
        onPress={handleSend}
      />
      <CustomAlert
        visible={alertVisible}
        message="Message sent"
        onClose={closeCustomAlert}
      />
    </View>
  );
};

export default HelpSupport;
