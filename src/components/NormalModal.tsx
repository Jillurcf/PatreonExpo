// import React from 'react';
// import { Pressable, View } from 'react-native';
// import { Modal } from 'react-native-ui-lib';
// import tw from '../lib/tailwind';

// interface NormalModalProps {
//   visible?: boolean;
//   setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
//   layerContainerStyle?: any;
//   containerStyle?: any;
//   children?: React.ReactNode;
//   overlay?: string;
// }

// const NormalModal = ({
//   setVisible,
//   visible,
//   containerStyle,
//   children,
//   layerContainerStyle,
//   overlay,
// }: NormalModalProps) => {
//   return (
//     <Modal
//       transparent={true}
//       animationType="fade"
//       enableModalBlur
//       overlayBackgroundColor={overlay || 'rgba(0, 0, 0, 0.9)'} // 👈 darker shade background
//       visible={visible}
//       onBackgroundPress={() => setVisible && setVisible(false)}
//     >
//       <View style={[tw`flex-1 justify-center items-center`, layerContainerStyle]}>
//         <Pressable style={[tw`bg-white w-full p-4 rounded-xl`, containerStyle]}>
//           {children}
//         </Pressable>
//       </View>
//     </Modal>
//   );
// };

// export default NormalModal;


import { BlurView } from 'expo-blur';
import React from 'react';
import { Pressable, View } from 'react-native';
import { Modal } from 'react-native-ui-lib';
import tw from '../lib/tailwind';

interface NormalModalProps {
  visible?: boolean;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  layerContainerStyle?: any;
  containerStyle?: any;
  children?: React.ReactNode;
}

const NormalModal = ({
  setVisible,
  visible,
  containerStyle,
  children,
  layerContainerStyle,
}: NormalModalProps) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onBackgroundPress={() => setVisible && setVisible(false)}
    >
      <View style={[tw`flex-1 justify-center items-center w-[100%]`, layerContainerStyle]}>
        {/* 👇 Frosted blur background */}
        <BlurView
          intensity={70} // increase to make the blur stronger
          tint="dark"    // options: 'light', 'dark', 'default'
          style={tw`absolute top-0 left-0 right-0 bottom-0`}
        />

        {/* 👇 Modal content */}
        <Pressable style={[tw`bg-[#141316] rounded-xl p-5`, containerStyle]}>
          {children}
        </Pressable>
      </View>
    </Modal>
  );
};

export default NormalModal;
