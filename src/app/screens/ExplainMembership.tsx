// import React, { useEffect, useState } from 'react';
// import {
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from 'react-native';

// import { Dropdown } from 'react-native-element-dropdown';
// import Textarea from 'react-native-textarea';

// import { usePostBecmeAContibutorMutation } from '@/src/redux/apiSlice/serviceSlice';
// import { getExplainMemberValue, setExplainMemberValue } from '@/src/utils';
// import { router } from 'expo-router';
// import { SvgXml } from 'react-native-svg';
// import {
//   IconBack,
//   IconDollar
// } from '../../assets/icons/icons';
// import TButton from '../../components/TButton';
// import tw from '../../lib/tailwind';

// const data = [
//   { label: 'marketing', value: '1' },
//   { label: 'finance', value: '2' },
//   { label: 'law', value: '3' },
//   { label: 'economy', value: '4' },
//   { label: 'writing', value: '5' },
//   { label: 'business', value: '6' },
//   // {label: 'Item 7', value: '7'},
//   // {label: 'Item 8', value: '8'},
// ];

// const ExplainMembership = () => {
//   const [value, setValue] = useState({
//     title: '',
//     subtitle: '',
//     currency: '',
//     price: '',
//     description: "",
//     category: "",
//   });
//   console.log(value, "value++++++++++++++")
//   const [isFocus, setIsFocus] = useState(false);
//   const [postBecmeAContibutor, { isLoading, isError }] = usePostBecmeAContibutorMutation()

//   useEffect(() => {
//     const savedValue = getExplainMemberValue();
//     console.log(savedValue?.category, "savedValue+++++++++++++")
//     setValue(savedValue);
//   }, []);

//   // Save the form value when it changes
//   useEffect(() => {
//     setExplainMemberValue(value);
//   }, [value]);


//   const handleSave = () => {

//     value.title = "";
//     value.subtitle = "";
//     value.currency = "";
//     value.description = "";
//     value.category = "";
//     setExplainMemberValue(value);
//     console.log(value, "value++++++++++")
//     router.push("/screens/ExplainMembership1")
//   }
//   return (
//     <ScrollView
//       contentContainerStyle={tw`flex-1 bg-black h-[95%] px-[4%] items-center justify-between`}>
//       <View style={tw`my-10`}>
//         <View style={tw`flex-row w-full justify-between mt-4`}>
//           <TouchableOpacity
//             onPress={() => router.back()}
//             style={tw`bg-PrimaryFocus rounded-full p-1`}>
//             <SvgXml xml={IconBack} />
//           </TouchableOpacity>
//           <Text style={tw`text-white font-bold font-AvenirLTProBlack text-2xl`}>
//             Explain Membership
//           </Text>
//           <View style={tw`w-8`} />
//         </View>


//         <View style={tw`flex-row w-[100%] mt-4 items-center py-3 `}>
//           <TouchableOpacity
//             // onPress={() => selectMediaType()}
//             style={tw`mr-2 absolute right-6 z-30`}>
//             {/* <SvgXml xml={IconDollar} width={20} height={20} /> */}
//           </TouchableOpacity>
//           <View style={tw`flex-row gap-1 items-center relative`}>
//             <TextInput
//               style={tw`w-[100%] h-10 border text-white bg-[#262329] border-gray-400 rounded-2xl px-2`}
//               placeholder="Write title here"
//               placeholderTextColor={'white'}
//               cursorColor={'white'}
//               value={value.title}
//               onChangeText={text => setValue(prev => ({ ...prev, title: text }))}
//             />
//           </View>

