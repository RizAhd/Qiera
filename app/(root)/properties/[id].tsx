// app/property/[id].tsx
import ScreenWrapper from "@/components/ScreenWrapper";
import icons from '@/constants/icons';
import images from '@/constants/images';
import { getPropertyById } from '@/lib/appwrite';
import {
  isPropertySaved,
  toggleSaveProperty,
} from '@/lib/saveProperty';
import { useAppwrite } from '@/lib/useAppwrite';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';

import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Property = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const windowHeight = Dimensions.get('window').height;

  const { data: property, loading } = useAppwrite({
    fn: getPropertyById,
    params: id ? { id } : undefined,
  });
  
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    if (!property) return;

    isPropertySaved(property.$id).then(setSaved);
  }, [property]);

  const handleSave = async () => {
    if (!property) return;

    const updated = await toggleSaveProperty(property.$id);
    setSaved(updated.includes(property.$id));
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!property) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500">Property not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <ScreenWrapper hideChatBot>
      <SafeAreaView className="bg-white flex-1">
        {/* SCROLL CONTENT */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 90 }}
        >
          {/* Image */}
          <View className="relative w-full" style={{ height: windowHeight / 2 }}>
            <Image
              source={{ uri: property.image }}
              className="size-full"
              resizeMode="cover"
            />
            <Image
              source={images.whiteGradient}
              className="absolute top-0 w-full h-24 z-40"
            />

            <TouchableOpacity
              onPress={() => router.back()}
              className="absolute top-4 left-4 bg-gray-200 rounded-full size-11 items-center justify-center z-50"
            >
              <Image source={icons.backArrow} className="size-9" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="absolute top-4 right-4 rounded-full size-11 items-center justify-center z-50" 
              onPress={handleSave}
            >
              <Image
                source={saved ? icons.heart2 : icons.heart}
                className="size-9"
              />
            </TouchableOpacity>
          </View>

          {/* Title */}
          <View className="mt-4 mx-5">
            <Text className="text-blue-950 font-rubikBold text-3xl">
              {property.name}
            </Text>
          </View>

          {/* Type & Rating */}
          <View className="flex-row items-center mt-2 mx-5">
            <Text className="text-blue-500 text-[16px] mr-4 font-bold">
              {property.type}
            </Text>
            <Image source={icons.star} className="size-4 mr-1" />
            <Text className="text-gray-500 text-base">
              {property.rating}/5 Ratings
            </Text>
          </View>

          {/* Info */}
          <View className="flex-row justify-between mt-5 mb-4 px-1">
            <View className="flex-row items-center px-6">
              <Image source={icons.bed} className="size-4" />
              <Text className="text-gray-800 text-[12px] px-3 font-bold">
                {property.bedrooms} Beds
              </Text>
            </View>

            <View className="flex-row items-center px-6">
              <Image source={icons.bath} className="size-4" />
              <Text className="text-gray-800 text-[12px] px-2 font-bold">
                {property.bathrooms} Baths
              </Text>
            </View>

            <View className="flex-row items-center px-6">
              <Image source={icons.area} className="size-4" />
              <Text className="text-gray-800 text-[12px] px-3 font-bold">
                {property.area} Sqft
              </Text>
            </View>
          </View>

          {/* Agent */}
          <Text className="text-black text-xl font-bold px-4 mt-6">Agent</Text>

          <View className="flex-row mt-3 justify-between items-center px-4 mb-6">
            <Image source={images.avatar} className="size-12 rounded-full" />

            <View className="flex-1 ml-4">
              <Text className="text-black text-lg font-bold">Owner</Text>
              <Text className="text-black text-xs">Property Agent</Text>
            </View>

            <View className="flex-row">
              <Image source={icons.chat} className="size-8 mr-3" />
              <Image source={icons.phone} className="size-8" />
            </View>
          </View>

          {/* Overview */}
          <View className="px-4 mt-2">
            <Text className="text-2xl text-black font-bold mb-2">Overview</Text>
            <Text className="text-base text-gray-900 leading-6">
              {property.description}
            </Text>
          </View>

          {/* Facilities */}
          <View className="px-4 mt-6">
            <Text className="text-2xl text-black font-bold mb-3">Facilities</Text>

            <View className="flex-row flex-wrap gap-4">
              {[
                { icon: icons.wifi, label: 'Wifi' },
                { icon: icons.swim, label: 'Swimming Pool' },
                { icon: icons.run, label: 'Sport Center' },
                { icon: icons.carPark, label: 'Parking' },
                { icon: icons.laundry, label: 'Laundry' },
                { icon: icons.dog, label: 'Pet Center' },
              ].map((item, index) => (
                <View
                  key={index}
                  className="w-[30%] py-3 rounded-xl bg-gray-100 items-center"
                >
                  <Image source={item.icon} className="size-6 mb-1" />
                  <Text className="text-sm text-gray-900 text-center">
                    {item.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* STICKY BOOK NOW */}
        <View className="absolute bottom-0 left-0 right-0 bg-white px-4 py-3 border-t border-gray-200">
          <TouchableOpacity className="w-full h-[52px] bg-blue-950 rounded-xl flex-row items-center justify-center active:opacity-90">
            <Image source={icons.phone} className="size-6 mr-3" />
            <Text className="text-white text-lg font-bold">Book Now</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default Property;