import { IconBack } from '@/src/assets/icons/icons';
import Button from '@/src/components/Button';
import NormalModal from '@/src/components/NormalModal';
import TButton from '@/src/components/TButton';
import { usePostBecmeAContibutorMutation } from '@/src/redux/apiSlice/serviceSlice';
import { useGetUserQuery } from '@/src/redux/apiSlice/userSlice';
import { getExplainMemberValue, loadMediaPromptData } from '@/src/utils';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import tw from 'twrnc'; // if using tailwind-rn
// OR
// import { useTailwind } from 'nativewind';

const ExplainMembershipScreen = () => {
    const [fields, setFields] = useState(['', '', '']);
    const [value, setValue] = useState({
        title: '',
        subtitle: '',
        currency: '',
        price: '',
        description: "",
        category: "",
    });
    const [promptInput, setPromptInput] = useState<string>("");
    const [selectedImages, setSelectedImages] = useState();
    const [serviceCreationConfirmationModalVisible, setServiceCreationConfirmationModalVisible] =
        useState(false);
    const [postBecmeAContibutor, { isLoading, isError }] = usePostBecmeAContibutorMutation();
    console.log(fields, "fields data +++++++++++++++++++++++++");
    const { data, isLoading: serviceLoading, isError: serviceError } = useGetUserQuery({});
    console.log(data?.data?.wallet, "user data++++++++++++++++++++++");

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const savedValue = await getExplainMemberValue();
                console.log(savedValue?.category, "savedValue+++++++++++++");
                setValue(savedValue);

                const mediaData = await loadMediaPromptData(); // ✅ await it
                console.log(mediaData, "mediaData+++++++++++++");
                setPromptInput(mediaData.promptInput);          // ✅ now it's safe
                setSelectedImages(mediaData.selectedImages);
            } catch (err) {
                console.error("Error loading from storage:", err);
            }
        };

        loadInitialData();
    }, []);


    const handleAddField = () => {
        setFields([...fields, '']);
    };

    const handleChange = (text: string, index: number) => {
        const updatedFields = [...fields];
        updatedFields[index] = text;
        setFields(updatedFields);
    };

    const handleSave = async () => {
        console.log(fields, "Fields ++++++++++++++++++++++")
        try {
            const formData = new FormData()
            formData.append('title', value?.title)
            formData.append('subtitle', value?.subtitle)
            formData.append('price', value?.currency)
            formData.append('description', value?.description)
            formData.append('category', value?.category)
            formData.append('about', promptInput)
            formData.append('pdfFiles', selectedImages)
            // formData.append('explainMembership', fields)
            formData.append("explainMembership", JSON.stringify(fields)); // ← becomes: '["Member ", "Member 1", "Member 2"]'

            console.log(formData, "formData==================")
            const res = await postBecmeAContibutor(formData).unwrap();
            if (res?.success === true) {
                const wallet = data?.data?.wallet;
                if (wallet == null) {
                    router.push('/screens/PaymentMetodScreen');
                    console.log(res, "res++++++++++++++++")
                    setServiceCreationConfirmationModalVisible(true)
                    console.log("Service created succcessfully")
                } else {
                    router.push('/(drawer)/(tab)');
                }

            }
            // router.push('/(drawer)/SettingProfile');
            // console.log(res, "res++++++++++++++++")
            // Alert.alert("Service created succcessfully")
        } catch (err) {
            console.log(err)
        }
        console.log('Saved fields:', fields);
        // Save logic here
    };

    return (
        <SafeAreaView style={tw`flex-1 bg-black`}>
            <ScrollView contentContainerStyle={tw` flex-col justify-between h-full`} style={tw`px-5 pt-5`}>
                {/* Header */}
                <View>
                    <View style={tw`flex-row items-center mb-6`}>
                        <TouchableOpacity
                            onPress={() => router.back()}
                            style={tw`bg-black rounded-full p-1`}>
                            <SvgXml xml={IconBack} />
                        </TouchableOpacity>
                        <Text style={tw`text-white text-lg font-bold ml-2`}>
                            Explain Membership
                        </Text>
                    </View>

                    {/* Input Fields */}
                    {fields.map((value, index) => (
                        <View key={index} style={tw`flex-row w-[100%] items-center p-3`}>
                            <View style={tw`w-3 h-3 rounded-full bg-white mr-3`} />
                            <TextInput
                                placeholder="Write it here"
                                placeholderTextColor="#ccc"
                                value={value}
                                onChangeText={(text) => handleChange(text, index)}
                                style={tw`flex-1 bg-neutral-900 text-white px-4 py-4 rounded-2xl`}
                            />
                        </View>
                    ))}

                    {/* Add (+) Button */}
                    <TouchableOpacity
                        onPress={handleAddField}
                        style={tw`self-center bg-neutral-900 w-10 h-10 rounded-full items-center justify-center my-5`}
                    >
                        <Ionicons name="add" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Save Button */}
                {/* <TouchableOpacity
                    onPress={handleSave}
                    style={tw`bg-white rounded-xl py-2 items-center`}
                >
                    <Text style={tw`text-black font-bold text-base`}>Save</Text>
                </TouchableOpacity> */}

                <View style={tw`mb-10 mt-4 items-center`}>
                    <TButton
                        onPress={handleSave}
                        title={isLoading ? "Saving..." : "Save"}
                        titleStyle={tw`text-black font-bold`}
                        containerStyle={tw`bg-white w-[100%] rounded-2xl`}
                    />
                </View>
                <NormalModal
                    layerContainerStyle={tw`flex-1 justify-center items-center mx-5`}
                    containerStyle={tw`rounded-xl bg-zinc-900 p-5`}
                    visible={serviceCreationConfirmationModalVisible}
                    setVisible={setServiceCreationConfirmationModalVisible}>
                    <View>
                        <Text style={tw`text-white text-lg text-center font-RoboBold mb-2`}>
                            Service created succcessfully
                        </Text>

                        <View style={tw`mt-2`}>
                            <View style={tw`border-t-2 border-[#565358] w-full`}>

                            </View>
                            <View style={tw`border-t-2 border-b-2 border-[#565358] w-full`}>
                                <Button
                                    title="Continue"
                                    style={tw`text-white px-6`}
                                    containerStyle={tw`bg-gray-900`}
                                    onPress={() => {
                                        setServiceCreationConfirmationModalVisible(false);
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </NormalModal>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ExplainMembershipScreen;
