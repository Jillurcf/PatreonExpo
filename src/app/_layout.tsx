import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { Provider } from 'react-redux';
import tw from '../lib/tailwind';
import store from '../redux/store';


export default function RootLayout() {


  const [loaded] = useFonts({
    AvenirLTProBlack: require('../assets/font/AvenirLTProBlack.otf'),
    AvenirLTProBlackOblique: require('../assets/font/AvenirLTProBlackOblique.otf'),
    AvenirLTProBook: require('../assets/font/AvenirLTProBook.otf'),
    AvenirLTProBookOblique: require('../assets/font/AvenirLTProBookOblique.otf'),
    AvenirLTProLight: require('../assets/font/AvenirLTProLight.otf'),
    AvenirLTProLightOblique: require('../assets/font/AvenirLTProLightOblique.otf'),
    AvenirLTProMedium: require('../assets/font/AvenirLTProMedium.otf'),
    AvenirLTProMediumOblique: require('../assets/font/AvenirLTProMediumOblique.otf'),

    AvenirLTProHeavy: require('../assets/font/AvenirLTProHeavy.otf'),
    AvenirLTProHeavyOblique: require('../assets/font/AvenirLTProHeavyOblique.otf'),

    AvenirLTProOblique: require('../assets/font/AvenirLTProOblique.otf'),
    AvenirLTProRoman: require('../assets/font/AvenirLTProRoman.otf'),
  });

  if (!loaded) {

    return null;
  }
  return (
//     <StripeProvider publishableKey='pk_test_51RU8z5FKyrBH5NbyQJYa6IetLsNm5OXkwrWEkKl3knFqKhqqjf7pEveqcSv9ugfAitXz0ARA5slSEt9WPRPeBjaH00o6MCLwJB
//  '  >
 <KeyboardProvider>
  <SafeAreaView style={tw`flex-1 bg-black p-[4%]`}>
      <GestureHandlerRootView style={tw`flex-1`}>
        <Provider store={store}>
          <Slot />
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaView>
 </KeyboardProvider>

    // </StripeProvider >

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
