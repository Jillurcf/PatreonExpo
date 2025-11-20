// devices screen size

import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// import {MMKVLoader} from 'react-native-mmkv-storage';
// import { imageUrl } from './redux/baseApi';


// export const lStorage = new MMKVLoader().initialize();

// export const PrimaryColor = '#4964C6';

// export const Android = Platform.OS === 'android';

// export const Ios = Platform.OS === 'ios';

// export const makeImage = (url: string) => {
//   return url.startsWith('https') ? url : imageUrl + url;
// };
// export const makeImageUrl = (url: string) => {
//   return imageUrl + url;
// };

// export const {width, height} = Dimensions.get('screen');
// //  three size like sm md or tablet
// const fontScale = PixelRatio.getFontScale();
// export const FontSize = (size: number) => size / fontScale;

// export const isSmall = () => {
//   return width < 375;
// };
// export const isTablet = () => {
//   return width >= 768;
// };

// export const isMobile = () => {
//   return width < 768;
// };

// export const setStorageToken = (token: string) => {
//   lStorage.setString('token', token);
// };

// export const getStorageToken = () => {
//   return lStorage.getString('token');
// };

// export const removeStorageToken = () => {
//   lStorage.removeItem('token');
// };

// export const setStorageRole = (role: string) => {
//   lStorage.setString('role', role);
// };

// export const getStorageRole = () => {
//   return lStorage.getString('role');
// };

// export const removeStorageRole = () => {
//   lStorage.removeItem('role');
// };

// // Store and retrieve service object
// export const setServiceData = (service: any) => {
//   lStorage.setMap('services', service);
// };

// export const getServiceData = () => lStorage.getMap('services');

// // for pormInput 

// // Save form value object
// export const setExplainMemberValue = (value: {
//   title: string;
//   subtitle: string;
//   currency: string;
//   price: string;
//   description: string;
//   category: string;
// }) => {
//   try {
//     lStorage.setString('explainMemberValue', JSON.stringify(value));
//   } catch (error) {
//     console.error('Failed to save form value:', error);
//   }
// };

// // Load form value object
// export const getExplainMemberValue = (): {
//   title: string;
//   subtitle: string;
//   currency: string;
//   price: string;
//   description: string;
//   category: string;
// } => {
//   try {
//     const storedValue = lStorage.getString('explainMemberValue');
//     return storedValue
//       ? JSON.parse(storedValue)
//       : {
//           title: '',
//           subtitle: '',
//           currency: '',
//           price: '',
//           description: '',
//           category: '',
//         };
//   } catch (error) {
//     console.error('Failed to load form value:', error);
//     return {
//       title: '',
//       subtitle: '',
//       currency: '',
//       price: '',
//       description: '',
//       category: '',
//     };
//   }
// };

// // Optional: clear it
// export const clearFormValue = () => {
//   try {
//     lStorage.removeItem('explainMemberValue');
//   } catch (error) {
//     console.error('Failed to clear form value:', error);
//   }
// };



// export const saveMediaPromptData = (
//   selectedPdf: File,
//   capturedVideo: string | null,
//   promptInput: string | null
// ) => {
//   try {
//     lStorage.setString('selectedImages', JSON.stringify(selectedPdf));
//     lStorage.setString('capturedVideo', capturedVideo || '');
//     lStorage.setString('promptInput', promptInput || '');
//   } catch (e) {
//     console.error('Storage Save Error:', e);
//   }
// };

// export const loadMediaPromptData = () => {
//   try {
//     const images = lStorage.getString('selectedImages');
//     const video = lStorage.getString('capturedVideo');
//     const prompt = lStorage.getString('promptInput');

//     return {
//       selectedImages: images ? JSON.parse(images) : [],
//       capturedVideo: video || null,
//       promptInput: prompt || '',
//     };
//   } catch (e) {
//     console.error('Storage Load Error:', e);
//     return { selectedImages: [], capturedVideo: null, promptInput: '' };
//   }
// };

// export const clearMediaPromptData = () => {
//   try {
//     lStorage.removeItem('selectedImages');
//     lStorage.removeItem('capturedVideo');
//     lStorage.removeItem('promptInput');
//   } catch (e) {
//     console.error('Storage Clear Error:', e);
//   }
// };




// export const useImagePicker = async ({
//   option,
//   selectionLimit,
// }: {
//   option: 'camera' | 'library';
//   selectionLimit?: number;
// }) => {
//   try {
//     if (option === 'camera') {
//       const result = await launchCamera({
//         mediaType: 'photo',
//         maxWidth: 500,
//         maxHeight: 500,
//         quality: 0.5,
//       });

