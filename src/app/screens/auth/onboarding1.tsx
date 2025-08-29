import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
//   import LinearGradient from 'react-native-linear-gradient';


import { router } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';
import TButton from '../../../components/TButton';
import tw from '../../../lib/tailwind';

type Props = {};

const Onboarding1 = () => {
  const handleCreateUser = async () => {
    console.log('click');
    
    try {
      // await createUser()
    } catch (error) {
      console.log(error);
    }
    router.push({
      pathname: "/screens/auth/phoneVerification",
      params: { screenName: "signup" }
    })
  };
  // return (
  //   <ScrollView contentContainerStyle={tw`bg-black flex-1 `}>
  //     <View style={tw`flex-col min-h-screen justify-between`}>
  //       <View style={tw`z-2 flex mx-auto items-center justify-center mt-32`}>
  //         <Text
  //           style={tw` font-AvenirLTProBlack text-center text-white  text-5xl`}>
  //           Get expert
  //         </Text>
  //         <Text
  //           style={tw`font-AvenirLTProBlack text-center text-white  text-5xl py-4`}>
  //           advice anytime
  //         </Text>
  //         <Text
  //           style={tw`font-AvenirLTProBlack text-center text-white  text-5xl`}>
  //           anywhere
  //         </Text>
  //       </View>
  //       <View style={tw`z-2 flex mx-auto mb-0 top-0`}>
  //         <View style={tw`my-2 flex items-center justify-center`}>
  //           <TButton
  //             onPress={handleCreateUser}
  //             titleStyle={tw`text-whiteBtnText font-bold font-AvenirLTProHeavy text-center mx-auto`}
  //             title="Sign up"
  //             containerStyle={tw`bg-white w-[90%] my-2 rounded-full`}
  //           />
  //           <TButton
  //             onPress={() => router.push('/screens/auth/login', {from: 'Login'})}
  //             titleStyle={tw`text-white font-bold font-AvenirLTProHeavy text-center mx-auto`}
  //             title="Log in"
  //             containerStyle={tw`bg-PrimaryFocus w-[90%] my-4 rounded-full`}
  //           />
  //         </View>
  //       </View>
  //     </View>

  //     <StatusBar backgroundColor={'black'} translucent />
  //   </ScrollView>
  // );

return (
    <ScrollView
      style={tw`flex-1 bg-black`}
      contentContainerStyle={tw`flex-grow justify-between min-h-full`}
      keyboardShouldPersistTaps="handled"
    >
      {/* Top Content */}
      <View style={tw`mt-32 items-center px-4`}>
        <Text style={tw`text-white text-5xl font-AvenirLTProBlack text-center`}>
          Get expert
        </Text>
        <Text style={tw`text-white text-5xl font-AvenirLTProBlack text-center py-4`}>
          advice anytime
        </Text>
        <Text style={tw`text-white text-5xl font-AvenirLTProBlack text-center`}>
          anywhere
        </Text>
      </View>

      {/* Bottom Buttons */}
      <View style={tw`w-full items-center mb-8 px-4`}>
        <TButton
          onPress={handleCreateUser}
          title="Sign up"
          titleStyle={tw`text-whiteBtnText font-bold font-AvenirLTProHeavy text-center`}
          containerStyle={tw`bg-white w-full my-2 rounded-full`}
        />
        <TButton
          onPress={() => router.push('/screens/auth/login', { from: 'Login' })}
          title="Log in"
          titleStyle={tw`text-white font-bold font-AvenirLTProHeavy text-center`}
          containerStyle={tw`bg-PrimaryFocus w-full my-4 rounded-full`}
        />
      </View>

      <StatusBar backgroundColor="black" translucent />
    </ScrollView>
  );
}

export default Onboarding1;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Full-screen view
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
  },
  imageBackground: {
    width: '100%', // Full width of the screen
    height: '100%', // Full height of the screen
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  gradientOverlay: {
    position: 'absolute', // Overlay on top of the image
    width: '100%', // Full width
    height: '100%', // Full height
    zIndex: 1, // Ensures it overlays the image
  },
});
