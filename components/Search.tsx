import icons from '@/constants/icons';
import { router, useLocalSearchParams, usePathname } from 'expo-router';
import React, { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import { useDebouncedCallback } from 'use-debounce';

const Search = () => {

    const path = usePathname();
    const params = useLocalSearchParams<{ query?: string }>();

    const [search, setSearch] = useState(params.query);

    const debounceSearch = useDebouncedCallback(
        (text: string) => {
            router.setParams({ query: text })
        }, 500
    );

    const handleSearch = (text: string) => {
        setSearch(text)
        debounceSearch(text)
    }

    return (
        <View className='flex flex-row items-center justify-between w-full px-5 rounded-lg bg-gray-100 border border-gray-100 mt-5 py-2'>
            <View className='flex-1 flex-row items-center justify-start z-50'>
                <Image source={icons.search} className='size-5' />
                <TextInput
                    value={search}
                    onChangeText={handleSearch}
                    placeholder='Search For Anything'
                    className='flex-1 text-sm font-rubik text-black ml-2'
                />
            </View>
            <TouchableOpacity>
                <Image source={icons.filter} className='size-5' />
            </TouchableOpacity>
        </View>
    )
}

export default Search;