//         </View>
//         <View style={tw`flex-row w-[100%] items-center py-3 `}>
//           <TouchableOpacity
//             // onPress={() => selectMediaType()}
//             style={tw`mr-2 absolute right-6 z-30`}>
//             {/* <SvgXml xml={IconDollar} width={20} height={20} /> */}
//           </TouchableOpacity>
//           <View
//             style={tw`flex-row  gap-1 items-center relative`}>
//             <TextInput
//               style={tw`w-[100%] h-10 border text-white bg-[#262329] border-gray-400 rounded-2xl px-2`}
//               placeholder="Write subtitle"
//               placeholderTextColor={'white'}
//               cursorColor={'white'}
//               value={value?.subtitle}
//               onChangeText={text => setValue(prev => ({
//                 ...prev,
//                 subtitle: text,
//               }))}
//             />
//           </View>
//         </View>
//         {/* <Text style={tw`text-white font-AvenirLTProBlack mt-6 mb-2`}>
//           Price
//         </Text> */}
//         <View style={tw`flex-row w-[100%] items-center py-3`}>
//           <TouchableOpacity
//             // onPress={() => selectMediaType()}
//             style={tw`mr-2 absolute right-6 z-30`}>
//             <SvgXml xml={IconDollar} width={20} height={20} />
//           </TouchableOpacity>
//           <View
//             style={tw`flex-row  gap-1 items-center relative`}>
//             <TextInput
//               style={tw`w-[100%] h-10 border text-white bg-[#262329] border-gray-400 rounded-2xl px-2`}
//               placeholder="Input currency"
//               placeholderTextColor={'white'}
//               cursorColor={'white'}
//               value={value.currency}
//               onChangeText={text => setValue(prev => ({
//                 ...prev,
//                 currency: text
//               }))}
//             />
//           </View>
//         </View>

//         {/* ==========================input textarea ========================= */}
//         <View style={tw`mt-8`}>
//           {/* <Text style={tw`text-white font-AvenirLTProBlack py-2`}>Input</Text> */}
//           <View
//             style={tw`h-44 p-2 bg-[#262329] border border-[#565358] w-full rounded-2xl`}>
//             <Textarea
//               style={tw`text-left h-40 text-white`}
//               placeholder={'Write description here'}
//               placeholderTextColor={'#c7c7c7'}
//               underlineColorAndroid={'transparent'}
//               multiline
//               maxLength={120}
//               value={value.description}
//               onChangeText={text => setValue(prev => ({
//                 ...prev,
//                 description: text // ✅ FIXED THIS LINE
//               }))}
//               textAlignVertical="top" // Ensures text starts from the top
//             />

//           </View>
//         </View>
//         {/* ==========================drop down area =============================== */}
//         <View style={tw`mt-8`}>
//           {/* <Text style={tw`text-white font-AvenirLTProBlack py-2`}>Input</Text> */}


//           {/* {renderLabel()} */}
//           <Dropdown
//             style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
//             placeholderStyle={styles.placeholderStyle}
//             selectedTextStyle={styles.selectedTextStyle}
//             inputSearchStyle={styles.inputSearchStyle}
//             iconStyle={styles.iconStyle}
//             data={data}
//             // search
//             maxHeight={300}
//             labelField="label"
//             valueField="value"
//             placeholder={!isFocus ? 'Select category' : '...'}
//             searchPlaceholder="Search..."
//             value={value.category}
//             onFocus={() => setIsFocus(true)}
//             onBlur={() => setIsFocus(false)}
//             onChange={item => {
//               setValue(prev => ({
//                 ...prev,
//                 category: item?.label, // ✅ Save only the selected value
//               }));
//               setIsFocus(false);
//             }}

//           />
//         </View>
//       </View>



//       {/* Continue button */}
//       <View style={tw`flex mb-6 my-12 items-center justify-center w-full`}>
//         <TButton
//         onPress={handleSave}
//           titleStyle={tw`text-black font-bold text-center`}
//           title="Continue"
//           containerStyle={tw`bg-primary w-[90%] rounded-full`}
//         />
//       </View>

//       <StatusBar backgroundColor={'gray'} translucent={false} />
//     </ScrollView>
//   );
// };

