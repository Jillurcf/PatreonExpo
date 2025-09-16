

import { router } from 'expo-router';
import React from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import { IconBack } from '../../assets/icons/icons';
import tw from '../../lib/tailwind';

import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const PrivacyPolicy = () => {
    const handleDownload = async () => {
        try {
            // Load the asset (PDF in assets/pdfs/)
            const asset = Asset.fromModule(require('../../../assets/images/pp.pdf'));
            await asset.downloadAsync(); // ensures it’s available

            const dest = FileSystem.cacheDirectory + 'Privacy_policy.pdf';

            // Copy it to cache directory so we can share it
            await FileSystem.copyAsync({
                from: asset.localUri!,
                to: dest,
            });

            // Open sharing dialog
            await Sharing.shareAsync(dest);
        } catch (error) {
            console.log('Error downloading PDF:', error);
            // Alert.alert('Error', 'Could not download PDF.');
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
                    Privacy policy
                </Text>
                <View style={tw`w-8`} />
            </View>

            {/* Content */}
            <View style={tw`my-6`}>
                <Text style={tw`text-white font-AvenirLTProBlack text-xl`}>
                    1. Introduction
                </Text>
                <Text style={tw`text-white mt-4 font-AvenirLTProBlack`}>
                    1.1. Unless otherwise defined in this Privacy Policy, capitalized terms shall have the same
                    meaning as set forth in the Terms of Use of the Between AI Agent Marketplace....
                </Text>
            </View>

            {/* Download Button */}
            <TouchableOpacity
                onPress={handleDownload}
                style={tw`bg-PrimaryFocus p-4 rounded-2xl mb-10`}
            >
                <Text style={tw`text-white text-center font-AvenirLTProBlack`}>
                    Read more? Download PP as PDF
                </Text>
            </TouchableOpacity>

            <StatusBar backgroundColor="black" translucent={false} />
        </ScrollView>
    );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({});
