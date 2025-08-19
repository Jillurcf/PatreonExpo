import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import tw from '../../lib/tailwind';
import TButton from '../../components/TButton';
import { router, useLocalSearchParams } from 'expo-router';

type Props = {};

const PaymentResult = () => {
   const { id, serviceId, title } = useLocalSearchParams();
   console.log(id, serviceId, "id===================17")
    useEffect(() => {
      const timer = setTimeout(() => {
       router.replace({
        pathname: "/screens/MessageScreen", 
        params: {
          id:id,
          serviceId: serviceId,
          title: title,
        }
       })
      }, 1000);
      return () => clearTimeout(timer)
    }, []);
  return (
    <View style={tw`flex-1 bg-black items-center justify-center px-[4%]`}>
      
      <View style={tw`flex-1 bg-black items-center justify-center`}>
        <Image source={require('../../assets/images/paymentSuccess.png')} />
        <Text style={tw`text-primary text-xl font-AvenirLTProBlack mt-6`}>
         Payment Successful
        </Text>
        <Text
          style={tw`text-primary text-center px-[5%] font-AvenirLTProBlack mt-2`}>
          Your account has been successfully subscribed to
          this creator.
        </Text>
      </View>
       {/* =======================================button area==================== */}
      
          
          <View style={tw`w-full items-center my-6`}>
            <TButton
              onPress={() => router.back()}
              title="Back"
              titleStyle={tw`text-black`}
              containerStyle={tw`w-[90%] bg-white`}
            />
          </View>
       
      <StatusBar backgroundColor="black" translucent />
    </View>
  );
};

export default PaymentResult;

const styles = StyleSheet.create({});