// export default ExplainMembership;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#262329',
//     padding: 20,
//   },
//   dropdown: {
//     height: 40,
//     color: 'white',
//     backgroundColor: "#262329",
//     borderColor: 'gray',
//     borderWidth: 0.5,
//     borderRadius: 18,
//     paddingHorizontal: 8,
//   },
//   icon: {
//     marginRight: 5,
//     color: 'white',
//   },
//   // label: {
//   //   position: 'absolute',

//   //   left: 22,
//   //   top: 8,
//   //   zIndex: 999,
//   //   paddingHorizontal: 8,
//   //   fontSize: 14,
//   // },
//   placeholderStyle: {
//     fontSize: 16,
//     color: 'white',
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//     color: "white"
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
//   },
// });



// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   Modal,
//   StyleSheet,
//   Alert,
// } from 'react-native';

// import { SvgXml } from 'react-native-svg';
// import { useColorScheme } from 'react-native';
// import { Dropdown } from 'react-native-element-dropdown';
// import Textarea from 'react-native-textarea';
// import DocumentPicker from 'react-native-document-picker';
// import RNFS from 'react-native-fs';

// import { usePostBecmeAContibutorMutation } from '../redux/apiSlice/serviceSlice';
// import { getExplainMemberValue, setExplainMemberValue } from '../utils';
// import tw from '../lib/tailwind';
// import { IconBack, IconCross, IconDollar, IconUpload } from '../assets/icons/icons';
// import TButton from '../components/TButton';
// import { useGetAllCategoryQuery } from '../redux/apiSlice/categorySlice';

// const initialDropdown = [
//   { label: 'marketing', value: '1' },
//   { label: 'finance', value: '2' },
//   { label: 'law', value: '3' },
//   { label: 'economy', value: '4' },
//   { label: 'writing', value: '5' },
//   { label: 'business', value: '6' },
//   { label: 'Add New...', value: 'add_new' },
// ];

// const ExplainMembership = ({ navigation }: { navigation: any }) => {
//   const isDarkMode = useColorScheme() === 'dark';
//   const [iconUri, setIconUri] = useState(null);
//   const [value, setValue] = useState({
//     title: '',
//     subtitle: '',
//     currency: '',
//     price: '',
//     description: '',
//     category: '',
//     icon: null as null | {
//       uri: string;
//       type: string;
//       name: string;
//       content: string;
//     },
//   });
//   console.log(value?.category, "value in explainMembership++++++")
//   const [dropdownItems, setDropdownItems] = useState();
//   const [isFocus, setIsFocus] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [newCategory, setNewCategory] = useState('');
//   const { data: category } = useGetAllCategoryQuery({})
//   console.log(category?.data, "category data from api")
//   // const [postBecmeAContibutor, { isLoading }] = usePostBecmeAContibutorMutation();

//   useEffect(() => {
//     const savedValue = getExplainMemberValue();
//     if (savedValue) setValue(savedValue);
//   }, []);

//   useEffect(() => {
//     setExplainMemberValue(value);
//   }, [value]);

//   useEffect(() => {
//   if (category?.data) {
//     const formatted = [
//       ...category.data.map(item => ({
//         label: item.name,
//         value: item._id,
//         ...item,
//       })),
//       { label: 'Add New...', value: 'add_new' },
//     ];
//     setDropdownItems(formatted);
//   }
// }, [category]);


//   const handleSave = async () => {
//     // try {
//     //   const formData = new FormData();
//     //   formData.append('title', value.title);
//     //   formData.append('subtitle', value.subtitle);
//     //   formData.append('currency', value.currency);
//     //   formData.append('description', value.description);
//     //   formData.append('category', value.category);

//     //   const res = await postBecmeAContibutor(formData);
//     //   if ('data' in res) {
//     setExplainMemberValue(value);
//     navigation.navigate('ExplainMembership1');
//     //   } else {
//     //     Alert.alert('Submission Failed', 'Please try again later.');
//     //   }
//     // } catch (err) {
//     //   Alert.alert('Error', 'An unexpected error occurred.');
//     // }
//   };

//  const addNewCategory = () => {
//   if (newCategory.trim() === '') return;

