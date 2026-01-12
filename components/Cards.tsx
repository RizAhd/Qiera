import icons from '@/constants/icons';
import images from '@/constants/images';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';


interface Props{
    onPress?:  () => void;

}

export const FeaturedCards = ({onPress} : Props) => {
  return (
   

    <TouchableOpacity onPress={onPress} className='flex flex-col items-start w-60 h-80 relative'>
        <Image source={images.japan} className='size-full rounded-2xl'/>
        <Image source={images.cardGradient} className='size-full rounded-2xl absolute bottom-0'></Image>

        <View className='flex flex-row items-center bg-white/70 px-3 py-1.5 rounded-full absolute top-5  left-5 '>
            <Image source={icons.star} className='size-3.5'/>
            <Text className='text-xs font-bold'> 4.5</Text>
        </View>
         <View className='flex flex-row items-center bg-white/70 px-3 py-1.5 rounded-full absolute top-5  right-5 '>
            {/* <Image source={icons.star} className='size-3.5'/> */}
            <Text className='text-xs font-bold'> Available</Text>
        </View>

        <View className='flex flex-col items-start absolute bottom-5 inset-x-5'>

            <Text className='text-xl font-rubikExtraBold text-gray-50 ' numberOfLines={1}> Modern Villa</Text>
            <Text className='text-base font-rubik text-white '>
                 Silmiyapura, Sri Lanka
            </Text>


            <View className='flex flex-row items-center justify-between w-full'>
                <Text className='text-xl font-rubikExtraBold text-white'>
                    25000 LKR
                </Text>
                <Image source={icons.heart} className='size-5' />
            </View>
        </View>
    </TouchableOpacity>
  )
}

export const Cards = ({onPress} : Props) => {

    return(
  <TouchableOpacity onPress={onPress} className='flex-1 w-full mt-4 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative'> 
  <View className='flex flex-row items-center absolute px-2 top-5 left-5 bg-white/90 rounded-full z-50 '>
            <Image source={icons.star} className='size-2.5'/>
            <Text className='text-xs font-bold ml-0.5'> 4.5</Text>
        </View>

        <Image source={images.newYork} className='w-full h-40 rounded-lg'/>
         <View className='flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 rounded-full z-50'>
            {/* <Image source={icons.star} className='size-3.5'/> */}
            <Text className='text-xs font-bold '> Available</Text>
        </View>

        <View className='flex flex-col mt-2 inset-x-1 '>

            <Text className='text-base font-rubikExtraBold text-black ' >Cozy Studio</Text>
            <Text className='text-xs font-rubik text-black '>
                 Silmiyapura, Sri Lanka
            </Text>


            <View className='flex flex-row items-center justify-between mt-2 '>
                <Text className='text-base font-rubikExtraBold text-blue'>
                    25000 LKR
                </Text>
                <Image source={icons.heart} className='w-5 h-5 mr-2 ' tintColor='#191d31' />
            </View>
        </View>
  </TouchableOpacity>
    )
}