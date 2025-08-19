import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import tw from '../../../lib/tailwind';
import IconArrow from '../../../components/IconArrow';
import TButton from '../../../components/TButton';
import { SvgXml } from 'react-native-svg';
import {
  IconBack,
  IconBell,
  IconGoogle,
  iconTick,
  iconTickFocus,
  IconTik,
} from '../../../assets/icons/icons';
import { useNavigation } from '@react-navigation/native';
import IwtButton from '../../../components/IwtButton';
import { router, useLocalSearchParams } from 'expo-router';
import { usePhoneNoVerificationMutation } from '@/src/redux/apiSlice/authSlice';

type Props = {};

const PhoneVerification = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);
  const { screenName } = useLocalSearchParams();
  console.log(screenName, "ForgetPass")

  const [phoneNoVerification, isLoading, isError] = usePhoneNoVerificationMutation()
  const fullPhoneNumber = phoneInput.current?.getNumberAfterPossiblyEliminatingZero()?.formattedNumber;
  console.log(fullPhoneNumber);
  console.log("phone", value, fullPhoneNumber);

  const handlePhoneVerification = async () => {
    if (!fullPhoneNumber) {
      console.warn("Phone number is invalid or undefined");
      return;
    }
  
    let attempts = 0;
    let success = false;
  
    while (attempts < 2 && !success) {
      try {
        const formData = new FormData();
        formData.append("phone", fullPhoneNumber);
  
        const res = await phoneNoVerification(formData).unwrap();
        console.log(`Phone verification response (attempt ${attempts + 1}):`, res);
  
        if (res?.success) {
          success = true;
  
          router.push({
            pathname: '/screens/auth/verifyScreen',
            params: { screenName, phoneNumber: fullPhoneNumber },
          });
          return; // Stop execution after successful navigation
        }
      } catch (err) {
        console.error(`Verification error (attempt ${attempts + 1}):`, err);
      }
  
      attempts++;
  
      // Optional: wait 1s before next attempt
      if (!success) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  
    // if (!success) {
    //   Alert.alert("Verification Failed", "Unable to send verification code. Please try again.");
    // }
  };
  



    return (
      <View style={tw`flex-1 bg-black mt-4`}>
        {/* ============================ Back Option ========================== */}
        <View style={tw`flex-row w-full justify-between px-[4%] mt-4`}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={tw`bg-PrimaryFocus rounded-full p-1`}>
            <SvgXml xml={IconBack} />
          </TouchableOpacity>
          <View></View>
          {/* <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>Login</Text> */}
          {/* Placeholder view for symmetry */}
          <View style={tw`w-8`} />
        </View>

        {/* ============================== Text Option =========================== */}
        <View style={tw`flex justify-center px-[4%] mt-10`}>
          {/* <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
          Welcome back, Sabri!
        </Text> */}
          <Text style={tw`text-white font-AvenirLTProBlack text-lg mt-4`}>
            Please verify your phone number.
          </Text>
        </View>

        <View style={tw`bg-black flex-1 justify-center`}>
          <View style={tw`rounded-lg bg-black w-full px-[4%]`}>
            <Text style={tw`text-white font-AvenirLTProBlack py-4`}>
              Phone number
            </Text>
            <SafeAreaView>
              {showMessage && (
                <View style={styles.message}>
                  <Text style={tw`text-white`}>Value: {value}</Text>
                  <Text style={tw`text-white`}>
                    Formatted Value: {formattedValue}
                  </Text>
                  <Text style={tw`text-white`}>
                    Valid: {valid ? 'true' : 'false'}
                  </Text>
                </View>
              )}
              <PhoneInput
                placeholder="Write it here"
                textInputProps={{
                  placeholderTextColor: '#A9A8AA', // Fixed placeholder text color
                }}
                filterProps={tw`text-white`}
                flagButtonStyle={tw`text-white bg-slate-50`}
                countryPickerProps={tw`text-white`}
                codeTextStyle={tw`bg-red-200 hidden`}
                textContainerStyle={tw`bg-[#262329] h-16 rounded-r-3xl`}
                containerStyle={tw`bg-black rounded-3xl border w-full border-[#565358]`}
                countryPickerButtonStyle={tw`rounded-l-3xl bg-[#262329]`}
                textInputStyle={tw`rounded-3xl text-white h-10`}

                ref={phoneInput}
                defaultValue={value}
                defaultCode="DM"
                layout="first"
                onChangeText={text => setValue(text)}
                onChangeFormattedText={text => setFormattedValue(text)}
                renderDropdownImage={<IconArrow size={12} color="white" />}
                withDarkTheme
                withShadow
                autoFocus
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  const checkValid = phoneInput.current?.isValidNumber(value);
                  setShowMessage(true);
                  setValid(checkValid ? checkValid : false);
                }}>
                {/* Uncomment the text below if you wish to have a Check button */}
                {/* <Text style={tw`text-white`}>Check</Text> */}
              </TouchableOpacity>
            </SafeAreaView>
            <TButton
              onPress={handlePhoneVerification}

              titleStyle={tw`text-black items-center justify-center font-bold font-AvenirLTProHeavy text-center mx-auto`}
              title="Continue"
              containerStyle={tw`bg-white w-[100%] h-16 my-2 items-center rounded-3xl`}
            />
          </View>
          {/* <View style={tw`flex-row items-center gap-4 px-[2%] my-6`}>
          <SvgXml xml={iconTickFocus} />

          <Text style={tw`text-white font-AvenirLTProBlack text-left`}>
            By logging in you accept our TOS & PP
          </Text>
        </View> */}
        </View>
        <View style={tw`w-full items-center`}>
          <IwtButton
            svg={IconGoogle}
            containerStyle={tw`bg-PrimaryFocus items-center justify-center w-[90%] my-2 rounded-full`}
            titleStyle={tw`text-white font-bold font-AvenirLTProHeavy text-center mx-auto`}
          />
          <Text style={tw`text-white font-AvenirLTProBlack mb-6`}>Don't have a account? Sign up</Text>
        </View>
        <StatusBar backgroundColor="black" translucent />
      </View>
    );
  };

  export default PhoneVerification;

  const styles = StyleSheet.create({
    message: {
      marginBottom: 10,
    },
    button: {
      // Define button styles if needed
    },
  });
