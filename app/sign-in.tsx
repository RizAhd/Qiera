import icons from '@/constants/icons';
import images from '@/constants/images';
import { login } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';
import { Redirect } from 'expo-router';
import React from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignIn = () => {
  const { refetch, loading, isLogged } = useGlobalContext();


  if (!loading && isLogged) return <Redirect href='/'/>



  const LogInProcess = async () => {
    const result = await login();

    if (result) {
      refetch();
      console.log('Login Success');
 
    } else {
      Alert.alert('Error', 'Failed To Login !!');
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Image
          source={images.onboarding}
          className="w-full h-[58%]"
          resizeMode="contain"
        />
        <Text className="text-base text-center font-rubik uppercase text-black mb-2">
          Welcome to Qiera
        </Text>

        <View className="px-10">
          <Text className="text-3xl font-rubikBold text-black text-center mt-2">
            Elevate Your Lifestyle {'\n'}
            <Text className="text-blue-500">With Us</Text>
          </Text>
          <Text className="text-lg font-rubik text-center text-blue-950 mt-12">
            Log In to Qiera
          </Text>
          <TouchableOpacity
            onPress={LogInProcess}
            className="bg-white shadow-md shadow-zinc-500 w-full rounded-full py-4 mt-5"
          >
            <View className="flex flex-row items-center justify-center">
              <Image
                source={icons.google}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="mx-4 font-bold">Continue With Google</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
