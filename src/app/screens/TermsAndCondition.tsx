

import { router } from 'expo-router';
import React from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import { IconBack } from '../../assets/icons/icons';
import tw from '../../lib/tailwind';

import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const TermsAndCondition = () => {
  const handleDownload = async () => {
    try {
      // Load the asset (PDF in assets/pdfs/)
      const asset = Asset.fromModule(require('../../../assets/images/tos.pdf'));
      await asset.downloadAsync(); // ensures it’s available

      const dest = FileSystem.cacheDirectory + 'Terms_of_service.pdf';

      // Copy it to cache directory so we can share it
      await FileSystem.copyAsync({
        from: asset.localUri!,
        to: dest,
      });

      // Open sharing dialog
      await Sharing.shareAsync(dest);
    } catch (error) {
      console.log('Error downloading PDF:', error);
      Alert.alert('Error', 'Could not download PDF.');
    }
  };

  return (
    <ScrollView style={tw`flex-1 bg-black px-[4%]`}>
      {/* Header */}
      <View style={tw`flex-row w-full justify-between mt-4`}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={tw`bg-black rounded-full p-1`}
        >
          <SvgXml xml={IconBack} />
        </TouchableOpacity>
        <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
          Terms of service
        </Text>
        <View style={tw`w-8`} />
      </View>

      {/* Content */}
      <View style={tw`my-6`}>
        <Text style={tw`text-white font-AvenirLTProBlack text-xl`}>
          1. Introduction
        </Text>
        <Text style={tw`text-white mt-4 font-AvenirLTProBlack`}>
          1.1. By using or accessing the Between AI Agent Marketplace (the “Marketplace”) and/or
          downloading or using any applications, tools, configurations, features, software,
          products, source code, agents, code, use cases and services provided through the
          Marketplace (collectively “Marketplace Services”), you acknowledge and agree that
          you have read, understood, and agree to the terms of service outlined below (“Terms”).
          This agreement is effective between you and Betweenai Limited (“we”, “us” “our”) as
          of the date of your accepting these Terms. Additional terms may apply...
        </Text>
      </View>

      {/* Download Button */}
      <TouchableOpacity
        onPress={handleDownload}
        style={tw`bg-PrimaryFocus p-4 rounded-2xl mb-10`}
      >
        <Text style={tw`text-white text-center font-AvenirLTProBlack`}>
          Read more? Download TOS as PDF
        </Text>
      </TouchableOpacity>

      <StatusBar backgroundColor="black" translucent={false} />
    </ScrollView>
  );
};

export default TermsAndCondition;

const styles = StyleSheet.create({});
