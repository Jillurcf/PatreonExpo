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

import { useChangePasswordMutation } from '@/src/redux/apiSlice/authSlice';
import { router, useLocalSearchParams } from 'expo-router';
import { SvgXml } from 'react-native-svg';
import {
    IconBack,
    IconCloseEye,
    iconLock,
    IconOpenEye
} from '../../../assets/icons/icons';
import Button from '../../../components/Button';

// import {useSignupMutation} from '../../redux/api/apiSlice/apiSlice';

const ForgetPass = ({ navigation }: any) => {
    // console.log('navigation', navigation);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [checkValue, setCheckValue] = useState(false);
    const { screenName, phoneNumber } = useLocalSearchParams();
    console.log(phoneNumber, "phoneNumber++++++")
    const [changePassword, { isLoading, isError }] = useChangePasswordMutation();
    const [errorMessage, setErrorMessage] = useState()
    // console.log('27', password, confirmPassword);
    // const data = {email, password, name:username, address:location}
    console.log(errorMessage?.data?.message, "errorMessage+++++")
    const allFilled =
        password.trim() !== ''
    confirmPassword.trim() !== ''

    console.log(allFilled, "allFilled")

    const handleChangePassword = async () => {
        console.log('clicked');
        try {
            console.log('handleChangePassword called');
            const formData = new FormData();
            formData.append('phoneNumber', phoneNumber);
            formData.append('password', password);
            formData.append('confirmPassword', confirmPassword);
            console.log(formData, "formData+++++")
            const response = await changePassword(formData)
            // console.log('Response:', response);

            // const response = await fetch("http://10.10.10.70:3004/api/auth/reset-password", {
            //     method: "POST",
            //     body: formData,
            //     // ❌ Don't set Content-Type manually
            //   });
            console.log(response, "response+++++")
            // Validate required fields before sending the request
            if (response?.status === 200) {
                router.push("/screens/auth/login");
            } else {
                console.log('Please fill all fields');
                setErrorMessage(response?.error)
            }

        } catch (err) {
            console.log('Error:=============', err);
            // Alert.alert('Error', 'An error occurred while changing password');
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
                        Reset your password
                    </Text>
                    {/* Placeholder view for symmetry */}
                    <View style={tw`w-8`} />
                </View>
                <View>


                    <View style={tw`mt-12`}>

                        <InputText
                            cursorColor="white"
                            style={tw`text-white`}
                            containerStyle={tw`bg-none h-14 border-b border-[#565358]`}
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
                        <InputText
                            cursorColor="white"
                            style={tw`text-white`}
                            containerStyle={tw`bg-none h-14 border-b border-[#565358]`}
                            labelStyle={tw`text-white font-AvenirLTProBlack mt-3`}
                            placeholder={'Write it here'}
                            placeholderColor={'#949494'}
                            label={'Confirm Password'}
                            iconLeft={iconLock}
                            iconRight={isShowConfirmPassword ? IconOpenEye : IconCloseEye}
                            onChangeText={(text: any) => setConfirmPassword(text)}
                            isShowPassword={!isShowConfirmPassword}
                            rightIconPress={() =>
                                setIsShowConfirmPassword(!isShowConfirmPassword)
                            }
                        />
                    </View>


                </View>
            </View>

            <View style={tw`flex-col justify-end `}>
                {errorMessage?.data?.message && (
                    <Text style={tw`text-red-600 text-xs`}>{errorMessage?.data?.message}*</Text>
                )}

                <Button
                    disabled={!allFilled}
                    title={'Continue'}
                    style={tw`${allFilled ? 'text-black' : 'text-gray-500'} font-AvenirLTProBlack items-center`}
                    containerStyle={tw`${allFilled ? 'bg-white' : 'bg-PrimaryFocus'} mt-4 h-14 rounded-2xl justify-center`}
                    onPress={handleChangePassword}

                />
            </View>
            <StatusBar backgroundColor="black" translucent={false} />
        </ScrollView>
    );
};

export default ForgetPass;
