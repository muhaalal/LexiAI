import { router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { auth } from "../firebaseConfig";


export default function Index() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(`User ${user.email}`)
        router.replace("/(tabs)")
      }
      else {
        console.log("No user found")
        router.replace("/(auth)/loginScreen");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#2486f0ff" />
    </View>
  );
}