//   const items = dropdownItems ?? [];

//   const updated = [
//     ...items.slice(0, -1),
//     { label: newCategory, value: `${items.length}` },
//     items[items.length - 1],
//   ];

//   setDropdownItems(updated);
//   setValue(prev => ({ ...prev, category: newCategory }));
//   setNewCategory('');
//   setShowModal(false);
// };


//   const renderItem = (item: { label: string; value: string }) => (
//     <View
//       style={[
//         styles.item,
//         { backgroundColor: isDarkMode ? '#222' : '#eee' },
//       ]}
//     >
//       <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>{item.label}</Text>
//     </View>
//   );
//   const handleAdd = () => {
//     if (newCategory.trim()) {
//       addNewCategory(newCategory.trim());
//       setNewCategory('');
//       setShowModal(false);
//     }
//   };

//   const uploadIcon = async () => {
//     try {
//       const res = await DocumentPicker.pick({
//         type: [DocumentPicker.types.allFiles], // OR use explicit MIME
//         // type: ['image/svg+xml'],
//       });

//       const file = res[0];
//       console.log(file);

//       // Check and validate MIME
//       if (file.type !== 'image/svg+xml') {
//         Alert.alert('Invalid file', 'Please upload an SVG file.');
//         return;
//       }

//       // setValue(prev => ({
//       //   ...prev,
//       //   icon: {
//       //     uri: file.uri,
//       //     type: file.type,
//       //     name: file.name,
//       //   },
//       // }));
//       const svgContent = await RNFS.readFile(file.uri, 'utf8');
//       setValue(prev => ({
//         ...prev,
//         icon: {
//           uri: file.uri,
//           type: file.type,
//           name: file.name,
//           content: svgContent, // ✅ store SVG string
//         },
//       }));
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         console.log('User cancelled picker');
//       } else {
//         console.error('File picker error', err);
//       }
//     }
//   };

//  const formattedCategoryData = Array.isArray(category?.data)
//   ? [
//       ...category.data.map(item => ({
//         label: item.name,
//         value: item._id,
//         ...item,
//       })),
//       { label: 'Add New...', value: 'add_new' },
//     ]
//   : [{ label: 'Add New...', value: 'add_new' }];



//   return (
//     <ScrollView contentContainerStyle={tw`flex-1 bg-black px-[4%]`}>
//       <View style={tw`my-10`}>
//         {/* Header */}
//         <View style={tw`flex-row w-full justify-between items-center`}>
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             style={tw`bg-PrimaryFocus rounded-full p-1`}
//           >
//             <SvgXml xml={IconBack} />
//           </TouchableOpacity>
//           <Text style={tw`text-white font-bold text-2xl`}>
//             Explain Membership
//             </Text>
//           <View style={tw`w-8`} />
//         </View>

//         {/* Title Input */}
//         <Text style={tw`text-white font-bold text-xs mt-4`}>
//           Title
//         </Text>
//         <TextInput
//           style={tw`mt-1 w-full h-10 text-white bg-[#262329] border border-gray-400 rounded-2xl px-3`}
//           placeholder="Write title here"
//           placeholderTextColor={'white'}
//           value={value.title}
//           onChangeText={text => setValue(prev => ({ ...prev, title: text }))}
//         />

//         {/* Subtitle Input */}
//         <Text style={tw`text-white font-bold text-xs mt-2`}>
//           Subtitle
//         </Text>
//         <TextInput
//           style={tw`mt-1 w-full h-10 text-white bg-[#262329] border border-gray-400 rounded-2xl px-3`}
//           placeholder="Write subtitle here"
//           placeholderTextColor={'white'}
//           value={value.subtitle}
//           onChangeText={text => setValue(prev => ({ ...prev, subtitle: text }))}
//         />

