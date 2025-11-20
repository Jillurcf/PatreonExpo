import { IconBack, IconEdit } from '@/src/assets/icons/icons'
import NormalModal from '@/src/components/NormalModal'
import TButton from '@/src/components/TButton'
import tw from '@/src/lib/tailwind'
import { useDeleteServicesMutation, useGettMyServicesQuery } from '@/src/redux/apiSlice/serviceSlice'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'


type Props = {}

const MyServices = (props: Props) => {
    const { data, refetch, isLoading, isError } = useGettMyServicesQuery({})
    // console.log(data?.data, "My serviced data =================14")
    const [deleteServices] = useDeleteServicesMutation();
    const [deleteServiceConfirmationModalVisible, setDeleteServiceConfirmationModalVisible] =
        useState(false);
    const [seletedItem, setSeletedItem] = useState(null);

    const handleEditService = (item) => {
        // console.log(item?._id, "click+++++++++++++++++++++++++")
        router.push({
            pathname: "/screens/EditService",
            params: {
                id: item?._id,
            }
        })

    }

    const handleDelete = async (item) => {
        setDeleteServiceConfirmationModalVisible(true);
        setSeletedItem(item);
        // try {
        //     console.log(item._id, "id++++++++++++++++++ click");
        //     const res = await deleteServices(item._id).unwrap();
        //     console.log(res?.data, "delete response")
        //     if (res?.success === true) {
        //         await refetch()
        //         router.push('/(drawer)/(tab)'); // Navigate back to MyServices screen
        //         console.log('Deleted successfully', res)
        //     }

        // } catch (error) {
        //     console.error('Delete failed', error);
        // }
    };
    const handleDeleteConfirmation = async () => {
        try {
            console.log(seletedItem._id, "id++++++++++++++++++ click");
            const res = await deleteServices(seletedItem._id).unwrap();
            console.log(res?.data, "delete response")
            if (res?.success === true) {
                await refetch()
                router.push('/(drawer)/(tab)'); // Navigate back to MyServices screen
                console.log('Deleted successfully', res)
            }
            setDeleteServiceConfirmationModalVisible(false);
        } catch (error) {
            console.error('Delete failed', error);
        }

    }

    {
        isLoading && (
            <View style={tw`absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-white/60 z-50`}>
                <ActivityIndicator size="large" color="#ffffff" />
                <Text style={tw`text-white mt-2`}>Loading...</Text>
            </View>
        )
    }

    return (
        <ScrollView
            contentContainerStyle={tw`flex-1 bg-black h-[95%] px-[4%]`}>
            <View style={tw``}>
                <View style={tw`flex-row w-full justify-between mt-4`}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={tw` rounded-full p-1`}>
                        <SvgXml xml={IconBack} />
                    </TouchableOpacity>
                    <Text style={tw`text-white font-bold font-AvenirLTProBlack text-2xl`}>
                        My services
                    </Text>
                    <View style={tw`w-8`} />
                </View>
            </View>
            {/* =============== my services section =================== */}
            <View style={tw`flex-1 mt-6 mb-4`}>
                <FlatList
                    data={data?.data}
                    keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <View
                                style={tw`flex-row items-center bg-[#262329] my-1 rounded-2xl p-3`}>
                                <View style={tw`flex-row items-center`}>

                                    <View style={tw`flex-1 pb-2`}>
                                        <View style={tw`flex-row mr-2 items-center`}>
                                            <Text style={tw`text-white font-AvenirLTProBlack`}>
                                                {item?.title}
                                            </Text>
                                        </View>
                                        {/* <View style={tw`flex-row justify-between mt-2`}>
                                            <Text style={tw`text-[#C9C8C9] font-AvenirLTProLight`}>
                                                {item?.subtitle}
                                            </Text>
                                        </View> */}
                                        <View style={tw`flex-row justify-between mt-2`}>
                                            <Text style={tw`text-[#C9C8C9] font-AvenirLTProLight`}>
                                                {item?.category}
                                            </Text>
                                        </View>
                                        <View style={tw`flex-row justify-between mt-2`}>
                                            {/* <Text style={tw`text-white font-AvenirLTProBlack`}>
                                                {item?.description.slice(0, 100)}...
                                            </Text> */}
                                            <Text style={tw`text-[#C9C8C9] font-AvenirLTProLight`}>
                                                {item?.description
                                                    ? item.description.replace(/\s*\n\s*/g, ' ').trim().slice(0, 100)
                                                    : "Service Description"}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={tw`flex-row gap-4 items-center`}>
                                        <TouchableOpacity
                                            onPress={() => handleEditService(item)}
                                            style={tw` py-1 rounded-xl`}>
                                            <SvgXml width={20} height={20} xml={IconEdit} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => handleDelete(item)}
                                            style={tw`py-1 px-3 rounded-xl bg-red-500`}>
                                            <Text style={tw`text-white font-AvenirLTProBlack`}>Del.</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>
                        );
                    }}
                />
            </View>
            <NormalModal
                layerContainerStyle={tw`flex-1 justify-center items-center `}
                containerStyle={tw`rounded-xl bg-[#141316] w-[80%] `}
                visible={deleteServiceConfirmationModalVisible}
                setVisible={setDeleteServiceConfirmationModalVisible}
            >
                <View>
                    <Text style={tw`text-white text-2xl text-center font-AvenirLTProBlack mb-2`}>
                        Sure you want to {'\n'}delete service?
                    </Text>

                    <View style={tw`mt-2`}>
                        <View style={tw`items-center mb-4`}>
                            <TButton
                                title="Yes"
                                titleStyle={tw`text-[#262329] text-[16px] font-AvenirLTProBlack`}
                                containerStyle={tw`w-[100%] bg-white `}
                                onPress={handleDeleteConfirmation}
                            />
                        </View>
                        <View style={tw`items-center w-full`}>
                            <TButton
                                title="Cancel"
                                titleStyle={tw`text-white text-[16px] font-AvenirLTProBlack`}
                                containerStyle={[tw`w-[100%]`, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
                                onPress={() => {
                                    setDeleteServiceConfirmationModalVisible(false);
                                }}
                            />
                        </View>
                    </View>
                </View>
            </NormalModal>
            <StatusBar translucent={false} />
        </ScrollView>
    )
}

export default MyServices

const styles = StyleSheet.create({})