import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import InputText from '../../../components/InputText';
import tw from '../../../lib/tailwind';

import { useRegisterUserMutation } from '@/src/redux/apiSlice/authSlice';
import { router, useLocalSearchParams } from 'expo-router';
import { SvgXml } from 'react-native-svg';
import {
  IconBack,
  IconCloseEye,
  IconEnvelope,
  iconLock,
  IconOpenEye,
  IconUser
} from '../../../assets/icons/icons';
import Button from '../../../components/Button';


const SignUp = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { screenName, phoneNumber } = useLocalSearchParams();
  console.log(phoneNumber)
  // const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [isShowPassword, setIsShowPassword] = useState(false);
    const [signupError, setSignupError] = useState();
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [responsFalse, setResponsFalse] = useState();
  console.log(responsFalse, "responsFalse++++++++")
  const [SignUp, { isLoading, isError }] = useRegisterUserMutation();
  console.log('27', name, email, password, username);
  // const data = {email, password, name:username, address:location}

  const allFilled =
    email.trim() !== '' &&
    password.trim() !== '' &&
    username.trim() !== '';
  name.trim() !== '';

  console.log(allFilled, "allFilled")

  const handleSignup = async () => {
    console.log("click")
    try {
      // Validate required fields before sending the request
      if (!email || !password || !username || !name) {
        Alert.alert('Error', 'All fields are required.');
        return;
      }
      // if (allFilled) {
      //   router.push("/screens/auth/PopupScreen");
      // } else {
      //   Alert.alert('Please fill all fields');
      // }
      const formData = new FormData();
      formData.append("name", name);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      // formData.append("phone", phoneNumber);

      console.log(formData, "formdata before sending---------------")
      const response = await SignUp(formData).unwrap();
      console.log(response, "response singup=========")
      if (response?.success === true) {
        router.push({pathname: "/screens/auth/verifyScreen", params: {email: email}});
      } else if (response?.success === false) {
        setResponsFalse(response?.message)
      }

    } catch (err) {
      console.error('Error during SignUp:', err);
      setSignupError(err?.data?.message)    


    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={tw`bg-black flex-1 px-[4%] h-full justify-between`}>
      <View>
        <View style={tw`flex-row w-full justify-between mt-4`}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={tw`bg-black rounded-full p-1`}>
            <SvgXml xml={IconBack} />
          </TouchableOpacity>
          <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
            Register
          </Text>
          {/* Placeholder view for symmetry */}
          <View style={tw`w-8`} />
        </View>
        <View>
          <Text style={tw`text-primary text-xl font-AvenirLTProBlack mt-6`}>
            We are delighted that you are here
          </Text>
          <Text style={tw`text-white mt-2 font-AvenirLTProBlack mb-8`}>
            Get started in just few seconds.
          </Text>

          <View>
            <View style={tw`flex-row gap-2 w-[98%]`}>
              {/* ===============for name ================= */}
              <View style={tw`w-[50%]`}>
                <InputText
                  style={tw`text-white`}
                  cursorColor="white"
                  containerStyle={tw`bg-[#262329] h-14 border border-[#565358]`}
                  labelStyle={tw`text-white font-AvenirLTProBlack`}
                  placeholder={'Write here'}
                  placeholderColor={'#949494'}
                  label={'Name'}
                  iconRight={IconUser}
                  onChangeText={(text: any) => setName(text)}
                />
              </View>
              {/*  =============== for user name */}
              <View style={tw`w-[50%]`}>
                <InputText
                  cursorColor="white"
                  style={tw`text-white`}
                  containerStyle={tw`bg-[#262329] h-14 border border-[#565358]`}
                  labelStyle={tw`text-white font-AvenirLTProBlack`}
                  placeholder={'Write here'}
                  placeholderColor={'#949494'}
                  label={'User name'}
                  iconRight={IconUser}
                  onChangeText={(text: any) => setUsername(text)}
                />
              </View>
            </View>
            <InputText
              cursorColor="white"
              style={tw`text-white`}
              containerStyle={tw`bg-[#262329] h-14 border border-[#565358]`}
              labelStyle={tw`text-white font-AvenirLTProBlack mt-3`}
              placeholder={'Write it here'}
              placeholderColor={'#949494'}
              label={'Email'}
              iconLeft={IconEnvelope}
              onChangeText={(text: any) => setEmail(text)}
            />
              {signupError && (
              <Text style={tw`text-red-600 text-xs`}>{signupError}*</Text>
            )}
            {responsFalse === "Please verify your email" && (
              <Text style={tw`text-red-600 text-xs`}>Email already exists.*</Text>
            )}
            <InputText
              cursorColor="white"
              style={tw`text-white`}
              containerStyle={tw`bg-[#262329] h-14 border border-[#565358]`}
              labelStyle={tw`text-white font-AvenirLTProBlack mt-3`}
              placeholder={'Write it here'}
              placeholderColor={'#949494'}
              label={'Password'}
              iconLeft={iconLock}
              iconRight={isShowPassword ? IconOpenEye : IconCloseEye}
              onChangeText={(text: any) => setPassword(text)}
              isShowPassword={!isShowPassword}
              rightIconPress={() =>
                setIsShowPassword(!isShowPassword)
              }
            />
          </View>
        </View>
      </View>
      <View style={tw`flex-col justify-end my-4 `}>

        <Button
          disabled={!allFilled}
          title={isLoading ? "Wait..." : 'Register'}
          style={tw`${allFilled ? 'text-black' : 'text-gray-500'} font-AvenirLTProBlack items-center`}
          containerStyle={tw`${allFilled ? 'bg-white' : 'bg-PrimaryFocus'} mt-4 h-14 rounded-2xl justify-center`}
          onPress={handleSignup}
        />
      </View>
      <StatusBar backgroundColor="black" translucent={false} />
    </ScrollView>
  );
};

export default SignUp;