//         {/* Currency Input */}
//         <Text style={tw`text-white font-bold text-xs mt-2`}>
//           price
//         </Text>
//         <View style={tw`relative mt-2`}>
//           <TextInput
//             style={tw`w-full h-10 text-white bg-[#262329] border border-gray-400 rounded-2xl px-10`}
//             placeholder="Enter price"
//             placeholderTextColor={'white'}
//             value={value.currency}
//             onChangeText={text => setValue(prev => ({ ...prev, currency: text }))}
//           />
//           <View style={tw`absolute left-3 top-2`}>
//             <SvgXml xml={IconDollar} width={20} height={20} />
//           </View>
//         </View>

//         {/* Description Textarea */}
//         <Text style={tw`text-white font-bold text-xs mt-2`}>
//           About
//         </Text>
//         <View style={tw`h-44 mt-2 p-2 bg-[#262329] border border-[#565358] w-full rounded-lg`}>
//           <Textarea
//             style={tw`h-40 text-white`}
//             placeholder="Write description here"
//             placeholderTextColor="#c7c7c7"
//             underlineColorAndroid="transparent"
//             multiline
//             maxLength={120}
//             value={value.description}
//             onChangeText={text => setValue(prev => ({ ...prev, description: text }))}
//             textAlignVertical="top"
//           />
//         </View>

//         {/* Dropdown */}
//         <Text style={tw`text-white font-bold text-xs mt-2`}>
//           Category
//         </Text>
//         <View style={tw`mt-2`}>
//           <Dropdown
//             style={styles.dropdown}
//             placeholderStyle={styles.placeholderStyle}
//             selectedTextStyle={styles.selectedTextStyle}
//             data={formattedCategoryData}
//             maxHeight={600}
//             labelField="label"
//             valueField="label"
//             placeholder={!isFocus ? 'Select category' : '...'}
//             value={value.category}
//             onFocus={() => setIsFocus(true)}
//             onBlur={() => setIsFocus(false)}
//             onChange={item => {
//               console.log(item, "item from dropdown")
//               if (item.value === 'add_new') {
//                 setShowModal(true);
//               } else {
//                 setValue(prev => ({ ...prev, category: item.label }));
//               }
//               setIsFocus(false);
//             }}
//             renderItem={renderItem}
//           />
//         </View>
//       </View>

//       {/* Submit Button */}
//       <View style={tw`mb-10 mt-6 items-center`}>
//         <TButton
//           onPress={handleSave}
//           title="Continue"
//           titleStyle={tw`text-black font-bold`}
//           containerStyle={tw`bg-primary w-[90%] rounded-full`}
//         />
//       </View>

//       {/* Modal */}
//       <Modal visible={showModal} transparent animationType="slide">
//         <View style={tw`flex-1 justify-center items-center bg-black/50`}>
//           <View style={tw`bg-[#262329] w-[90%] p-5 rounded-xl`}>
//             <Text style={tw`text-lg font-semibold mb-3 text-white`}>
//               Add New Category
//             </Text>

//             <TextInput
//               placeholder="Enter category name"
//               value={newCategory}
//               onChangeText={setNewCategory}
//               placeholderTextColor="#999"
//               style={tw`border border-gray-300 px-3 py-2 rounded-lg text-white`}
//             />
//             {/* <View style={tw`mt-2 h-24 items-center justify-center border border-gray-300 rounded-lg p-2`}>
//               {value.icon?.content ? (
//                 <View style={tw`relative right-0 items-center p-2 border  border-white rounded-lg w-[14]`}>
//                   <SvgXml
//                     xml={value.icon.content}
//                     width={25}
//                     height={25}
//                   />
//                   <TouchableOpacity
//                     style={tw`absolute top-0 right-0`}
//                     onPress={(e) => {
//                       e.stopPropagation(); // Prevent triggering the upload
//                       setValue(prev => ({ ...prev, icon: null })); // Clear icon
//                     }}
//                   >
//                     <SvgXml xml={IconCross} width={20} height={20} />
//                   </TouchableOpacity>
//                 </View>
//               ) : (
//                 <TouchableOpacity onPress={uploadIcon} style={tw``}>
//                   <SvgXml xml={IconUpload} width={25} height={25} />
//                 </TouchableOpacity>

