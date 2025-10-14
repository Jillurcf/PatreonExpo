import { IconBack, IconDollar, IconUpload } from '@/src/assets/icons/icons';
import Button from '@/src/components/Button';
import NormalModal from '@/src/components/NormalModal';
import tw from '@/src/lib/tailwind';
import { useGetServicesByIdQuery, useUpdateServicesByIdMutation } from '@/src/redux/apiSlice/serviceSlice';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { SvgXml } from 'react-native-svg';
import { TextArea } from 'react-native-ui-lib';


const data = [
    { label: 'marketing', value: '1' },
    { label: 'finance', value: '2' },
    { label: 'law', value: '3' },
    { label: 'economy', value: '4' },
    { label: 'writing', value: '5' },
    { label: 'business', value: '6' },
];

type Props = {};


const EditService = (props: Props) => {
    const { id, } = useLocalSearchParams();
    // console.log(id, "id==================")
    const isMounted = useRef(true);
    const [fields, setFields] = useState(['', '', '']);
    const [promptInput, setPromptInput] = useState('');
    const [selectedPdf, setSelectedPdf] = useState<any>(null);
    const [updateError, setUpdateError] = useState();
    console.log(promptInput, "promptInput==================")
    const [isFocus, setIsFocus] = useState(false);
    const [selectedImages, setSelectedImages] = useState();
    const { data: serviceData } = useGetServicesByIdQuery(id);
    const [updateServicesById] = useUpdateServicesByIdMutation();
    const [serviceCreationConfirmationModalVisible, setServiceCreationConfirmationModalVisible] =
        useState(false);
    const [services, setServices] = useState({})
    // console.log(serviceData?.data, "serviceData=======================")

    const [value, setValue] = useState({
        title: '',
        subtitle: '',
        currency: '',
        price: '',
        description: '',
        category: '',
    });
    // console.log(value, "value=====================")
    const [initialized, setInitialized] = useState(false); // to prevent overwriting on every render
    // useEffect(() => {
    //     const service = serviceData?.data;
    //     setServices(service);
    //     if (services && !initialized) {
    //         setValue(prev => ({
    //           ...prev,
    //           currency: services?.price?.toString() || '',
    //           price: services?.price?.toString() || '',
    //           description: services?.description || ''
    //         }));
    //         setInitialized(true);
    //       }
    // }, [serviceData?.data]);

    useEffect(() => {
        const service = serviceData?.data;
        setServices(service);
        if (service && !initialized) {
            setValue(prev => ({
                ...prev,
                title: service.title || '',
                subtitle: service.subtitle || '',
                currency: service.price?.toString() || '',
                price: service.price?.toString() || '',
                description: service.description || '',
                category: data.find(cat => cat.label.toLowerCase() === service.category?.toLowerCase())?.value || '',
            }));
            setPromptInput(service.about || '');
            // Handle preloading PDF
            if (service.files && service.files.length > 0) {
                const filePath = service.files[0].replace(/\\/g, '/'); // Replace Windows-style paths
                const localPath = `file://${filePath}`;
                setSelectedPdf({
                    uri: localPath,
                    name: localPath.split('/').pop(),
                });
            }

            // ✅ Set existing fields
            if (Array.isArray(service.explainMembership)) {
                setFields(service.explainMembership);
            } else {
                setFields([]); // Or default to a single empty field
            }
            setInitialized(true);
        }
    }, [serviceData?.data]);


    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    const openFilePicker = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf', // Restrict to PDF files
                multiple: true,          // Allow multiple selections if supported
                copyToCacheDirectory: true,
            });
            setSelectedPdf(result);
            console.log(result, "pdf file==================")
            if (result && isMounted.current) {
                setSelectedPdf(result);
            } else if (result.type === 'cancel') {
                console.log('User cancelled document picker');
            }
        } catch (error) {
            Alert.alert('Error', error.message || 'Something went wrong');
        }
    };

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
            formData.append("explainMembership", JSON.stringify(fields));
            const res = await updateServicesById({ id, data: formData })
            if (res?.data?.success === true) {
                router.push('/(drawer)/SettingProfile');
                setServiceCreationConfirmationModalVisible(true)
            } else if (res?.data?.error) {
                setUpdateError(res?.data?.error)
            }

        } catch (err) {
            console.log(err)
        }
        console.log('Saved fields:', fields);
        // Save logic here
    };


    return (
        <ScrollView contentContainerStyle={tw` bg-black px-[4%] pb-20`}>
            <StatusBar translucent={false} />
            {/* Header */}
            <View>
                <View style={tw`flex-row w-full justify-between mt-4`}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={tw`bg-black rounded-full p-1`}>
                        <SvgXml xml={IconBack} />
                    </TouchableOpacity>
                    <Text style={tw`text-white font-bold font-AvenirLTProBlack text-2xl`}>
                        Edit service
                    </Text>
                    <View style={tw`w-8`} />
                </View>
            </View>

            {/* Prompt Input */}
            <View style={tw`mt-8`}>
                <Text style={tw`text-white py-2 font-AvenirLTProBlack`}>Prompt Input</Text>
                <View style={tw`h-44 p-2 bg-[#262329] border border-[#565358] w-full rounded-lg`}>
                    <TextInput
                        defaultValue={services?.about}
                        onChangeText={setPromptInput}
                        style={tw`text-left h-40 text-white`}
                        placeholder="Write it here"
                        placeholderTextColor="#c7c7c7"
                        multiline
                        maxLength={120}
                        textAlignVertical="top"
                    />
                </View>
            </View>

            {/* File Upload */}
            <View style={tw`my-6`}>
                <Text style={tw`text-white font-AvenirLTProBlack`}>Uploaded Knowledge</Text>
                <View style={tw`flex items-center bg-[#262329] mt-2 rounded-2xl py-8 border border-[#565358] justify-center`}>
                    <TouchableOpacity onPress={openFilePicker}>
                        <SvgXml xml={IconUpload} />
                    </TouchableOpacity>
                    <Text style={tw`text-white my-4`}>Upload file (50 mb maximum)</Text>
                    {selectedPdf?.name && (
                        <Text style={tw`text-gray-300 text-sm`}>{selectedPdf.name}</Text>
                    )}
                </View>
            </View>

            {/* Title */}
            <Text style={tw`text-white font-bold text-xs`}>Title</Text>
            <View style={tw`flex-row w-full items-center p-3`}>

                <TextInput
                    style={tw`w-full h-10 border text-white bg-[#262329] -[#565358] rounded-2xl px-2`}
                    placeholder="Write title here"
                    placeholderTextColor={'white'}
                    defaultValue={services?.title}
                    // value={services.title}
                    onChangeText={text => setValue(prev => ({ ...prev, title: text }))}
                />
            </View>

            {/* Subtitle */}
            <Text style={tw`text-white font-bold text-xs`}>Subtitle</Text>
            <View style={tw`flex-row w-full items-center p-3`}>
                <TextInput
                    style={tw`w-full h-10 border text-white bg-[#262329] border-[#565358] rounded-2xl px-2`}
                    placeholder="Write subtitle"
                    placeholderTextColor={'white'}
                    defaultValue={services?.subtitle}
                    onChangeText={text => setValue(prev => ({ ...prev, subtitle: text }))}
                />
            </View>

            {/* Currency */}
            <Text style={tw`text-white font-bold text-xs`}>Price</Text>
            <View style={tw`flex-row w-full items-center p-3`}>
                <TouchableOpacity style={tw`absolute right-6 z-30`}>
                    <SvgXml xml={IconDollar} width={20} height={20} />
                </TouchableOpacity>
                <TextInput
                    style={tw`w-full h-10 border text-white bg-[#262329] border-[#565358] rounded-2xl px-2`}
                    placeholder="Input currency"
                    placeholderTextColor={'white'}
                    defaultValue={services?.price?.toString()}
                    onChangeText={text => setValue(prev => ({ ...prev, currency: text }))}
                />
            </View>

            {/* Description */}
            <Text style={tw`text-white font-bold text-xs `}>Discription</Text>
            <View style={tw`mt-3`}>
                <View style={tw`h-auto p-2 bg-[#FFFFFF] border border-[#565358] w-full rounded-lg`}>
                    <TextArea

                        style={tw`text-left h-40 text-black`}
                        placeholder={'Write description here'}
                        placeholderTextColor={'#c7c7c7'}
                        underlineColorAndroid={'transparent'}
                        multiline
                        maxLength={9000}
                        defaultValue={services?.description}
                        // value={value?.description}
                        onChangeText={text => setValue(prev => ({ ...prev, description: text }))}
                        textAlignVertical="top"
                    />
                </View>
            </View>

            {/* Dropdown */}

            <View style={tw`mt-8`}>
                <Text style={tw`text-white font-bold text-xs mb-2 `}>Category</Text>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select category' : '...'}
                    searchPlaceholder="Search..."
                    value={value.category}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(prev => ({
                            ...prev,
                            category: item.label,
                        }));
                        setIsFocus(false);
                    }}
                />
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
                        style={tw`flex-1 bg-neutral-900 text-white px-4 py-3 rounded-lg`}
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
            {updateError && (
                <Text style={tw`text-red-600 py-4`}>{updateError}*</Text>
            )}
            {/* Save Button */}
            <TouchableOpacity
                onPress={handleSave}
                style={tw`bg-white rounded-xl py-4 items-center`}
            >
                <Text style={tw`text-black font-bold text-base`}>Save</Text>
            </TouchableOpacity>
            <NormalModal
                layerContainerStyle={tw`flex-1 justify-center items-center mx-5`}
                containerStyle={tw`rounded-xl bg-zinc-900 p-5`}
                visible={serviceCreationConfirmationModalVisible}
                setVisible={setServiceCreationConfirmationModalVisible}>
                <View>
                    <Text style={tw`text-white text-lg text-center font-RoboBold mb-2`}>
                        Service updated succcessfully
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
    );
};

export default EditService;

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        borderColor: '#565358',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#262329',
    },
    placeholderStyle: {
        color: '#c7c7c7',
        fontSize: 16,
    },
    selectedTextStyle: {
        color: 'white',
        fontSize: 16,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: 'white',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
});
