import icons from '@/constants/icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

type PropertyCardProps = {
  property: {
    $id: string;
    name: string;
    type: string;
    image: string;
    rating?: number;
    bedrooms?: number;
    bathrooms?: number;
    area?: number;
    price?: number;
  };
};

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const router = useRouter();

  if (!property || !property.$id) return null;

  const handleNavigate = () => {
    const propertyPath: string = `/property/${property.$id}`;
    // @ts-ignore
    router.push(`/property/${property.$id}`);

  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handleNavigate}
      className="bg-white rounded-2xl shadow-sm mb-5 mx-4 overflow-hidden"
    >
      <View className="relative">
        <Image
          source={{ uri: property.image }}
          className="w-full h-48"
          resizeMode="cover"
        />

        <View className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg flex-row items-center">
          <Image source={icons.star} className="size-3 mr-1" />
          <Text className="text-xs font-bold text-gray-800">
            {property.rating || 0}
          </Text>
        </View>
      </View>

      <View className="p-4">
        <Text className="text-lg font-bold text-blue-950" numberOfLines={1}>
          {property.name}
        </Text>
        <Text className="text-sm text-blue-500 mt-1">{property.type}</Text>

        <View className="flex-row justify-between mt-3">
          <View className="flex-row items-center">
            <Image source={icons.bed} className="size-4 mr-1" />
            <Text className="text-xs text-gray-700">{property.bedrooms} Beds</Text>
          </View>

          <View className="flex-row items-center">
            <Image source={icons.bath} className="size-4 mr-1" />
            <Text className="text-xs text-gray-700">{property.bathrooms} Baths</Text>
          </View>

          <View className="flex-row items-center">
            <Image source={icons.area} className="size-4 mr-1" />
            <Text className="text-xs text-gray-700">{property.area} sqft</Text>
          </View>
        </View>

        <Text className="mt-3 text-lg font-bold text-blue-950">
          ${property.price?.toLocaleString() || 0}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PropertyCard;