//               )}
//               {!value.icon?.uri && (
//                 <Text style={tw`text-center font-bold mt-2 `}>Add Iocn</Text>
//               )}

//             </View> */}

//             <View style={tw`flex-row justify-end mt-4`}>
//               <TouchableOpacity
//                 onPress={() => {
//                   setNewCategory('');
//                   setShowModal(false);
//                 }}
//                 style={tw`mr-4`}
//               >
//                 <Text style={tw`text-red-500`}>Cancel</Text>
//               </TouchableOpacity>

//               <TouchableOpacity onPress={handleAdd}>
//                 <Text style={tw`text-white`}>Add</Text>
//               </TouchableOpacity>
//             </View>

//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   dropdown: {
//     height: 50,
//     borderColor: '#888',
//     borderWidth: 1,
//     borderRadius: 12,
//     paddingHorizontal: 10,
//     backgroundColor: '#262329',
//   },
//   placeholderStyle: {
//     fontSize: 16,
//     color: '#ccc',
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//     color: 'white',
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   item: {
//     padding: 15,
//     borderBottomWidth: 0.5,
//     borderBottomColor: '#ccc',
//   },
// });

// export default ExplainMembership;

import { IconBack, IconDollar } from '@/src/assets/icons/icons';
import Button from '@/src/components/Button';
import NormalModal from '@/src/components/NormalModal';
import TButton from '@/src/components/TButton';
import tw from '@/src/lib/tailwind';
import { useGetAllCategoryQuery } from '@/src/redux/apiSlice/categorySlice';
import { getExplainMemberValue, setExplainMemberValue } from '@/src/utils';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { useColorScheme } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SvgXml } from 'react-native-svg';


