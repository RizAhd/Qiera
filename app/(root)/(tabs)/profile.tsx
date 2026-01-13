import { settings } from '@/constants/data'
import icons from '@/constants/icons'
import { logout } from '@/lib/appwrite'
import { useGlobalContext } from '@/lib/global-provider'
import React from 'react'
import { Alert, Image, ImageSourcePropType, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: any;
  showArrow?: boolean;
}

const SettingsItem = ({ icon, title, onPress, textStyle, showArrow = true }: SettingsItemProps) => (
  <TouchableOpacity onPress={onPress} className='flex flex-row items-center justify-between py-3'>
    <View className='flex flex-row justify-between gap-3 items center '>
      <Image source={icon} className='size-6 mx-2' />
      <Text className={`font-rubik text-lg ${textStyle}`}>{title}</Text>
    </View>

    {showArrow && <Image source={icons.rightArrow} className='size-5'/>}
  </TouchableOpacity>
)



const Profile = () => {

  const {user, refetch} = useGlobalContext();


  const handleLogOut = async () => {
      const result =await logout();

      if(result){

        Alert.alert('Success',' Successfully Logged Out')
        refetch();
      }else{
                Alert.alert('Error',' An Error Occured While Logging Out !!')

      }

  }
  return (
    <SafeAreaView className='h-full bg-white'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName='pb-32 px-7'>


        <View className='flex flex-row items-center justify-between mt-5'>
          <Text className='text-xl font-rubik'>Profile  </Text>
          <Image source={icons.bell} className='size-5' />
        </View>

        <View className='flex-row justify-center flex mt-5'>
          <View className='flex flex-col items-center relative mt-5'>
            <Image source={{uri: user?.avatar}} className='size-44 relative rounded-full border border-dotted' />
            <TouchableOpacity className='absolute bottom-13 right-2'>
              <Image source={icons.edit} className='size-9' />
            </TouchableOpacity>

            <Text className='text-2xl font-rubikMedium mt-5'> {user?.name}</Text>
                        <Text className='text-sm font-rubik mt-2'> {user?.email}</Text>

          </View>
    
        </View>
              <View className='flex flex-col mt-10'>
            <SettingsItem icon={icons.calendar} title='My Bookings' />
            <SettingsItem icon={icons.wallet} title='Payments' />

          </View>
          <View className='flex flex-col mt-5 border-t pt-5 border-blue-200'>

            {settings.slice(2).map((item,index) => (
           <SettingsItem key={index} {...item}></SettingsItem>
          )
            )}
          </View>
          <View className='flex flex-col mt-3 border-t pt-5 border-blue-200'>
            <SettingsItem  showArrow={false}  textStyle='text-red'   icon={icons.logout} title='Logout'  onPress={handleLogOut}/>
          </View>



      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile