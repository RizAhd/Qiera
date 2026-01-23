// app/_layout.tsx
import ChatBot from "@/components/ChatBot";
import { ChatBotProvider } from "@/context/ChatBotContext"; // Add this
import GlobalProvider from "@/lib/global-provider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "./globals.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
  });

  useEffect(() => {
    async function hideSplash() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    hideSplash();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <GlobalProvider>
      <ChatBotProvider> 
        <Stack screenOptions={{ headerShown: false }} />
      
        <ChatBot />
      </ChatBotProvider>
    </GlobalProvider>
  );
}