const ExplainMembership = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [value, setValue] = useState({
    title: '',
    subtitle: '',
    currency: '',
    price: '',
    description: '',
    category: '',
    icon: null,
  });
  const [dropdownItems, setDropdownItems] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [priceError, setPriceError] = useState('');
  const { data: category } = useGetAllCategoryQuery({});
  const [explainMembershipConfirmationModalVisible, setExplainMembershipConfirmationModalVisible] =
    useState(false);

  useEffect(() => {
    const loadSavedValue = async () => {
      const savedValue = await getExplainMemberValue();
      if (savedValue) setValue(savedValue);
    }
    loadSavedValue();
  }, []);

  useEffect(() => {
    console.log('Saving to storage:', value, "saving to storage+++++++++++++");
    setExplainMemberValue(value);
  }, [value]);

  useEffect(() => {
    if (category?.data) {
      const formatted = [
        ...category.data.map(item => ({
          label: item.name,
          value: item._id,
        })),
        // { label: 'Add New...', value: 'add_new' },
      ];
      setDropdownItems(formatted);
    }
  }, [category]);

  const handleSave = async () => {
    // currently checking if it is less than 3, but should be less than or equal to 3
    const price = parseFloat(value.currency);

    if (isNaN(price)) {
      console.log('Error', 'Please enter a valid number');
      setPriceError("Please enter a valid number")
      return;
    }

    if (price < 3) {
      console.log('Error', 'Price must be at least $3');
      setPriceError('Price must be at least $3');
      return;
    }

    // Proceed with saving
    console.log('Valid price:', price);


    const isEmpty =
      !value?.title?.trim() ||
      !value?.subtitle?.trim() ||
      !value?.currency?.trim() ||

      !value?.description?.trim() ||
      !value?.category?.trim()


    if (isEmpty) {
      console.log(isEmpty, "isEmpty+++++++++++++")
      // Alert.alert('Error', 'Please fill in all fields before continue.');
      setExplainMembershipConfirmationModalVisible(true);
      console.log('Error', 'Please fill in all fields before uploading.');
      return;
    }

    setExplainMembershipConfirmationModalVisible(true);
    setExplainMemberValue(value);
    // setValue({
    //   title: '',
    //   subtitle: '',
    //   currency: '',
    //   description: '',
    //   category: '',
    // });
    router.push('/screens/ExplainMembership1');
  };

  const addNewCategory = () => {
    if (newCategory?.trim() === '') return;

    const updated = [
      ...dropdownItems.slice(0, -1),
      { label: newCategory, value: `custom_${Date.now()}` },
      dropdownItems[dropdownItems.length - 1],
    ];

    setDropdownItems(updated);
    setValue(prev => ({ ...prev, category: newCategory }));
    setNewCategory('');
    setShowModal(false);
  };

  const renderItem = item => (
    <View style={[styles.item, { backgroundColor: isDarkMode ? '#222' : '#262329', }]}>

      <Text style={{ color: isDarkMode ? '#fff' : 'white' }}>{item.label}</Text>

    </View>
  );

  // const uploadIcon = async () => {
  //   try {
  //     const res = await DocumentPicker.pick({ type: [DocumentPicker.types.allFiles] });
  //     const file = res[0];
  //     if (file.type !== 'image/svg+xml') {
  //       Alert.alert('Invalid file', 'Please upload an SVG file.');
  //       return;
  //     }
  //     const svgContent = await RNFS.readFile(file.uri, 'utf8');
  //     setValue(prev => ({
  //       ...prev,
  //       icon: {
  //         uri: file.uri,
  //         type: file.type,
  //         name: file.name,
  //         content: svgContent,
  //       },
  //     }));
  //   } catch (err) {
  //     if (!DocumentPicker.isCancel(err)) console.error('File picker error', err);
  //   }
  // };

  const handleCurrencyChange = (text: string) => {
    // Allow user to type anything, just store the value
    setValue(prev => ({ ...prev, currency: text }));
  };
  const scrollRef = useRef<KeyboardAwareScrollView>(null);

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
      extraKeyboardSpace={Platform.OS === 'ios' ? 100 : 0} // space above keyboard
    >
      <View style={tw`mb-10`}>
        <View style={tw`flex-row w-full justify-between items-center`}>
          <TouchableOpacity onPress={() => router.back()} style={tw`bg-black rounded-full p-1`}>
            <SvgXml xml={IconBack} />
          </TouchableOpacity>
          <Text style={tw`text-white font-bold text-2xl`}>Explain Membership</Text>
          <View style={tw`w-8`} />
        </View>

        <Text style={tw`text-white font-bold text-xs mt-4`}>Title</Text>
        <TextInput
          style={tw`mt-1 w-full h-10 text-white bg-[#262329] rounded-2xl px-3`}
          placeholder="Write title here"
          placeholderTextColor="white"
          value={value.title}
          onChangeText={text => setValue(prev => ({ ...prev, title: text }))}
        />
        {!value?.title?.trim() && (
          <Text style={tw`text-red-600 text-xs mt-2`}>
            Please enter a title.*</Text>
        )}
        {/* <Text style={tw`text-white font-bold text-xs mt-2`}>Subtitle</Text>
        <TextInput
          style={tw`mt-1 w-full h-10 text-white bg-[#262329] rounded-2xl px-3`}
          placeholder="Write subtitle here"
          placeholderTextColor="white"
          value={value.subtitle}
          onChangeText={text => setValue(prev => ({ ...prev, subtitle: text }))}
        />
        {!value?.subtitle?.trim() && (
          <Text style={tw`text-red-600 text-xs mt-2`}>
            Please enter a subtitle.*</Text>
        )} */}
        <Text style={tw`text-white font-bold text-xs mt-2`}>Price</Text>
        <View style={tw`relative mt-2`}>
          <TextInput
            style={tw`w-full h-10 text-white bg-[#262329] rounded-2xl px-10`}
            placeholder="Enter price (Minimum 3$)"
            placeholderTextColor="white"
            value={value.currency}
            keyboardType='numeric'
            // onChangeText={text => setValue(prev => ({ ...prev, currency: text }))}
            onChangeText={handleCurrencyChange}
          />
          <View style={tw`absolute left-3 top-2`}>
            <SvgXml xml={IconDollar} width={20} height={20} />
          </View>
        </View>
        {priceError ? (
          <Text style={tw`text-red-600 text-xs mt-2`}>{priceError}</Text>
        ) : null}
        {!value?.currency?.trim() && (
          <Text style={tw`text-red-600 text-xs mt-2`}>
            Please enter a price.*</Text>
        )}
        <Text style={tw`text-white font-bold text-xs mt-2`}>About</Text>
        <View style={tw`h-44 mt-2 p-2 bg-[#262329] w-full rounded-2xl`}>


          <TextInput
            selectionColor="white"
            style={tw`text-white rounded-lg p-3 h-32 `}
            onChangeText={text => setValue(prev => ({ ...prev, description: text }))}
            value={value.description}
            placeholder="Enter your text here..."
            placeholderTextColor="#c7c7c7"
            multiline={true} // makes it a text area
            textAlignVertical="top" // keeps text starting from top
          />
        </View>
        {!value?.description?.trim() && (
          <Text style={tw`text-red-600 text-xs mt-2`}>
            Please enter a description.*</Text>
        )}
        <Text style={tw`text-white font-bold text-xs mt-2`}>Category</Text>
        <View style={tw`mt-2`}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={dropdownItems}
            maxHeight={600}
            labelField="label"
            valueField="label"
            placeholder={!isFocus ? 'Select category' : '...'}
            value={value.category}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              if (item.value === 'add_new') {
                setShowModal(true);
              } else {
                setValue(prev => ({ ...prev, category: item.label }));
              }
              setIsFocus(false);
            }}
            renderItem={renderItem}
          />
        </View>
        {!value?.description?.trim() && (
          <Text style={tw`text-red-600 text-xs mt-2`}>
            Please select a category.*</Text>
        )}
      </View>

      <View style={tw`mb-10 mt-4 items-center`}>
        <TButton
          onPress={handleSave}
          title="Continue"
          titleStyle={tw`text-black font-bold`}
          containerStyle={tw`bg-primary w-[100%] rounded-2xl`}
        />
      </View>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={tw`flex-1 justify-center items-center bg-black/50`}>
          <View style={tw`bg-[#262329] w-[90%] p-5 rounded-xl`}>
            <Text style={tw`text-lg font-semibold mb-3 text-white`}>Add New Category</Text>

            <TextInput
              placeholder="Enter category name"
              value={newCategory}
              onChangeText={setNewCategory}
              placeholderTextColor="#999"
              style={tw`border border-[#565358] px-3 py-2 rounded-lg text-white`}
            />

            <View style={tw`flex-row justify-end mt-4`}>
              <TouchableOpacity
                onPress={() => {
                  setNewCategory('');
                  setShowModal(false);
                }}
                style={tw`mr-4`}
              >
                <Text style={tw`text-red-500`}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={addNewCategory}>
                <Text style={tw`text-white`}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <NormalModal
        layerContainerStyle={tw`flex-1 justify-center items-center mx-5`}
        containerStyle={tw`rounded-xl bg-zinc-900 p-5`}
        visible={explainMembershipConfirmationModalVisible}
        setVisible={setExplainMembershipConfirmationModalVisible}>
        <View>
          <Text style={tw`text-white text-lg text-center font-RoboBold mb-2`}>
            Please fill in all fields before continue.
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
                  setExplainMembershipConfirmationModalVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </NormalModal>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: "4%" },
  contentContainer: { flexGrow: 1,},
  inputWrapper: { marginVertical: 20, paddingHorizontal: 16 },
  input: { height: 50, borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8 },
  dropdown: {
    height: 40,
    // borderColor: '#565358',
    // borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 10,
    backgroundColor: '#262329',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#ccc',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white',
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',

  },
});

export default ExplainMembership;