//       if (!result.didCancel) {
//         return result.assets;
//       }
//     }
//     if (option === 'library') {
//       const result = await launchImageLibrary({
//         mediaType: 'photo',
//         maxWidth: 500,
//         maxHeight: 500,
//         quality: 0.5,
//         selectionLimit: selectionLimit || 1, // Set to 0 for unlimited image selection
//       });

//       if (!result.didCancel) {
//         return result.assets;
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// function getRandomHashColor() {
//   let letters = '0123456789ABCDEF';
//   let color = '#';

//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }

//   return color;
// }

// =======================Token Storage with AsyncStorage=======================
export const setStorageToken = async (token: string) => {
  await AsyncStorage.setItem('token', token);
};

export const getStorageToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('token');
};

export const removeStorageToken = async () => {
  return await AsyncStorage.removeItem('token');
};
// ======================Role Storage with AsyncStorage=======================
export const setStorageRole = async (role: string) => {
  await AsyncStorage.setItem('role', role);
};

export const getStorageRole = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('role');
};

export const removeStorageRole = async () => {
  await AsyncStorage.removeItem('role');
};
// ======================Service Data Storage with AsyncStorage=======================
export const setServiceData = async (service: any) => {
  await AsyncStorage.setItem('services', JSON.stringify(service));
};

export const getServiceData = async (): Promise<any> => {
  const data = await AsyncStorage.getItem('services');
  return data ? JSON.parse(data) : null;
};
// ======================Explain Member Value Storage with AsyncStorage=======================
export const setExplainMemberValue = async (value: {
  title: string;
  subtitle: string;
  currency: string;
  price: string;
  description: string;
  category: string;
}) => {
  try {
    await AsyncStorage.setItem('explainMemberValue', JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save form value:', error);
  }
};

export const getExplainMemberValue = async (): Promise<{
  title: string;
  subtitle: string;
  currency: string;
  price: string;
  description: string;
  category: string;
}> => {
  try {
    const storedValue = await AsyncStorage.getItem('explainMemberValue');
    return storedValue
      ? JSON.parse(storedValue)
      : {
        title: '',
        subtitle: '',
        currency: '',
        price: '',
        description: '',
        category: '',
      };
  } catch (error) {
    console.error('Failed to load form value:', error);
    return {
      title: '',
      subtitle: '',
      currency: '',
      price: '',
      description: '',
      category: '',
    };
  }
};

export const clearFormValue = async () => {
  await AsyncStorage.removeItem('explainMemberValue');
};
// ======================Media and Prompt Data Storage with AsyncStorage=======================
export const saveMediaPromptData = async (
  selectedPdf: File,
  capturedVideo: string | null,
  promptInput: string | null,
  value: string | null
) => {
  try {
    await AsyncStorage.setItem('selectedImages', JSON.stringify(selectedPdf));
    await AsyncStorage.setItem('capturedVideo', capturedVideo || '');
    await AsyncStorage.setItem('promptInput', promptInput || '');
    await AsyncStorage.setItem('title', JSON.stringify(value?.title || ''));


  } catch (e) {
    console.error('Storage Save Error:', e);
  }
};

export const loadMediaPromptData = async () => {
  try {
    const images = await AsyncStorage.getItem('selectedImages');
    const video = await AsyncStorage.getItem('capturedVideo');
    const prompt = await AsyncStorage.getItem('promptInput');
    const titleData = await AsyncStorage.getItem('title');

    return {
      selectedImages: images ? JSON.parse(images) : [],
      capturedVideo: video || null,
      promptInput: prompt || '',
     title: titleData ? JSON.parse(titleData) : '',
    };
  } catch (e) {
    console.error('Storage Load Error:', e);
    return { selectedImages: [], capturedVideo: null, promptInput: '' };
  }
};

export const clearMediaPromptData = async () => {
  try {
    await AsyncStorage.multiRemove([
      'selectedImages',
      'capturedVideo',
      'promptInput',
      'title'
    ]);
  } catch (e) {
    console.error('Storage Clear Error:', e);
  }
};
// ======================image Picker Hook=======================
export const useImagePicker = async ({
  option,
  selectionLimit,
}: {
  option: 'camera' | 'library';
  selectionLimit?: number;
}) => {
  try {
    if (option === 'camera') {
      const result = await launchCamera({
        mediaType: 'photo',
        maxWidth: 500,
        maxHeight: 500,
        quality: 0.5,
      });

      if (!result.didCancel) {
        return result.assets;
      }
    }
    if (option === 'library') {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        maxWidth: 500,
        maxHeight: 500,
        quality: 0.5,
        selectionLimit: selectionLimit || 1, // Set to 0 for unlimited image selection
      });

      if (!result.didCancel) {
        return result.assets;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

function getRandomHashColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}