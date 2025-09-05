import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import InputText from '../../../components/InputText';
import tw from '../../../lib/tailwind';

import { getStorageToken, lStorage, setStorageToken } from '@/src/utils';
import { router } from 'expo-router';
import { SvgXml } from 'react-native-svg';
import {
  IconBack,
  IconCloseEye,
  IconEnvelope,
  iconLock,
  IconOpenEye
} from '../../../assets/icons/icons';
import Button from '../../../components/Button';
// import { useLoginUserMutation } from '@/src/redux/apiSlice/authSlice';
import { useLoginUserMutation } from '@/src/redux/apiSlice/authSlice';

// import {useSignupMutation} from '../../redux/api/apiSlice/apiSlice';

const Login = ({navigation} : {navigation: any}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [checkValue, setCheckValue] = useState(false);
  const [loginError, setLoginError] = useState();
  console.log(loginError, "loginError")
  const [loginUser, { isLoading, isError }] = useLoginUserMutation();
  console.log('27', email, password);
  // const data = {email, password, name:username, address:location}

  const allFilled =
    email.trim() !== '' &&
    password.trim() !== ''

  console.log(allFilled, "allFilled")

  const handleLogin = async () => {
    if (!email || !password) {
      //   setAllFieldModalVisible(true)
      return;
    }
    // const fcmtoken = lStorage.getString('fcmToken')
    // console.log("fcmToken", fcmtoken)
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    // formData.append('device_token', fcmtoken)

    console.log('FormData before sending:', formData);

    try {
      console.log("Try catch click")
      const res = await loginUser(formData).unwrap();
      //   setLoginError(res)
      console.log("login res++++++++", res?.data?.token)
      if (res?.data?.token) {
        lStorage.setString('token', res?.data?.token);
        setStorageToken(res?.data?.token);
        const token = getStorageToken();
        console.log(token, "token++++++ after set")
        router.replace('/');
        router.replace('/(drawer)/(tab)');
      }

      console.log('Login successful:', res);

    } catch (error) {
      console.error('Login failed:', error);
      setLoginError(error?.data?.message);
    }
  };



  //     return (
  //         <ScrollView
  //             keyboardShouldPersistTaps="always"
  //             showsVerticalScrollIndicator={false}
  //             contentContainerStyle={tw`bg-black flex-1 px-[4%] h-full justify-between`}>
  //             <View>
  //                 <View style={tw`flex-row w-full justify-between mt-4`}>
  //                     <TouchableOpacity
  //                         onPress={() => router.back()}
  //                         style={tw`bg-PrimaryFocus rounded-full p-1`}>
  //                         <SvgXml xml={IconBack} />
  //                     </TouchableOpacity>
  //                     <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
  //                         Login into your account!
  //                     </Text>
  //                     {/* Placeholder view for symmetry */}
  //                     <View style={tw`w-8`} />
  //                 </View>
  //                 <View>


  //                     <View style={tw`mt-12`}>
  //                         <InputText
  //                             cursorColor="white"
  //                             style={tw`text-white`}
  //                             containerStyle={tw`bg-none h-14 border-b border-[#565358]`}
  //                             labelStyle={tw`text-white font-AvenirLTProBlack mt-3`}
  //                             placeholder={'Write it here'}
  //                             placeholderColor={'#949494'}
  //                             label={'Email'}
  //                             iconLeft={IconEnvelope}
  //                             // iconRight={isShowPassword ? iconLock : iconLock}
  //                             onChangeText={(text: any) => setEmail(text)}
  //                         // isShowPassword={!isShowPassword}
  //                         // rightIconPress={() => setIsShowPassword(!isShowPassword)}
  //                         />
  //                         <InputText
  //                             cursorColor="white"
  //                             selectionColor="white"
  //                             style={tw`text-white`}
  //                             containerStyle={tw`bg-none bg-black h-14 border-b border-[#565358]`}
  //                             labelStyle={tw`text-white font-AvenirLTProBlack mt-3`}
  //                             placeholder={'Write it here'}
  //                             placeholderColor={'#949494'}
  //                             label={'Password'}
  //                             iconLeft={iconLock}
  //                             iconRight={isShowPassword ? IconOpenEye : IconCloseEye}
  //                             onChangeText={(text: any) => setPassword(text)}
  //                             isShowPassword={!isShowPassword}
  //                             rightIconPress={() =>
  //                                 setIsShowPassword(!isShowPassword)
  //                             }
  //                         />

  //                     </View>
  //                     <View style={tw``}>
  //                         <Text style={tw`text-white`}>By logging in you accept our TOS & PP</Text>

  //                     </View>
  //                     <TouchableOpacity
  //                         onPress={() =>
  //                             router.push({
  //                                 pathname: "/screens/auth/phoneVerification",
  //                                 params: { screenName: "forgetPass" }
  //                             })
  //                         }
  //                         style={tw`mt-8`}>
  //                         <Text style={tw`text-white`}>Forget password</Text>
  //                     </TouchableOpacity>
  //                 </View>
  //             </View>
  //             <View style={tw`flex-col justify-end `}>
  //                 {loginError && (
  //                     <Text style={tw`text-red-500 text-center mb-4`}>
  //                         {loginError}*
  //                     </Text>
  //                 )}
  //                 <Button
  //                     disabled={!allFilled}
  //                     title={isLoading ? "Wait..." : 'Continue'}
  //                     style={tw`${allFilled ? 'text-black' : 'text-gray-500'} font-AvenirLTProBlack items-center`}
  //                     containerStyle={tw`${allFilled ? 'bg-white' : 'bg-PrimaryFocus'} my-4 h-14 rounded-2xl justify-center`}
  //                     onPress={handleLogin}
  //                 />
  //             </View>
  //             <StatusBar backgroundColor="black" translucent={false} />
  //         </ScrollView>
  //     );
  // };

  // export default Login;


  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={tw`flex-grow bg-black px-[4%] justify-between min-h-screen`}
    >
      {/* Top Section */}
      <View>
        <View style={tw`flex-row w-full justify-between mt-4`}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={tw`bg-PrimaryFocus rounded-full p-1`}
          >
            <SvgXml xml={IconBack} />
          </TouchableOpacity>
          <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
            Login into your account!
          </Text>
          <View style={tw`w-8`} />
        </View>

        <View style={tw`mt-12`}>
          <InputText
            cursorColor="white"
            style={tw`text-white`}
            containerStyle={tw`bg-none h-14 border-b border-[#565358]`}
            labelStyle={tw`text-white font-AvenirLTProBlack mt-3`}
            placeholder={'Write it here'}
            placeholderColor={'#949494'}
            label={'Email'}
            iconLeft={IconEnvelope}
            onChangeText={setEmail}
          />

          <InputText
            cursorColor="white"
            selectionColor="white"
            style={tw`text-white`}
            containerStyle={tw`bg-none h-14 border-b border-[#565358]`}
            labelStyle={tw`text-white font-AvenirLTProBlack mt-3`}
            placeholder={'Write it here'}
            placeholderColor={'#949494'}
            label={'Password'}
            iconLeft={iconLock}
            iconRight={isShowPassword ? IconOpenEye : IconCloseEye}
            onChangeText={setPassword}
            isShowPassword={!isShowPassword}
            rightIconPress={() => setIsShowPassword(!isShowPassword)}
          />
        </View>
        <View style={tw`flex-row gap-1`}>
          <Text style={tw`text-white text-xs font-AvenirLTProBlack`}>Do not have an account please </Text>
          <TouchableOpacity onPress={()=> router.push({pathname: "/screens/auth/Signup",  params: { screenName: "signup" }})}>
            <Text style={tw`text-gray-400 text-xs underline font-AvenirLTProBlack`}>Signup</Text>
          </TouchableOpacity>

        </View>

        <View style={tw`mt-4 flex-row gap-2`}>
          <Text style={tw`text-white font-AvenirLTProBlack`}>
            By logging in you accept our  
          </Text>
          <TouchableOpacity 
          onPress={()=> router.push('/screens/TermsAndCondition')}
          >
            <Text style={tw`text-gray-400 font-AvenirLTProBlack underline`}>TOS</Text>
          </TouchableOpacity>
          <Text style={tw`text-white font-AvenirLTProBlack`}>&</Text>
          <TouchableOpacity
           onPress={()=> router.push('/screens/PrivacyPolicay')}
          >
            <Text style={tw`text-gray-400 font-AvenirLTProBlack underline`}>PP</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: '/screens/auth/EmailVeriificationScreen',
              params: { screenName: 'forgetPass' },
            })
          }
          style={tw`mt-4`}
        >
          <Text style={tw`text-white font-AvenirLTProBlack`}>Forget password</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Section */}
      <View style={tw`flex-col justify-end`}>
        {loginError ? (
          <Text style={tw`text-red-500 text-center mb-4`}>
            {loginError}*
          </Text>
        ) : null}

        <Button
          disabled={!allFilled}
          title={isLoading ? 'Wait...' : 'Continue'}
          style={tw`${allFilled ? 'text-black' : 'text-gray-500'} font-AvenirLTProBlack items-center`}
          containerStyle={tw`${allFilled ? 'bg-white' : 'bg-PrimaryFocus'} my-4 h-14 rounded-2xl justify-center`}
          onPress={handleLogin}
        />
      </View>

      <StatusBar backgroundColor="black" translucent={false} />
    </ScrollView>
  );
};

export default Login;