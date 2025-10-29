import { router } from "expo-router";
import { signOut } from "firebase/auth";
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from "../../firebaseConfig";


export default function Settings(){

  async function logOut(){
    await signOut(auth)
    console.log("User logged out sucessfully")
    router.replace("/(auth)/loginScreen")
  }

    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={[styles.text,{color:"#333"}]}>Settings Screen</Text>
            </View>

            <View>
              <TouchableOpacity style={styles.logoutButton} onPress={logOut}>
                <Text style={styles.logoutButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"#F5EFE7"
  },
  text: {
    fontSize: 35,
    fontFamily: "Lexend_500Medium",
    padding: 10,
  },
  logoutButton:{
    marginTop:25,
    padding:15,
    borderRadius:12,
    backgroundColor:"#ffffffff",
  },
  logoutButtonText:{
    fontSize:22,
    fontFamily:"Lexend_700Bold",
    color:"#181616ff"
  },
});