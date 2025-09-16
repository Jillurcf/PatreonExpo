import { usePostCreateConnectMutation, usePostCreateRecipientMutation } from '@/src/redux/apiSlice/paymentSlice';
import { useGetUserQuery, usePatchUpdateUserProfileMutation } from '@/src/redux/apiSlice/userSlice';
import { imageUrl } from '@/src/redux/baseApi';
import * as FileSystem from "expo-file-system";
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import {
  IconBack,
  IconPencil,
  IconPlus,
} from '../../assets/icons/icons';
import TButton from '../../components/TButton';
import tw from '../../lib/tailwind';
// import { useGetUserQuery, usePatchUpdateUserProfileMutation } from '@/src/redux/apiSlice/userSlice';


const SettingProfile = () => {
  const { data, isError, refetch, isFetching } = useGetUserQuery({});
  const [loading, setLoading] = useState(false)
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [postCreateConnect] = usePostCreateConnectMutation();
  const [postCreateRecipient, { isLoading }] = usePostCreateRecipientMutation();
  const [onboardingUrl, setOnboardingUrl] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [patchUpdateUserProfile] = usePatchUpdateUserProfileMutation();
  console.log(data?.data, "data======================")
  const fullImageUrl = data?.data?.image ? `${imageUrl}/${data.data.image}` : null;

  useEffect(() => {
    data?.data?.stripeAccountId
    refetch();
  }, [data?.data]);

  const selectImage = async () => {
    console.log("click");
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      // console.log(result, "result +++++++++++++++++++");

      if (!result.canceled && result.assets.length > 0) {
        const file = result.assets[0];
        setImageUri(file.uri);

        const fileName = file.uri.split("/").pop() || "photo.jpg";
        const match = /\.(\w+)$/.exec(fileName);
        const fileType = match ? `image/${match[1]}` : `image`;

        const fileInfo = await FileSystem.getInfoAsync(file.uri);
        if (!fileInfo.exists) {
          throw new Error("File does not exist");
        }

        const formData = new FormData();
        formData.append("image", {
          uri: file.uri,
          name: fileName,
          type: fileType,
        } as any);

        const res = await patchUpdateUserProfile(formData)
        console.log("Image updated:", res);
        // const response = await fetch("http://10.0.80.85:3004/api/users/auth/update-profile-by-user", {
        //   method: "PATCH",
        //   body: formData,
        //   // ❌ Don't set Content-Type manually
        // });

        // const data = await response.json();
        console.log("Image uploaded:", data);
      }
    } catch (error) {
      console.error("Image selection error:", error);
    }
  };

  const handleGetConnect = async () => {
    console.log('🔘 Button clicked');
    setLoading(true);
    try {
      // const response = await postCreateConnect();
      const response = await postCreateRecipient().unwrap();
      // const url = response?.data?.data?.url;
      console.log(response, "recipient, response++++++");
      router.push("/screens/UpdateRecipientScreen")

      // if (url) {
      //   console.log('🌐 Onboarding URL:', url);
      //   setOnboardingUrl(url); // open in WebView
      // } else {
      //   console.warn('⚠️ Onboarding URL is undefined:', response);
      // }
    } catch (error) {
      console.error('❌ Error fetching connect URL:', error);
    } finally {
      setLoading(false);
    }
  };

  if (isFetching && !data) {
    return (
      <View style={tw`bg-black items-center justify-center flex-1`}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }
  return (
    <ScrollView style={tw`bg-black flex-1 min-h-screen `}>
      {/* Header */}
      <View style={tw`flex-row w-full justify-between mt-4 px-[4%]`}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={tw`bg-black rounded-full p-1`}>
          <SvgXml xml={IconBack} />
        </TouchableOpacity>
        <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
          Profile
        </Text>
        <View style={tw`w-8`} />
      </View>

      {/* Profile Image */}
      <View style={tw`flex items-center justify-center mt-8`}>
        <TouchableOpacity onPress={selectImage}>
          <View style={tw`relative`}>
            <View
              style={tw`w-18 h-18 bg-gray-400 rounded-full overflow-hidden mx-auto justify-center items-center`}>
              {imageUri ? (
                <Image
                  source={{ uri: imageUri }}
                  style={tw`w-full h-full`}
                  resizeMode="cover"
                />
              ) : <Image
                source={{ uri: fullImageUrl }}
                style={tw`w-full h-full`}
                resizeMode="cover"
              />}


            </View>
            <View style={tw`absolute bottom-0 right-0 bg-gray-200 rounded-full p-2`}>
              <SvgXml xml={IconPlus} width={16} height={16} />
            </View>
          </View>
        </TouchableOpacity>

        {/* User Info */}
        <Text style={tw`text-white font-AvenirLTProBlack text-lg mt-2`}>
          {data?.data?.username || 'Username'}
        </Text>
        <View style={tw`px-[4%] mt-2`}>
        {data && (
            <Text style={tw`text-white font-AvenirLTProBlack`}>
            {expanded ? data?.data?.bio : data?.data?.bio?.slice(0, 35) }
          </Text>
        )}
          {data?.data?.bio?.length > 35 && (
            <TouchableOpacity onPress={() => setExpanded(!expanded)}>
              <Text style={tw`text-blue-600 font-AvenirLTProBlack underline text-xs`}>
                {expanded ? " Show less" : "Show more..."}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Stats Box */}
      <View style={tw`flex items-center justify-center my-8`}>
        <View style={tw`bg-[#262329] w-[90%] h-20 rounded-2xl flex-row items-center justify-between`}>
          <View style={tw`border-r-2 w-[33%] h-12 border-[#091218] items-center justify-center`}>
            <TouchableOpacity>
              <Text style={tw`text-white text-center font-AvenirLTProBlack text-xl`}>
                {data?.data?.subscriptions?.length}
                {/* {data?.data?.subscriptions} */}
              </Text>
              <Text style={tw`text-white text-center font-AvenirLTProBlack`}>
                Subscriptions
              </Text>
            </TouchableOpacity>
          </View>

          <View style={tw`border-r-2 w-[33%] h-12 border-[#091218] items-center justify-center`}>
            <TouchableOpacity>
              <Text style={tw`text-white text-center font-AvenirLTProBlack text-xl`}>
                {data?.data?.subscriberCount}
              </Text>
              <Text style={tw`text-white text-center font-AvenirLTProBlack`}>
                Subscribers
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => router.push('/screens/EditProfile')}
            style={tw`w-[33%] items-center justify-center`}>
            <SvgXml xml={IconPencil} />
            <Text style={tw`text-white text-center font-AvenirLTProBlack`}>
              Edit profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* ======================= My services ========================== */}
      <View style={tw`items-center`}>
        <View style={tw`flex-row items-center bg-[#262329]  w-[90%] rounded-2xl p-[6%] justify-between px-[4%]`}>
          <View style={tw`w-[100%] items-center`}>
            <TButton
              onPress={() => router.push('/screens/MyServices')}
              title="My services"
              titleStyle={tw`text-black`}
              containerStyle={tw`w-full bg-white`}
            />
          </View>

        </View>
      </View>
      {/* Contributor Box */}
      <View style={tw`items-center justify-center`}>
        <View style={tw`bg-[#262329] w-[90%] mt-6 rounded-2xl p-[6%]`}>
          <Text style={tw`text-white text-xl text-center font-AvenirLTProBlack`}>
            Become A Contributor
          </Text>
          <Text style={tw`text-white text-center font-AvenirLTProBlack`}>
            Consult People anytime anywhere.
          </Text>
          <Text style={tw`text-white text-center font-AvenirLTProBlack`}>
            First connect your stripe account for payouts, then create your agent.
          </Text>
          <View style={tw`w-full items-center mt-8`}>
            {/* {data?.data?.attachedBankAccounts.length < 0 ? (
              <TButton
                onPress={handleGetConnect}
                title={isLoading ? "Connecting..." : "Get connet"}
                titleStyle={tw`text-white`}
                containerStyle={tw`w-full bg-red-600`}
              />
            ) : (
              data?.data?.services?.length < 1 && (
                <TButton
                  onPress={() => router.push('/screens/EnterInputScreen')}
                  title="Become a contributor"
                  titleStyle={tw`text-black`}
                  containerStyle={tw`w-full bg-white`}
                />
              )
            )} */}

            {(data?.data?.attachedBankAccounts?.length ?? 0) === 0 ? (
              <TButton
                onPress={handleGetConnect}
                title={isLoading ? "Connecting..." : "Get connect"}
                titleStyle={tw`text-white`}
                containerStyle={tw`w-full bg-red-600`}
              />
            ) : (
              (data?.data?.services?.length ?? 0) < 1 && (
                <TButton
                  onPress={() => router.push('/screens/EnterInputScreen')}
                  title="Become a contributor"
                  titleStyle={tw`text-black`}
                  containerStyle={tw`w-full bg-white`}
                />
              )
            )}

          </View>

        </View>
      </View>

      <StatusBar backgroundColor="black" translucent />
    </ScrollView>
  );
};

export default SettingProfile;

const styles = StyleSheet.create({});
