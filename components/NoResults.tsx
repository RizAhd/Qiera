import images from '@/constants/images'
import React from 'react'
import { Image, Text, View } from 'react-native'

const NoResults = () => {
  return (
    <View className='flex- items-center my-5'>
      <Image source={images.noResult} className='w-11/12 h-80'  resizeMode='contain'/>
      <Text className='text-2xl font-rubikBold text-blue-950 mt-5'>No Results</Text>
      <Text className='text-base text-gray-950 mt-2'>We Could Not Dind Any Result</Text>
    </View>
  )
}

export default NoResults