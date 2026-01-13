import NoResults from '@/components/NoResults';
import PropertyCard from '@/components/PropertyCard';
import icons from '@/constants/icons';
import { getPropertyById } from '@/lib/appwrite';
import { getSavedProperties } from '@/lib/saveProperty';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Saved = () => {
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const ids = await getSavedProperties();

      const data = await Promise.all(ids.map(id => getPropertyById({ id })));

      setProperties(data.filter(Boolean));
    };

    load();
  }, []);

  if (!properties.length) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center">
          <NoResults />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" >
     <View  style={{ paddingHorizontal: 20 }} className="flex flex-row justify-between items-center mt-5">
  <View className="flex flex-row items-center">
    <View className="flex flex-col items-start ml-2 justify-center">
      <Text className="text-lg font-rubik text-gray-800">Welcome</Text>

    </View>
  </View>
  <Image source={icons.bell} className="size-6" />
</View>
<View className='flex flex-row items-center justify-center'>
<Text className="text-2xl font-bold my-4 text-black text-center">Your Saved Properties</Text>

</View>

      {/* Property List */}
      <FlatList
        data={properties}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={{ paddingBottom: 30, paddingTop: 10 }}
        renderItem={({ item }) => <PropertyCard property={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Saved;
