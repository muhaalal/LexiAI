import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from "../../firebaseConfig";

export default function LoginScreen(){

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [hidePassword,setHidePassword]=useState(true)

    function viewPassword(){
      setHidePassword(!hidePassword)
    }

    async function loginUser(){

        if(!email || !password){
            Alert.alert(`Please enter both an email and password`)
            return;
        }

        try{
            const userCredential= await createUserWithEmailAndPassword(auth, email, password) 
            const user=userCredential.user
            console.log(user)
            Alert.alert(`Welcome, ${user.email}`)
            router.replace("/(tabs)")
        } catch(err:any){
            const errCode=err.code.replace("auth/","")
            Alert.alert(`Error: ${errCode}`)
        }
    }

    return(
        <SafeAreaView style={styles.container} >

          {/* Removes the header at top for this screen */}
          <Stack.Screen options={{headerShown:false}}></Stack.Screen>

          {/* Title to inform the user of this screen */}
            <View style={{marginTop:140}}>
                <Text style={styles.text} >Register</Text>
            </View>

            {/* Container holding email input box, password input box, login button, and forgot password */}
            <View style={{marginTop:45}}>

                {/* Email input box */}
                <View>
                    <Text style={styles.topInputText}>Email address</Text>
                    <TextInput
                        placeholder='john@example.com'
                        placeholderTextColor="#868686ff"
                        style={styles.inputBox}
                        onChangeText={setEmail}
                    ></TextInput>
                </View>

                {/* Password input box */}
                <View style={{marginTop:25}}>
                    <Text style={styles.topInputText}>Password</Text>
                    <View>
                      <TextInput
                          placeholder='Example123'
                          placeholderTextColor="#868686ff"
                          style={styles.inputBox}
                          onChangeText={setPassword}
                          secureTextEntry={hidePassword}
                      ></TextInput>
                      <TouchableOpacity onPress={viewPassword}>
                        <Ionicons style={styles.icon}name={hidePassword? "eye-off" : "eye"} size={24} color="#gray"/>
                      </TouchableOpacity>
                    </View>
                </View>


                {/* Login button */}
                <TouchableOpacity style={styles.signUpButton} onPress={loginUser}>
                    <Text style={styles.signUpButtonText}>Sign up</Text>
                </TouchableOpacity>

                <View style={styles.loginMessageContainer}>
                  <Text style={styles.accountPrompt}>Already have an account? </Text>
                  <TouchableOpacity onPress={()=>(router.replace("/(auth)/loginScreen"))}>
                    <Text style={[styles.loginText]}>Login in</Text>
                  </TouchableOpacity>
                </View>

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor:"#efeeedff"
  },
  button: {
    borderRadius: 10,
    marginTop: 20,
  },
  text: {
    fontSize: 25,
    fontFamily: "Lexend_700Bold",
    padding: 10,
  },
  topInputText:{
    fontSize: 20,
    fontFamily: "Lexend_700Bold",
    padding: 10,
  },
  inputBox:{
    width:`100%`,
    fontSize:20,
    paddingLeft:10,
    paddingVertical:10,
    borderRadius:14,
    borderWidth:0.2,
    borderColor:"#000000ff",
    backgroundColor:"#e1e1e1ff",
    color:"#131111ff",
    fontFamily: "Lexend_500Medium",
  },
  signUpButton:{
    marginTop:25,
    padding:15,
    paddingLeft:110,
    borderRadius:12,
    backgroundColor:"#0152f2ff",
  },
  signUpButtonText:{
    fontSize:22,
    fontFamily:"Lexend_700Bold",
    color:"#fef6f6ff"
  },
  loginMessageContainer:{
    alignItems:"center",
    marginTop:150,
    flexDirection:"row"
  },
  accountPrompt:{
    fontSize:18,
    fontFamily:"Lexend_700Bold",
    color:"#0a0a0aff"
  },
  loginText:{
    fontSize:18,
    fontFamily:"Lexend_700Bold",
    color:"#0f85d8ff",
    textDecorationLine:"underline"
  },
  icon: {
    position: "absolute",
    right: 10,
    transform: [{ translateY: -32 }], // centers icon vertically
  },

});