import { loadMediaPromptData, saveMediaPromptData } from '@/src/utils';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Pdf from 'react-native-pdf';
import { SvgXml } from 'react-native-svg';
import tw from '../../lib/tailwind';

import {
  IconBack,
  IconUpload
} from '../../assets/icons/icons';

import Button from '@/src/components/Button';
import NormalModal from '@/src/components/NormalModal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import TButton from '../../components/TButton';

const EnterInput = () => {
  const [promptInput, setPromptInput] = useState('');
  const [inputConfirmationModalVisible, setInputConfirmationModalVisible] =
    useState(false);
  const [loading, setLoading] = useState(false);
  // const [selectedPdf, setSelectedPdf] = useState(null);
  // const [selectedPdf, setSelectedPdf] = useState({
  //   // assets: [
  //   //   {
  //   //     uri: '',
  //   //     name: '',
  //   //     size: 0,
  //   //     mimeType: '',
  //   //   },
  //   // ],
  //   // canceled: false,
  // });

  const [selectedPdf, setSelectedPdf] = useState<null | {
    uri: string;
    name: string;
    size: number;
    mimeType: string;
  }>(null);
  const [isPdfLoaded, setIsPdfLoaded] = useState(false);

  const handlePdfLoad = () => {
    setIsPdfLoaded(true);
  };

  const openFilePicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
    console.log(result, "Document Picker Result +++++++++++++++");
    // Or if you use another picker that returns { assets, canceled } like your log

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const file = result.assets[0];

      const destPath = FileSystem.cacheDirectory + file.name;

      await FileSystem.copyAsync({
        from: file.uri,
        to: destPath,
      });

      const pdfFile = {
        uri: destPath,
        name: file.name,
        size: file.size,
        mimeType: file.mimeType || 'application/pdf',
      };

      console.log('PDF selected:', pdfFile.uri);
      setSelectedPdf(pdfFile);
    } else {
      console.log('No file selected or operation canceled');
    }
  };

  const isMounted = useRef(true);
  console.log(selectedPdf, "selectedPdf ==================")
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const allData = { selectedPdf, promptInput }
  console.log(allData, "allData ==================");

  const handleSave = async () => {
    if (!selectedPdf || !promptInput) {
      console.log('Error', 'Please upload a PDF and enter a title before saving.');
      return;
    }
    setLoading(true);
    // console.log(selectedPdf, promptInput, 'data before sending ==========');
    try {
      // ✅ Wait for the data to be saved
      await saveMediaPromptData(selectedPdf, null, promptInput);

      // ✅ Then wait to load it
      const { selectedImages: savedImages, promptInput: savedPrompt } = await loadMediaPromptData();

      console.log(savedImages, savedPrompt, 'Retrieved data from storage ++++++++');

      // Continue the flow
      setInputConfirmationModalVisible(true);
      setPromptInput('');
      setSelectedPdf(null);
      router.push('/screens/ExplainMembership');
    } catch (error) {
      console.error('Error during save/load:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
   <KeyboardAwareScrollView
        style={styles.container}
             contentContainerStyle={styles.contentContainer}
             keyboardShouldPersistTaps="handled"
             extraKeyboardSpace={Platform.OS === 'ios' ? 100 : 0}>
      <ScrollView
        contentContainerStyle={tw`flex-grow bg-black items-center justify-between px-4`}
        keyboardShouldPersistTaps="handled"
      >
        <View style={tw`mb-10`}>
          {/* Header */}
          <View style={tw`flex-row w-full justify-between mt-4`}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={tw`bg-black rounded-full p-1`}
            >
              <SvgXml xml={IconBack} />
            </TouchableOpacity>
            <Text style={tw`text-white font-bold font-AvenirLTProBlack text-2xl`}>
              Enter Input
            </Text>
            <View style={tw`w-8`} />
          </View>

          {/* Prompt Input */}
          <View style={tw`mt-8`}>
            <Text style={tw`text-white py-2 font-AvenirLTProBlack`}>Add instruction</Text>
            <View style={tw`h-44 p-2 bg-[#262329] w-full rounded-lg`}>
              <TextInput
                value={promptInput}
                onChangeText={(text) => setPromptInput(text)}
                style={tw`text-left h-40 text-white`}
                placeholder="Write it here"
                placeholderTextColor="#c7c7c7"
                multiline
                maxLength={120}
                textAlignVertical="top"
                underlineColorAndroid="transparent"
              />
              {!promptInput && (
                <Text style={tw`text-red-600 text-xs mt-2`}>
                  Please enter your instruction here.*
                </Text>
              )}
            </View>
          </View>

          {/* Upload File */}
          <View style={tw`my-6`}>
            <Text style={tw`text-white font-AvenirLTProBlack`}>Upload Knowledge</Text>
            <TouchableOpacity onPress={openFilePicker}>
              <View
                style={tw`flex items-center bg-[#262329] mt-2 rounded-2xl py-8 justify-center`}

              >

                <View style={tw`flex-row gap-6`}>
                  <TouchableOpacity onPress={openFilePicker}>
                    <SvgXml xml={IconUpload} />
                  </TouchableOpacity>
                </View>

                <Text style={tw`text-white my-4`}>Upload file (50 mb maximum)</Text>
                {!selectedPdf && (
                  <Text style={tw`text-red-600 text-xs mt-2`}>
                    Please upload a PDF file.*
                  </Text>)}

                {selectedPdf && (
                  <View style={tw`w-full h-[500px] mt-4`}>
                    {/* <TouchableOpacity
                    onPress={() => setSelectedPdf(null)}
                    style={tw`absolute top-2 right-2 z-10 bg-black/60 p-1 rounded-full`}
                  >
                    <SvgXml xml={CrossIcon} width={20} height={20} />
                  </TouchableOpacity> */}

                    {/* <WebView
                    source={{ uri: selectedPdf?.assets[0]?.uri }}
                    style={{ flex: 1 }}
                    startInLoadingState
                  /> */}
                    <Pdf
                      source={{ uri: selectedPdf?.uri }}
                      onLoadComplete={handlePdfLoad}
                      style={{ flex: 1 }}
                      trustAllCerts={false} // Optional: fix SSL issues
                      onError={(error) => console.log("PDF load error:", error)}
                    />

                  </View>
                )}

                {/* {!isPdfLoaded && <Text style={tw`text-white`}>Loading PDF...</Text>} */}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Save Button */}
        <View style={tw`flex mb-6 items-center justify-center w-full`}>
          <TButton
            onPress={handleSave}
            titleStyle={tw`text-black font-bold text-center`}
            title={loading ? "Saving" : "Save"}
            containerStyle={tw`bg-primary w-[100%] rounded-2xl`}
          />
        </View>
        <NormalModal
          layerContainerStyle={tw`flex-1 justify-center items-center mx-5`}
          containerStyle={tw`rounded-xl bg-zinc-900 p-5`}
          visible={inputConfirmationModalVisible}
          setVisible={setInputConfirmationModalVisible}>
          <View>
            <Text style={tw`text-white text-lg text-center font-RoboBold mb-2`}>
              Your data has been saved successfully!
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
                    setInputConfirmationModalVisible(false);
                  }}
                />
              </View>
            </View>
          </View>
        </NormalModal>
        <StatusBar backgroundColor={'gray'} translucent={false} />
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default EnterInput;
const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: "4%" },
  contentContainer: { flexGrow: 1,},
  inputWrapper: { marginVertical: 20, paddingHorizontal: 16 },
  input: { height: 50, borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8 },
 
});