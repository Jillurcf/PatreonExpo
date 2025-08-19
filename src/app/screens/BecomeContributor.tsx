import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  IconAple,
  IconBack,
  IconGoogle,
  IconLanguage,
  IconNotification,
  IconPaymentMethod,
  IconPaypal,
  IconRightArrow,
  IconSettingNotificaiton,
  IconTermsAndCondition,
} from '../../assets/icons/icons';
import {SvgXml} from 'react-native-svg';
import tw from '../../lib/tailwind';
import {RadioButton} from 'react-native-ui-lib';
import TButton from '../../components/TButton';
import { router } from 'expo-router';

// import RadioButtonRN from 'radio-buttons-react-native';

type Props = {};

const BecomeContributor = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  

  const handleRadioButtonPress = (option: string) => {
    setSelectedOption(option);
  };
  return (
    <View style={tw`flex-1 bg-black px-[4%]`}>
      <View style={tw`flex-row w-full justify-between mt-4`}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={tw`bg-PrimaryFocus rounded-full p-1`}>
          <SvgXml xml={IconBack} />
        </TouchableOpacity>
        <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
          Become Contributor
        </Text>
        {/* Placeholder view for symmetry */}
        <View style={tw`w-8`} />
      </View>
      {/* ======================================setting menu area ======================= */}

      <View style={tw`items-center justify-center my-6`}>
        <View style={tw`bg-[#262329] w-[100%] rounded-2xl p-4  my-2`}>
          <TouchableOpacity
              onPress={() => router.push('/screens/ExplainMembership')}
            style={tw`flex-row gap-3 items-center my-6 `}>
            <View style={tw`flex-row items-center justify-between  w-full`}>
              <Text style={tw`text-white text-xl font-AvenirLTProBlack`}>
                Explain memebership
              </Text>
              <SvgXml width={20} xml={IconRightArrow} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => router.push('/screens/EnterInputScreen')}
            style={tw`flex-row gap-3 items-center my-6`}>
            <View style={tw`flex-row items-center justify-between w-full`}>
              <Text style={tw`text-white text-xl font-AvenirLTProBlack`}>
              Enter input
              </Text>
              <SvgXml width={20} xml={IconRightArrow} />
            </View>
          </TouchableOpacity>
          
        </View>
      </View>

      <StatusBar backgroundColor="black" translucent={false} />
    </View>
  );
};

export default BecomeContributor;

const styles = StyleSheet.create({});
