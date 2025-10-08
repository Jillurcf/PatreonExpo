import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import { IconBack, IconGeneralSearch, IconRightArrow } from '@/src/assets/icons/icons';
import InputText from '@/src/components/InputText';
import tw from '@/src/lib/tailwind';
import { useGetAllUserQuery } from '@/src/redux/apiSlice/userSlice';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { SvgXml } from 'react-native-svg';
import { imageUrl } from '../../redux/baseApi';


type Props = {};

const HomeSearchResult = () => {
    const navigation = useNavigation();
    const [successModal, setSuccessModal] = useState(false);
    const [search, setSearch] = useState('');

    console.log("Search input:", search);

    const [showDropdown, setShowDropdown] = useState(false);
    // const { data, isLoading, isError } = useGetAllCategoryQuery({});
    const { data, isLoading, isError } = useGetAllUserQuery(search, {
        skip: !search // Skip query if no search text
    });


    console.log("User search result:", data?.data?.result);


    // const fullImageUrl = data?.data?.image ? `${imageUrl}/${data.data.image}` : null;
    // const DiscoverData = [
    //     { id: '1', title: 'marketing', route: '', icon: IconMarketing, iconType: 'image' },
    //     { id: '2', title: 'finnance', route: '', icon: IconFinance, iconType: 'image' },
    //     { id: '3', title: 'law', route: '', icon: IconLaw, iconType: 'image' },
    //     { id: '4', title: 'economy', route: '', icon: IconEconomy, iconType: 'image' },
    //     { id: '5', title: 'writing', route: '', icon: IconWriting, iconType: 'image' },
    //     { id: '6', title: 'business', route: '', icon: IconBusiness, iconType: 'image' },
    // ];
    const { width, height } = Dimensions.get('screen');
    const handlePress = (route: string, title: string, taskId: string, icon: string) => {
        console.log('route', route);
        console.log('taskId', taskId);
        console.log('title', title);
        if (taskId === '3') {
            setSuccessModal(true);
        } else {
            router.push("/screens/DiscoverResult", {
                ttile: title,
                taskId: taskId,
                route: route
            }
            );
        }
    };
    // const handleTransfer = () => {
    //   navigation.navigate('cashTransfer');
    // };
    // const renderImage = (imagePath: string) => {
    //   const uri = `${imageUrl}/${imagePath}`;
    //   const isSvg = imagePath?.toLowerCase().endsWith('.svg');

    //   if (isSvg) {
    //     return <SvgUri uri={uri} width={24} height={24} />;
    //   } else {
    //     return <Image source={{ uri }} style={tw`w-6 h-6`} resizeMode="contain" />;
    //   }
    // };

    return (
        <View style={tw`bg-black flex-1 px-[4%] `}>
            <View style={tw`flex-row w-[95%] mt-[4%] items-center`}>
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            router.back();
                        }}
                        style={tw`bg-black rounded-full p-2`}>
                        <SvgXml xml={IconBack} />
                    </TouchableOpacity>
                </View>
                <View style={tw`w-[90%] mt-2`}>
                    <InputText
                        style={tw`text-white`}
                        cursorColor="whtie"
                        containerStyle={tw`bg-[#262329] border h-12 relative border-[#565358]`}
                        labelStyle={tw`text-white font-AvenirLTProBlack mt-3`}
                        placeholder={'Search by user name'}
                        placeholderColor={'#949494'}
                        iconLeft={IconGeneralSearch}
                        onChangeText={(text) => {
                            setSearch(text);
                            setShowDropdown(!!text); // Show dropdown if there's input
                        }}
                    />
                </View>

            </View>

            <ScrollView style={tw`mt-4`}>
                {showDropdown && search.length > 0 && (
                    <View style={tw``}>
                        {isLoading ? (
                            <Text style={tw`text-white`}>Loading...</Text>
                        ) : data?.data?.result.length === 0 ? (
                            <Text style={tw`text-white`}>No users found</Text>
                        ) : (
                            data?.data?.result?.map((user) => {
                                console.log(user?.services, "user from discover+++++++++++++++")
                                return (
                                    <TouchableOpacity
                                        key={user.id}
                                        onPress={() => {
                                            setShowDropdown(false);
                                            // setSearch('');
                                            router.push({
                                                pathname: '/screens/ProfileScreen', params: {
                                                    userId: user?._id, serviceId: user?.services[0]?._id, title: user?.services[0]?.title
                                                }
                                            }); // 👈 Pass full user data
                                        }}
                                        style={tw`p-4 bg-[#262329] my-1 rounded-3xl`}
                                    >
                                        <View style={tw`flex-row justify-center items-center gap-4`}>
                                            <Image source={{ uri: `${imageUrl}/${user?.image}` }} style={tw`w-12 h-12 rounded-full`} />
                                            {/* <Text style={tw`text-white`}>{user.username}</Text> */}
                                            <View style={tw`flex-row justify-between items-center w-[80%]`}>
                                                <View style={tw`flex-col gap-2`}>
                                                    {/* <Text style={tw`text-white`}>{user.name || "No user name found"}</Text> */}
                                                    <Text style={tw`text-[#FFFFFF] font-AvenirLTProBlack text-[16px]`}>{user.services[0]?.title || "No service"}</Text>
                                                    <Text style={tw`text-[#C9C8C9] font-AvenirLTProLight text-[12px]`}>
                                                        {user.services?.length > 0 && user.services[0]?.description
                                                            ? user.services[0].description.slice(0, 20)
                                                            : ''}
                                                    </Text>

                                                </View>
                                                <SvgXml xml={IconRightArrow} />
                                            </View>
                                        </View>

                                    </TouchableOpacity>
                                )
                            })
                        )}
                    </View>
                )}
            </ScrollView>


            <StatusBar backgroundColor="black" translucent />
        </View>
    );
};

export default HomeSearchResult;

const styles = StyleSheet.create({});
