import icons from '@/constants/icons';
import images from '@/constants/images';
import React, { useRef } from 'react';
import {
    Animated,
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Models } from 'react-native-appwrite';

interface Props {
  onPress?: () => void;
  item: Models.Document & any;
}

export const FeaturedCards = ({ item: { image, rating, name, address, price }, onPress }: Props) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      tension: 150,
      friction: 3,
    }).start();
  };
  
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 150,
      friction: 3,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity 
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        className='flex flex-col items-start w-60 h-80 relative bg-white rounded-2xl overflow-hidden'
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
        }}
      >
        <Image 
          source={{ uri: image }} 
          className='w-full h-full rounded-2xl absolute'
          resizeMode='cover'
        />
        <Image 
          source={images.cardGradient} 
          className='w-full h-full rounded-2xl absolute bottom-0'
          resizeMode='cover'
        />

        {/* Rating badge */}
        <View className='flex flex-row items-center bg-white/85 px-3 py-1.5 rounded-full absolute top-5 left-5'>
          <Image source={icons.star} className='size-3.5' tintColor='#f59e0b' />
          <Text className='text-xs font-rubikBold text-gray-900 ml-1'> {rating || '4.5'} </Text>
        </View>
        
        {/* Availability badge */}
        <View className='flex flex-row items-center bg-emerald-500/90 px-3 py-1.5 rounded-full absolute top-5 right-5'>
          <View className='w-1.5 h-1.5 bg-white rounded-full mr-1.5' />
          <Text className='text-xs font-rubikMedium text-white'>Available</Text>
        </View>

        {/* Bottom content */}
        <View className='flex flex-col items-start absolute bottom-5 inset-x-5'>
          <Text 
            className='text-xl font-rubikExtraBold text-white mb-1' 
            numberOfLines={1}
            style={{ textShadowColor: 'rgba(0, 0, 0, 0.3)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2 }}
          > 
            {name || 'Property Name'}
          </Text>
          <Text 
            className='text-sm font-rubik text-white/90 mb-3' 
            numberOfLines={1}
            style={{ textShadowColor: 'rgba(0, 0, 0, 0.3)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2 }}
          >
            {address || 'Address not specified'}
          </Text>

          <View className='flex flex-row items-center justify-between w-full'>
            <Text className='text-xl font-rubikExtraBold text-white'>
              {price ? `${price} LKR` : 'Price on request'}
            </Text>
            <TouchableOpacity className='p-1.5 bg-white/20 rounded-full'>
              <Image source={icons.heart} className='size-5' tintColor='#ffffff' />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

export const Cards = ({ item: { image, rating, name, address, price }, onPress }: Props) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      tension: 150,
      friction: 3,
    }).start();
  };
  
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 150,
      friction: 3,
    }).start();
  };

  return (
    <Animated.View 
      style={{ 
        transform: [{ scale: scaleAnim }],
        flex: 1,
        marginHorizontal: 4,
      }}
    >
      <TouchableOpacity 
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        className='flex-1 mt-4 px-3 py-4 rounded-xl bg-white relative overflow-hidden'
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
          elevation: 3,
          borderWidth: 1,
          borderColor: '#f3f4f6',
        }}
      >
        {/* Rating badge */}
        <View className='flex flex-row items-center absolute px-2.5 py-1 top-4 left-4 bg-white/95 rounded-full z-10'>
          <Image source={icons.star} className='size-2.5' tintColor='#f59e0b' />
          <Text className='text-xs font-rubikBold text-gray-900 ml-0.5'> {rating || '4.5'}</Text>
        </View>

        {/* Availability badge */}
        <View className='flex flex-row items-center absolute px-2.5 py-1 top-4 right-4 bg-emerald-500/95 rounded-full z-10'>
          <View className='w-1.5 h-1.5 bg-white rounded-full mr-1' />
          <Text className='text-xs font-rubikMedium text-white'>Available</Text>
        </View>

        {/* Property image */}
        <Image 
          source={{ uri: image }} 
          className='w-full h-40 rounded-lg mb-3'
          resizeMode='cover'
        />

        {/* Property details */}
        <View className='flex flex-col'>
          <Text 
            className='text-base font-rubikExtraBold text-gray-900 mb-1' 
            numberOfLines={1}
          >
            {name || 'Property Name'}
          </Text>
          <Text 
            className='text-xs font-rubik text-gray-600 mb-3' 
            numberOfLines={1}
          >
            {address || 'Location not specified'}
          </Text>

          <View className='flex flex-row items-center justify-between border-t border-gray-100 pt-3'>
            <Text className='text-base font-rubikExtraBold text-blue-600'>
              {price ? `${price} LKR` : 'Contact for price'}
            </Text>
            <TouchableOpacity className='p-1.5'>
              <Image 
                source={icons.heart} 
                className='w-5 h-5' 
                tintColor='#9ca3af' 
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}