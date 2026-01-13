import { Cards } from '@/components/Cards';
import Filters from '@/components/Filters';
import NoResults from '@/components/NoResults';
import Search from '@/components/Search';
import icons from '@/constants/icons';
import { getProperties } from '@/lib/appwrite';
import { useAppwrite } from '@/lib/useAppwrite';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Explore() {

  const params = useLocalSearchParams<{ query?: string; filter?: string }>();


  // Properties with filters (grid)
  const { data: properties, loading, refetch } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter || 'All',
      query: params.query || '',
      limit: 6,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter || 'All',
      query: params.query || '',
      limit: 20,
    });
  }, [params.filter, params.query]);

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  return (
    <SafeAreaView className="bg-white flex-1">
      <FlatList
        data={properties}
        renderItem={({ item }) => (
          <Cards item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id} // unique key
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 100 }} // extra padding for absolute tab bar
        columnWrapperStyle={{ flex: 1, gap: 20, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size='large' style={{ marginTop: 20 }} />
          ) : <NoResults />
        }
        ListHeaderComponent={
          <View className='px-5'>
            <View className='flex flex-row items-center justify-between mt-5'>
              <TouchableOpacity className='flex flex-row rounded-full size--11 items-center justify-center' onPress={() => router.back()}>
                <Image source={icons.backArrow} className='size-8'/>
              </TouchableOpacity>
              <Text className='text-base mr-2 text-center font-rubikMedium text-black'>Search For Your Ideal Home</Text>
              <Image source={icons.bell} className='w-6 h-6 '/>
               </View>
            <Search />

            <View className='mt-5'>
              <Filters />
              <Text className='text-xl font-rubikBold text-black mt-5'>
                Found {properties?.length} Properties
              </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
