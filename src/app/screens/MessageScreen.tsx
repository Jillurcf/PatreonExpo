import * as DocumentPicker from 'expo-document-picker';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
// import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
// import DocumentPicker from 'react-native-document-picker'; // For document selection
import tw from 'twrnc'; // Tailwind for React Native

import { SvgXml } from 'react-native-svg';

import { useMessageHistoryQuery, usePostSendMessageMutation } from '@/src/redux/apiSlice/serviceSlice';
import { useGetUserQuery } from '@/src/redux/apiSlice/userSlice';
import { router, useLocalSearchParams } from 'expo-router';
import {
  AttachmentIcon,
  CrossIcon,
  IconBack,
  Uparrow
} from '../../assets/icons/icons';
import NormalModal from '../../components/NormalModal';

const MessageScreen = () => {
  const { id, serviceId, title, serviceTitle, userName } = useLocalSearchParams();
  console.log(id, serviceId, title, "id+++++++++++++++++++++++41")
  const [openModal, setOpenModal] = useState(false);
  const [conversation_id, setConversation_id] = useState();
  const [postSendMessage, { isLoading, isError }] = usePostSendMessageMutation()
  const [mediaUri, setMediaUri] = useState(null); // For holding the selected media URI
  const [mediaType, setMediaType] = useState(null); // 'image', 'video', or 'document'
  const [text, setText] = useState(''); // Message input field
  const [messages, setMessages] = useState([]); // Message state
  const [answer, setAnswer] = useState("");
  const { data: messageHistory } = useMessageHistoryQuery({});
  console.log(messageHistory?.data, "Message History++++++++++++++++")
  const { data: user } = useGetUserQuery({})


  useEffect(() => {
    if (messageHistory) {
      const fetchedMessages = messageHistory.data.map((item) => ({
        id: item._id,
        user: item.user.name,
        question: item.question,
        answer: item.answer,
        createdAt: item.createdAt,
      }));
      setMessages(fetchedMessages);
    }
  }, [messageHistory]);

  const sendMessage = async () => {
    if (text.trim() || mediaUri) {
      const questionText = text.trim() || 'Sent a document';

      const userMessage = {
        text: questionText,
        user: user?.data?.name,
        createdAt: new Date(),
        media: mediaUri,
        mediaType,
        is_sender: true,
      };

      // Add the user's question to the chat immediately
      setMessages(prev => [...prev, userMessage]);

      // Clear input fields
      setText('');
      setMediaUri(null);
      setMediaType(null);

      const formData = new FormData();
      formData.append("message", questionText);

      if (mediaUri) {
        const fileName = mediaUri.split('/').pop();
        const fileType = mediaType || 'image/jpeg';

        formData.append('media', {
          uri: mediaUri,
          name: fileName,
          type: fileType,
        });
      }

      try {
        const res = await postSendMessage({ id: serviceId, data: formData });
        console.log(res, "postSendMessage res+++++++++")
        const aiMessage = {
          text: res?.data?.data || "No response from AI.",
          user: title,
          createdAt: new Date(),
          is_sender: false,
        };

        // Add the AI's answer to the chat
        setMessages(prev => [...prev, aiMessage]);
      } catch (err) {
        console.log(err, "error sending message");

        const errorMessage = {
          text: "Failed to get response from AI.",
          user: "System",
          createdAt: new Date(),
          is_sender: false,
        };

        setMessages(prev => [...prev, errorMessage]);
      }
    }
  };


  async function requestCameraPermission() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera.',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission granted');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }


  // Function to pick document (PDF, Word, etc.)
  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      setMediaUri(res.uri); // Set the URI of the selected document
      setMediaType('document'); // Set media type as 'document'
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document picker');
      } else {
        console.error('DocumentPicker Error: ', err);
      }
    }
  };





  const toggleModal = () => setOpenModal(prev => !prev);

  // React.useEffect(() => {

  // }, [receiverInfo, data?.data]);
  const selectMediaType = () => {
    Alert.alert('Choose Media', 'Select the type of media you want to upload', [
      {
        text: 'Image',
        onPress: () => pickMedia('photo'),
      },
      // {
      //   text: 'Video',
      //   onPress: () => pickMedia('video'),
      // },
      {
        text: 'Document',
        onPress: () => pickDocument(),
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };
  {
    isLoading && (
      <View style={tw`absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-black bg-opacity-30`}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    )
  }

  return (
    <View style={tw`flex-1 px-2 bg-black`}>
      <View style={tw`flex-row w-full justify-between mt-4`}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={tw`bg-black rounded-full p-1`}>
          <SvgXml xml={IconBack} />
        </TouchableOpacity>
        <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
          {userName && (
            userName
          ) || "User Name"}
        </Text>
        <View style={tw`w-8`} />
      </View>
      {/* Message List */}
      <View style={tw`flex-1 px-4 py-2`}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            console.log(item, "item+++++++++++++")
            if (!item?.answer) return null;
            return (
              (
                <View style={tw`mb-4`}>
                  <Text style={tw`font-semibold text-white text-lg`}>{item.user}</Text>
                  <Text style={tw`text-sm text-white`}>Q. {item.question}</Text>
                  <Text style={tw`text-sm text-white mt-2`}>Ans. {item?.answer}</Text>
                  <Text style={tw`text-xs text-gray-400`}>{new Date(item.createdAt).toLocaleString()}</Text>
                </View>
              )
            )
          }}
        />
      </View>

      {/* Input and Send Button */}
      <View style={tw``}>
        <View style={tw`flex-row items-center p-3  w-[95%]`}>
          <TouchableOpacity
            onPress={() => selectMediaType()}
            style={tw`mr-2 absolute right-14 z-30`}>

            <Text style={tw`text-white`}>
              {isLoading ? 'Sending...' :

                (<SvgXml xml={AttachmentIcon} width={20} height={20} />
                )}
            </Text>

          </TouchableOpacity>
          <View
            style={tw`flex-row w-[90%] gap-1 px-[2%] items-center relative`}>
            <TextInput
              style={tw`w-full h-10 border text-white bg-[#262329] border-gray-400 rounded-2xl px-2`}
              placeholder="Message..."
              placeholderTextColor={'white'}
              cursorColor={'white'}
              value={text}
              onChangeText={value => setText(value)}
            />
            {/* message send option */}
            <TouchableOpacity
              onPress={sendMessage}
              style={tw` border items-center justify-center p-2 rounded-2xl`}>
              {/* <Text style={tw`text-white text-sm font-MontserratBold`}>Send</Text> */}
              <View
                style={tw`bg-white h-10 w-10 justify-center rounded-full items-center`}>
                <SvgXml xml={Uparrow} width={20} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Preview Selected Media */}
      {mediaUri && mediaType === 'image' && (
        <View style={tw`flex-row items-center p-3`}>
          <Image
            source={{ uri: mediaUri }}
            style={tw`h-20 w-20 rounded-lg`}
            resizeMode="cover"
          />
          <Button title="Remove" onPress={() => setMediaUri(null)} />
        </View>
      )}
      {/* {mediaUri && mediaType === 'video' && (
        <View style={tw`flex-row items-center p-3`}>
          <Video
            source={{ uri: mediaUri }}
            style={tw`h-40 w-full rounded-lg`}
            resizeMode="cover"
            controls
          />
          <SvgXml xml={VideoCam} width={20} height={20} />
          <Button title="Remove" onPress={() => setMediaUri(null)} />
        </View>
      )} */}
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {/* Button to open the modal */}
        {/* <Button title="Open Modal"  /> */}

        {/* NormalModal usage */}
        <NormalModal
          visible={openModal}
          setVisible={setOpenModal}
          animationType="fade" // Optional, choose 'none', 'slide', or 'fade'
          scrollable={true} // Optional, to make the modal content scrollable
          layerContainerStyle={{ padding: 20 }} // Optional, styling for the background layer
          containerStyle={{ borderRadius: 10 }} // Optional, styling for the modal container
        >
          {/* Content inside the modal */}
          <View>
            <View style={tw`flex-row w-full justify-end`}>
              <TouchableOpacity
                style={tw`text-red-700 border border-red-800 items-center justify-center h-6 w-6 rounded-full`}
                onPress={toggleModal}>
                <SvgXml color={'red'} xml={CrossIcon} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={tw`font-MontserratBold text-black text-xl`}>
                Delete Conversation
              </Text>
              <Text style={tw`font-MontserratBold text-black text-xl py-4`}>
                Block
              </Text>
              <Text style={tw`font-MontserratBold text-red-900 text-xl`}>
                Delete{' '}
              </Text>
            </View>
          </View>
        </NormalModal>
      </View>
      <StatusBar translucent={false} />
    </View>
  );
};

export default MessageScreen;
