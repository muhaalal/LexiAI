import { Ionicons } from '@expo/vector-icons';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity } from "react-native";
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
          name="history/[id]"
          options={{
            title: '', 
            headerBackVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => router.back()}
                style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}
              >
                <Ionicons name="arrow-back" size={22} color="#007AFF" />
                <Text style={{ marginLeft: 6, fontSize: 16, color: '#007AFF', fontFamily: 'Lexend_500Medium' }}>
                  Back to History
                </Text>
              </TouchableOpacity>
            ),
            presentation: 'card',
            headerStyle: {
              backgroundColor: '#F5EFE7',
            },
          }}
        />
      </Stack>
      <StatusBar style="auto" />

    </ThemeProvider>
  );
}
