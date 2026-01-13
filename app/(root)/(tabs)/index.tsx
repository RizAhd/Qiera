import { Cards, FeaturedCards } from '@/components/Cards';
import Filters from '@/components/Filters';
import NoResults from '@/components/NoResults';
import Search from '@/components/Search';
import icons from "@/constants/icons";
import { getLatestProperties, getProperties } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';
import { useAppwrite } from '@/lib/useAppwrite';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  // Latest properties (horizontal featured)
  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLatestProperties,
      params: {},
    });

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
      limit: 6,
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
          <View style={{ paddingHorizontal: 20 }}>
            {/* Header with user info */}
            <View className="flex flex-row justify-between items-center mt-5">
              <View className="flex flex-row items-center">
                <Image source={{ uri: user?.avatar }} className="size-12 rounded-full" />
                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-xs font-rubik text-gray-800">Welcome</Text>
                  <Text className="text-base font-rubik">{user?.name}</Text>
                </View>
              </View>
              <Image source={icons.bell} className="size-6" />
            </View>

            <Search />

            {/* Featured Properties */}
            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubikBold text-black">Featured</Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubikBold text-blue-950 mx-3">See All</Text>
                </TouchableOpacity>
              </View>
              {latestPropertiesLoading ?
                <ActivityIndicator size="large" style={{ marginTop: 20 }} /> :
                !latestProperties || latestProperties.length === 0 ?
                  <NoResults /> : (
                    <FlatList
                      data={latestProperties}
                      renderItem={({ item }) => (
                        <View style={{ width: 240, marginRight: 3 }}>
                          <FeaturedCards item={item} onPress={() => handleCardPress(item.$id)} />
                        </View>
                      )}
                      keyExtractor={(item) => item.$id} // unique key
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      bounces={false}
                      contentContainerStyle={{
                        paddingVertical:1,
                        paddingLeft: 1,
                        paddingRight: 1,
                      }}
                    />
                  )}
            </View>

            {/* Recommendation */}
            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubikBold text-black">Our Recommendation</Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubikBold text-blue-950 mx-3">See All</Text>
                </TouchableOpacity>
              </View>
              <Filters />
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
