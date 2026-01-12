import { useGlobalContext } from "@/lib/global-provider";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppLayout(){

    const {loading, isLogged} = useGlobalContext()

    if(loading){
        return(

        <SafeAreaView className="bg-white h-full justify-center items-center flex">
            <ActivityIndicator className="text-gray-900 "  size='large' />
        </SafeAreaView>
    
        )
}


        if(!isLogged) return <Redirect href='/sign-in'/>
        
        return < Slot/>
}
