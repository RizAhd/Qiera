import icons from "@/constants/icons";
import images from "@/constants/images";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";




export default function Index() {
  return (
   <SafeAreaView className="bg-white h-full">
    <ScrollView>
      <View className="px-5">
        <View className="flex flex-row justify-between relative items-center mt-5">

        <View className="flex flex-row items-center"> 
          <Image source={images.avatar} className="size-12 rounded-full" /> 
          <View className="flex flex-col items-start ml-2 justify-center">
            <Text className="text-xs font-rubik text-gray-800">Welcome </Text>
            <Text className="text-base font-rubik">Loki</Text>
          </View>
          
          </View>

          <Image source={icons.bell} className="size-6"/>
      </View>
      </View>
    </ScrollView>
   </SafeAreaView>
  );
}
