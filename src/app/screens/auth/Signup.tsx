import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import tw from '../../../lib/tailwind';
import InputText from '../../../components/InputText';

import { Checkbox } from 'react-native-ui-lib';
import Button from '../../../components/Button';
import { SvgXml } from 'react-native-svg';
import {
  IconBack,
  IconEnvelope,
  IconGoogle,
  iconLock,
  IconUser,
} from '../../../assets/icons/icons';
import TButton from '../../../components/TButton';
import { router } from 'expo-router';
import { useRegisterUserMutation } from '@/src/redux/apiSlice/authSlice';


const SignUp = ({ navigation }: any) => {
  // console.log('navigation', navigation);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [SignUp, {isLoading, isError}] = useRegisterUserMutation();
  console.log('27',name, email, password, username);
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
      console.log(formData, "formdata before sending---------------")
      const response = await SignUp(formData).unwrap();
      console.log(response?.success, "response singup=========")
      if(response?.success === true){
        router.push("/screens/auth/PopupScreen");
      }
     
    } catch (err) {
      console.error('Error during SignUp:', err);

     
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
            style={tw`bg-PrimaryFocus rounded-full p-1`}>
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
              // iconRight={isShowPassword ? iconLock : iconLock}
              onChangeText={(text: any) => setEmail(text)}
              // isShowPassword={!isShowPassword}
              // rightIconPress={() => setIsShowPassword(!isShowPassword)}
            />
            <InputText
              cursorColor="white"
              style={tw`text-white`}
              containerStyle={tw`bg-[#262329] h-14 border border-[#565358]`}
              labelStyle={tw`text-white font-AvenirLTProBlack mt-3`}
              placeholder={'Write it here'}
              placeholderColor={'#949494'}
              label={'Password'}
              iconLeft={iconLock}
              // iconRight={isShowConfirmPassword ? iconLock : iconLock}
              onChangeText={(text: any) => setPassword(text)}
              isShowPassword={!isShowConfirmPassword}
              rightIconPress={() =>
                setIsShowConfirmPassword(!isShowConfirmPassword)
              }
            />
          </View>
        </View>
      </View>
      <View style={tw`flex-col justify-end `}>
        <Button
          disabled={!allFilled}
          title={'Register'}
          style={tw`${allFilled ? 'text-black' : 'text-gray-500'} font-AvenirLTProBlack items-center`}
          containerStyle={tw`${allFilled ? 'bg-white' : 'bg-PrimaryFocus'} mt-4 h-14 rounded-2xl justify-center`}
          onPress={ handleSignup}
        />
      </View>
      <StatusBar backgroundColor="black" translucent={false} />
    </ScrollView>
  );
};

export default SignUp;
